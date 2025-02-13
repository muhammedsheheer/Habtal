import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import CompanyModel from "@/models/company";
import OtpModel from "@/models/otp";
import nodemailer from "nodemailer";
import * as argon2 from "argon2";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { name, email, password, registerNo, companyName } = await req.json();

	if (!email || !password)
		return Response.json({ error: "Email and password are required" });

	try {
		await dbConnect();

		const existingUser = await UserModel.findOne({ email });
		const existingCompany = await CompanyModel.findOne({ email });

		if (existingUser || existingCompany)
			return Response.json(
				{ error: "Account already exists" },
				{ status: 409 }
			);

		const hashedPassword = await argon2.hash(password);

		if (registerNo) {
			const company = await CompanyModel.create({
				companyName,
				email,
				password: hashedPassword,
				registerNo,
				role: "employer",
				isVerified: false,
			});
		} else {
			const user = await UserModel.create({
				name,
				email,
				password: hashedPassword,
				role: "user",
				isVerified: false,
			});
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		await OtpModel.create({ email, otp });

		const transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
		});

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: "Verify Your Email - OTP Code",
			text: `Your OTP code is ${otp}. It will expire in 1 minutes.`,
		});

		return Response.json({
			message: `Account created as ${
				registerNo ? "Company" : "User"
			}. OTP sent for verification.`,
			email,
		});
	} catch (error) {
		console.error("Signup Error:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
