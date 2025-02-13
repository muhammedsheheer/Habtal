import { error } from "console";
import { NextRequest } from "next/server";
import STATUS_CODES from "@/utils/statusCodes";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import CompanyModel from "@/models/company";
import OtpModel from "@/models/otp";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();
		if (!email) {
			return Response.json(
				{
					error: "email is required",
				},
				{ status: STATUS_CODES.BAD_REQUEST }
			);
		}
		await dbConnect();
		const user = await UserModel.findOne({ email });
		const company = await CompanyModel.findOne({ email });
		if (!user && !company) {
			return Response.json(
				{ error: "User not found" },
				{ status: STATUS_CODES.NOT_FOUND }
			);
		}
		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		await OtpModel.create({ email, otp });
		await sendOTPEmail(email, otp);
		return Response.json(
			{ message: "Otp send successfully" },
			{ status: STATUS_CODES.SUCCESS }
		);
	} catch (error) {
		return Response.json({ error: "Internal servor error" }, { status: 500 });
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
