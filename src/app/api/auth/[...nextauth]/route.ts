import NextAuth, { Account, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import CompanyModel from "@/models/company";
import * as argon2 from "argon2";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

type UserRole = "user" | "employer" | "admin";

interface CustomJWT extends JWT {
	role?: UserRole;
}

interface CustomSession extends Session {
	user: {
		id: string;
		email: string;
		role: UserRole;
	};
}

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: { strategy: "jwt" as const },
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "example@gmail.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				await dbConnect();

				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email and password are required");
				}

				const user = await UserModel.findOne({ email: credentials.email });
				const company = await CompanyModel.findOne({
					email: credentials.email,
				});

				let account = user || company;
				if (!account) throw new Error("Invalid email or password");

				if (!account.isVerified || (company && !company.verified)) {
					throw new Error("Account not verified");
				}

				const validPassword = await argon2.verify(
					account.password,
					credentials.password
				);
				if (!validPassword) throw new Error("Invalid email or password");

				return {
					id: account._id.toString(),
					email: account.email,
					role: account.role,
				};
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async signIn({
			account,
			profile,
		}: {
			account: Account | null;
			profile?: Profile | undefined;
		}) {
			await dbConnect();
			if (account?.provider === "google") {
				const company = await CompanyModel.findOne({ email: profile?.email });

				if (company) {
					throw new Error("Company accounts cannot log in with Google.");
				}

				let user = await UserModel.findOne({ email: profile?.email });
				if (user?.role === "admin") {
					throw new Error("Admin  cannot log in with Google.");
				}
				if (!user) {
					user = await UserModel.create({
						email: profile?.email,
						name: profile?.name,
						provider: "google",
						role: "user",
						isVerified: true,
					});
					return true;
				}
				if (!user.isVerified) {
					throw new Error("Your account is not verified.");
				}
			}
			return true;
		},
		async jwt({ token, user }: { token: CustomJWT; user?: any }) {
			if (user) {
				token.role = user.role as UserRole;
			}
			return token;
		},
		async session({
			session,
			token,
		}: {
			session: CustomSession;
			token: CustomJWT;
		}) {
			session.user = {
				...session.user,
				role: token.role || "user",
			};
			return session;
		},
	},

	pages: { signIn: "/login", signOut: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
