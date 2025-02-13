import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user";
import CompanyModel from "@/models/company";
import OtpModel from "@/models/otp";
import nodemailer from "nodemailer";
import { error } from "console";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();
		if (!email) {
			return NextResponse.json(
				{ error: "Internal Server Error" },
				{ status: 500 }
			);
		}
		await dbConnect();
		const user = await UserModel.findOne({ email });
		const company = await CompanyModel.findOne({ email });
		if (!user && !company) {
			return NextResponse.json(
				{ error: "Account not found with this email" },
				{ status: 404 }
			);
		}
		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		await OtpModel.findOneAndUpdate(
			{ email },
			{ otp, createdAt: new Date() },
			{ upsert: true, new: true }
		);
		await sendOTPEmail(email, otp);

		return NextResponse.json(
			{ message: "OTP resent successfully!" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Resend OTP Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

async function sendOTPEmail(email: string, otp: string) {
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Resend OTP - Verify Your Email",
		text: `Your new OTP code is ${otp}. It will expire in 1 minute.`,
		html: `<p>Your new OTP code is <strong>${otp}</strong>. It will expire in 1 minute.</p>`,
	});
}
