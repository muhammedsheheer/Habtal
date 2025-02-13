import { NextRequest } from "next/server";
import STATUS_CODES from "@/utils/statusCodes";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import CompanyModel from "@/models/company";
import OtpModel from "@/models/otp";
import * as argon2 from "argon2";

export async function POST(req: NextRequest) {
	try {
		const { email, otp, password } = await req.json();
		console.log(email, otp, password);

		if (!email || !otp || !password) {
			return Response.json(
				{ error: "Email and OTP and Password are required" },
				{ status: STATUS_CODES.NOT_FOUND }
			);
		}
		await dbConnect();
		const otpRecord = await OtpModel.findOne({ email, otp });
		if (!otpRecord) {
			return Response.json(
				{ error: "Invalid or expired OTP" },
				{ status: STATUS_CODES.BAD_REQUEST }
			);
		}
		const hashedPassword = await argon2.hash(password);

		const user = await UserModel.findOneAndUpdate(
			{ email },
			{ password: hashedPassword },
			{ new: true }
		);

		const company = await CompanyModel.findOneAndUpdate(
			{ email },
			{ password: hashedPassword },
			{ new: true }
		);

		if (!user && !company) {
			return Response.json(
				{ error: "User or company not found" },
				{ status: STATUS_CODES.NOT_FOUND }
			);
		}

		await OtpModel.deleteOne({ email });

		return Response.json(
			{ message: "Password updated successfully" },
			{ status: STATUS_CODES.SUCCESS }
		);
	} catch (error) {
		return Response.json(
			{ error: "Internal server error" },
			{ status: STATUS_CODES.SERVER_ERROR }
		);
	}
}
