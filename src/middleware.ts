import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
	const url = req.nextUrl;
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (["/", "/login", "/signup", "/forgot-password"].includes(url.pathname)) {
		if (token) {
			const role = token.role || "user";

			if (role === "user") {
				return NextResponse.redirect(new URL("/user/dashboard", req.url));
			} else if (role === "employer") {
				return NextResponse.redirect(new URL("/company/dashboard", req.url));
			} else if (role === "admin") {
				return NextResponse.redirect(new URL("/admin/dashboard", req.url));
			}
		}
		return NextResponse.next();
	}

	if (url.pathname.startsWith("/otp")) {
		const email = url.searchParams.get("email");
		if (!email) {
			return NextResponse.redirect(new URL("/signup", req.url));
		}
		return NextResponse.next();
	}

	if (!token) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	const role = token.role || "user";

	if (url.pathname.startsWith("/user") && role !== "user") {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	if (url.pathname.startsWith("/company") && role !== "employer") {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	if (url.pathname.startsWith("/admin") && role !== "admin") {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/login",
		"/signup",
		"/otp",
		"/user/:path*",
		"/company/:path*",
		"/admin/:path*",
		"/forgot-password",
	],
};
