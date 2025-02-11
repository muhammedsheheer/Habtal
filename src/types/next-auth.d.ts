import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
			role: "user" | "employer" | "admin";
		};
	}

	interface User {
		id: string;
		email: string;
		role: "user" | "employer" | "admin";
	}
}
