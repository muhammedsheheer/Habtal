import mongoose, { Schema, Document, Types } from "mongoose";

interface IUser extends Document {
	role: "user" | "admin" | "employer";
	name: string;
	email: string;
	phone?: number;
	password?: string;
	gender?: "male" | "female" | "other";
	dob?: Date;
	profilePic?: string;
	about?: string;
	address?: Types.ObjectId;
	experience?: {
		company: string;
		position: string;
		startDate: Date;
		endDate: Date;
		description?: string;
	}[];
	education?: {
		institution: string;
		degree: string;
		startDate: Date;
		endDate: Date;
		description?: string;
	}[];
	skills?: string[];
	languages?: string[];
	resume?: string;
	socialLinks?: {
		platform: string;
		url: string;
	}[];
	isBlocked?: boolean;
	isSubscribed?: boolean;
	isVerified: boolean;
	provider?: string;
}

const UserSchema = new Schema<IUser>(
	{
		role: { type: String, enum: ["user", "admin", "employer"], required: true },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: Number },
		password: { type: String },
		provider: { type: String, enum: ["credentials", "google"] },
		gender: { type: String, enum: ["male", "female", "other"] },
		dob: { type: Date },
		profilePic: { type: String },
		about: { type: String },
		address: { type: Schema.Types.ObjectId, ref: "Address" },
		experience: [
			{
				company: { type: String, required: true },
				position: { type: String, required: true },
				startDate: { type: Date, required: true },
				endDate: { type: Date, required: true },
				description: { type: String },
			},
		],
		education: [
			{
				institution: { type: String, required: true },
				degree: { type: String, required: true },
				startDate: { type: Date, required: true },
				endDate: { type: Date, required: true },
				description: { type: String },
			},
		],
		skills: [{ type: String }],
		languages: [{ type: String }],
		resume: { type: String },
		socialLinks: [
			{
				platform: { type: String, required: true },
				url: { type: String, required: true },
			},
		],
		isBlocked: { type: Boolean, default: false },
		isSubscribed: { type: Boolean, default: false },
		isVerified: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default mongoose.models.User ||
	mongoose.model<IUser>("User", UserSchema);
