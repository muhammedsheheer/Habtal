import mongoose, { Schema, Document, Types } from "mongoose";

interface ITeamMember {
	name: string;
	email: string;
	role: string;
}

interface ICompany extends Document {
	companyName: string;
	email: string;
	website?: string;
	address?: Types.ObjectId;
	location?: string[];
	employees?: number;
	industry?: string[];
	dateFounded?: Date;
	techStack?: string[];
	about?: string;
	description?: string;
	phone?: string;
	registerNo: string;
	password: string;
	role: "admin" | "user" | "employer";
	profilePic?: string;
	socialLinks?: string[];
	teams?: ITeamMember[];
	isBlocked?: boolean;
	isVerified: boolean;
	verified: boolean;
}

const CompanySchema = new Schema<ICompany>(
	{
		companyName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		website: { type: String },
		address: { type: Schema.Types.ObjectId, ref: "Address" },
		location: { type: [String], default: [] },
		employees: { type: Number, default: 0 },
		industry: { type: [String], default: [] },
		dateFounded: { type: Date },
		techStack: { type: [String], default: [] },
		about: { type: String },
		description: { type: String },
		phone: { type: String },
		registerNo: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, required: true, enum: ["admin", "user", "employer"] },
		profilePic: { type: String },
		socialLinks: { type: [String], default: [] },
		teams: [
			{
				name: { type: String, required: true },
				email: { type: String, required: true },
				role: { type: String, required: true },
			},
		],
		isBlocked: { type: Boolean, default: false },
		isVerified: { type: Boolean, default: false },
		verified: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default mongoose.models.Company ||
	mongoose.model<ICompany>("Company", CompanySchema);
