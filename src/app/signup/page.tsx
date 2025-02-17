"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import LeftSide from "@/components/signup/LeftSide";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

type UserFormData = z.infer<typeof userSchema>;
type CompanyFormData = z.infer<typeof companySchema>;

const userSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(3, "Name must be at least 3 characters long")
			.max(50, "Name must be under 50 characters"),
		email: z.string().trim().email("Invalid email format"),
		password: z
			.string()
			.trim()
			.min(8, "Password must be at least 8 characters long")
			.max(50, "Password must be under 50 characters")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(/[\W_]/, "Password must contain at least one special character"),
		confirmPassword: z.string().trim(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

const companySchema = z
	.object({
		companyName: z
			.string()
			.trim()
			.min(3, "Company name is required")
			.max(50, "Company name must be under 50 characters")
			.regex(
				/^[a-zA-Z\s]+$/,
				"Company name must only contain letters and spaces"
			),

		email: z.string().trim().email("Invalid email format"),

		registerNo: z
			.string()
			.trim()
			.min(3, "Registration number is required")
			.max(20, "Registration number must be under 20 characters")
			.regex(/^[a-zA-Z0-9]+$/, "Registration number must be alphanumeric"),

		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.max(50, "Password must be under 50 characters")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(/[\W_]/, "Password must contain at least one special character"),

		confirmPassword: z.string().trim(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

const SignUp: React.FC = () => {
	const router = useRouter();

	const [selectedOption, setSelectedOption] = useState<"user" | "company">(
		"user"
	);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const validationSchema =
		selectedOption === "user" ? userSchema : companySchema;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		resolver: zodResolver(validationSchema),
	});

	const mutation = useMutation({
		mutationFn: async (formData: UserFormData | CompanyFormData) => {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.error || "Signup failed!");
			return data;
		},
		onSuccess: (data) => {
			if (!isClient) return;
			router.replace(`/otp?email=${data.email}`);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleGoogleLogin = async () => {
		if (!isClient) return;
		const res = await signIn("google", { redirect: false });
		if (res?.error) {
			toast.error(res.error);
		} else {
			router.push("/user/dashboard");
		}
	};

	const onSubmit = (data: FieldValues) => {
		mutation.mutate(data as UserFormData | CompanyFormData);
	};

	if (!isClient) return null;

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
						<button
							onClick={handleGoogleLogin}
							className="flex items-center gap-3 bg-white border rounded-sm px-4 py-2 mb-6"
						>
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
						<form onSubmit={handleSubmit(onSubmit)}>
							{selectedOption === "user" ? (
								<>
									<InputField
										label="Full Name"
										name="name"
										register={register}
										error={errors.name?.message as string}
										placeholder="Enter your full name"
									/>
									<InputField
										label="Email"
										name="email"
										register={register}
										error={errors.email?.message as string}
										placeholder="Enter your email"
									/>
								</>
							) : (
								<>
									<InputField
										label="Company Name"
										name="companyName"
										register={register}
										error={errors.companyName?.message as string}
										placeholder="Enter your company name"
									/>
									<InputField
										label="Email"
										name="email"
										register={register}
										error={errors.email?.message as string}
										placeholder="Enter your email"
									/>
									<InputField
										label="Register No"
										name="registerNo"
										register={register}
										error={errors.registerNo?.message as string}
										placeholder="Enter your registration number"
									/>
								</>
							)}
							<PasswordField
								label="Password"
								name="password"
								showPassword={showPassword}
								setShowPassword={setShowPassword}
								register={register}
								error={errors.password?.message as string}
								placeholder="Enter your password"
							/>
							<PasswordField
								label="Confirm Password"
								name="confirmPassword"
								showPassword={showPassword}
								setShowPassword={setShowPassword}
								register={register}
								error={errors.confirmPassword?.message as string}
								placeholder="Confirm your password"
							/>

							<button
								type="submit"
								className="w-full bg-[#4640DE] text-white py-2 rounded-sm font-medium"
							>
								{mutation.isPending ? "Signing Up..." : "Sign Up"}
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

interface InputFieldProps {
	label: string;
	name: string;
	error?: string;
	register: any;
	placeholder: string;
}
const InputField: React.FC<InputFieldProps> = ({
	label,
	name,
	error,
	register,
	placeholder,
}) => (
	<div className="mb-4">
		<label className="block text-gray-600 font-medium mb-1">{label}</label>
		<input
			{...register(name)}
			className="w-full border rounded-sm px-3 py-2 text-gray-800"
			placeholder={placeholder}
		/>
		{error && <p className="text-red-500 text-sm">{error}</p>}
	</div>
);

interface PasswordFieldProps {
	label: string;
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
	placeholder: string;
	name: string;
	register: any;
	error?: string;
}
const PasswordField: React.FC<PasswordFieldProps> = ({
	label,
	showPassword,
	setShowPassword,
	placeholder,
	name,
	register,
	error,
}) => (
	<div className="mb-4 relative">
		<label className="block text-gray-600 font-medium mb-1">{label}</label>
		<div className="relative">
			<input
				type={showPassword ? "text" : "password"}
				{...register(name)}
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
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	</div>
);

export default SignUp;
