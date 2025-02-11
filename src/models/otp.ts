import mongoose, { Schema, Document } from "mongoose";

interface IOtp extends Document {
	email: string;
	otp: string;
	createdAt: Date;
}

const OtpSchema = new Schema<IOtp>(
	{
		email: { type: String, required: true },
		otp: { type: String, required: true },
		createdAt: { type: Date, default: Date.now, expires: 60 },
	},
	{ timestamps: true }
);

export default mongoose.models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);
