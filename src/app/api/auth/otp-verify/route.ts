import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import OtpModel from "@/models/otp";
import UserModel from "@/models/user";
import CompanyModel from "@/models/company";

export async function POST(req: NextRequest) {
	const { email, otp } = await req.json();
	console.log(email, otp);
	if (!email || !otp) {
		return Response.json({ error: "Email and OTP are required" });
	}
	try {
		await dbConnect();
		const otpRecord = await OtpModel.findOne({ email, otp });
		if (!otpRecord) {
			return Response.json(
				{ error: "Invalid or expired OTP" },
				{ status: 400 }
			);
		}

		const user = await UserModel.findOneAndUpdate(
			{ email },
			{ isVerified: true },
			{ new: true }
		);
		const company = await CompanyModel.findOneAndUpdate(
			{ email },
			{ isVerified: true },
			{ new: true }
		);

		if (!user && !company) {
			return Response.json({ error: "User not found" }, { status: 404 });
		}

		await OtpModel.deleteOne({ email });
		return Response.json({
			message: "Email successfully verified",
			success: true,
		});
	} catch (error) {
		console.error("OTP Verification Error:", error);
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
