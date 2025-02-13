"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";

const sendOtpApi = async (email: string) => {
	const res = await fetch("/api/auth/send-otp", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email }),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Failed to send OTP");
	return data;
};

const resetPasswordApi = async ({
	email,
	otp,
	newPassword,
}: {
	email: string;
	otp: string;
	newPassword: string;
}) => {
	const res = await fetch("/api/auth/forgot-password", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, otp, password: newPassword }),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Failed to reset password");
	return data;
};

const emailSchema = z.object({
	email: z.string().email("Invalid email format"),
});

const passwordSchema = z
	.object({
		otp: z.string().min(6, "OTP must be 6 digits"),
		newPassword: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

const ForgotPasswordOTPPage: React.FC = () => {
	const [otpSent, setOtpSent] = useState(false);

	const {
		register: registerEmail,
		handleSubmit: handleSubmitEmail,
		formState: { errors: emailErrors },
	} = useForm({ resolver: zodResolver(emailSchema) });

	const {
		register: registerPassword,
		handleSubmit: handleSubmitPassword,
		formState: { errors: passwordErrors },
	} = useForm({ resolver: zodResolver(passwordSchema) });

	const sendOtpMutation = useMutation({
		mutationFn: (email: string) => sendOtpApi(email),
		onSuccess: () => {
			setOtpSent(true);
			toast.success("OTP sent successfully!");
		},
		onError: (error: any) => {
			toast.error(error.message);
		},
	});

	const resetPasswordMutation = useMutation({
		mutationFn: (data: { email: string; otp: string; newPassword: string }) =>
			resetPasswordApi(data),
		onSuccess: () => {
			toast.success("Password reset successful!");
			setOtpSent(false);
		},
		onError: (error: any) => {
			toast.error(error.message);
		},
	});

	return (
		<div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50">
			<div className="hidden lg:block lg:w-1/2 h-full">
				<img
					src="/images/ResetPassword.webp"
					alt="Reset Password OTP"
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="bg-white shadow-md rounded-lg p-8 lg:w-1/3 w-full mx-4">
				<h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
					Forgot Password
				</h2>
				<p className="text-gray-600 text-center mb-6">
					{otpSent
						? "Enter the OTP sent to your email to reset your password."
						: "Enter your registered email to receive the OTP."}
				</p>

				{!otpSent && (
					<form
						onSubmit={handleSubmitEmail((data) =>
							sendOtpMutation.mutate(data.email)
						)}
					>
						<div className="mb-4">
							<label className="block text-gray-600 font-medium mb-1">
								Email Address
							</label>
							<input
								type="email"
								{...registerEmail("email")}
								className="w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
								placeholder="Enter your registered email"
							/>
							{emailErrors.email && (
								<p className="text-red-500 text-sm">
									{(emailErrors.email as FieldError).message}
								</p>
							)}
						</div>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700"
							disabled={sendOtpMutation.isPending}
						>
							{sendOtpMutation.isPending ? "Sending..." : "Send OTP"}
						</button>
					</form>
				)}

				{otpSent && (
					<form
						onSubmit={handleSubmitPassword((data) =>
							resetPasswordMutation.mutate({
								email: sendOtpMutation.variables || "",
								otp: data.otp,
								newPassword: data.newPassword,
							})
						)}
					>
						<div className="mb-4">
							<label className="block text-gray-600 font-medium mb-1">
								OTP
							</label>
							<input
								type="text"
								{...registerPassword("otp")}
								className="w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter the OTP"
							/>
							{passwordErrors.otp && (
								<p className="text-red-500 text-sm">
									{(passwordErrors.otp as FieldError).message}
								</p>
							)}
						</div>

						<div className="mb-4">
							<label className="block text-gray-600 font-medium mb-1">
								New Password
							</label>
							<input
								type="password"
								{...registerPassword("newPassword")}
								className="w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter your new password"
							/>
							{passwordErrors.newPassword && (
								<p className="text-red-500 text-sm">
									{(passwordErrors.newPassword as FieldError).message}
								</p>
							)}
						</div>

						<div className="mb-4">
							<label className="block text-gray-600 font-medium mb-1">
								Confirm Password
							</label>
							<input
								type="password"
								{...registerPassword("confirmPassword")}
								className="w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Confirm your new password"
							/>
							{passwordErrors.confirmPassword && (
								<p className="text-red-500 text-sm">
									{(passwordErrors.confirmPassword as FieldError).message}
								</p>
							)}
						</div>

						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700"
						>
							Reset Password
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default ForgotPasswordOTPPage;
