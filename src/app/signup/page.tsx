"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react"; // Using lucide-react icons
import LeftSide from "@/components/signup/LeftSide";

const SignUp: React.FC = () => {
	const [selectedOption, setSelectedOption] = useState<"user" | "company">(
		"user"
	);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<div className="flex flex-col bg-[#fff] lg:flex-row h-full">
			<LeftSide />
			<div className="w-full lg:w-3/5">
				<div className="bg-white flex flex-col items-center py-8">
					<div className="flex gap-2 mb-6">
						<button
							onClick={() => setSelectedOption("company")}
							className={`px-5 py-2 rounded-sm ${
								selectedOption === "company"
									? "bg-[#E9EBFD] text-[#4640DE]"
									: "text-[#000]"
							}`}
						>
							Company
						</button>
						<button
							onClick={() => setSelectedOption("user")}
							className={`px-5 py-2 rounded-sm ${
								selectedOption === "user"
									? "bg-[#E9EBFD] text-[#4640DE]"
									: "text-[#000]"
							}`}
						>
							Job Seeker
						</button>
					</div>

					<h2 className="text-xl font-bold text-gray-800 mb-4">
						Get More Job Opportunities
					</h2>

					{selectedOption === "user" && (
						<button className="flex items-center gap-3 bg-white border rounded-sm px-4 py-2 mb-6">
							<Image
								src="/icons/googleicon.png"
								alt="Google Logo"
								width={24}
								height={24}
							/>
							<span className="text-[#4640DE] font-medium">
								Sign Up with Google
							</span>
						</button>
					)}

					<div className="w-full max-w-md bg-white  p-6">
						<form>
							{selectedOption === "user" ? (
								<>
									<InputField
										label="Full Name"
										type="text"
										placeholder="Enter your full name"
									/>
									<InputField
										label="Email"
										type="email"
										placeholder="Enter your email"
									/>
								</>
							) : (
								<>
									<InputField
										label="Company Name"
										type="text"
										placeholder="Enter your company name"
									/>
									<InputField
										label="Email"
										type="email"
										placeholder="Enter your email"
									/>
									<InputField
										label="Register No"
										type="text"
										placeholder="Enter your registration number"
									/>
								</>
							)}
							<PasswordField
								label="Password"
								showPassword={showPassword}
								setShowPassword={setShowPassword}
								placeholder="Enter your password"
							/>
							<PasswordField
								label="Confirm Password"
								showPassword={showPassword}
								setShowPassword={setShowPassword}
								placeholder="Confirm your password"
							/>

							<button className="w-full bg-[#4640DE] text-white py-2 rounded-sm font-medium">
								Sign Up
							</button>
						</form>
					</div>

					<div className="flex flex-row gap-1">
						<span className="text-[#202430]">Already have an account?</span>
						<Link className="text-[#4640DE]" href="/login">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

// Reusable Input Field Component
interface InputFieldProps {
	label: string;
	type: string;
	placeholder: string;
}
const InputField: React.FC<InputFieldProps> = ({
	label,
	type,
	placeholder,
}) => (
	<div className="mb-4">
		<label className="block text-gray-600 font-medium mb-1">{label}</label>
		<input
			type={type}
			className="w-full border rounded-sm px-3 py-2 text-gray-800"
			placeholder={placeholder}
		/>
	</div>
);

// Reusable Password Field Component with lucide-react icons
interface PasswordFieldProps {
	label: string;
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
	placeholder: string;
}
const PasswordField: React.FC<PasswordFieldProps> = ({
	label,
	showPassword,
	setShowPassword,
	placeholder,
}) => (
	<div className="mb-4 relative">
		<label className="block text-gray-600 font-medium mb-1">{label}</label>
		<div className="relative">
			<input
				type={showPassword ? "text" : "password"}
				className="w-full border rounded-sm px-3 py-2 text-gray-800"
				placeholder={placeholder}
			/>
			<button
				type="button"
				onClick={() => setShowPassword(!showPassword)}
				className="absolute inset-y-0 right-3 flex items-center justify-center px-2 text-[#4640DE]"
			>
				{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
			</button>
		</div>
	</div>
);

export default SignUp;
