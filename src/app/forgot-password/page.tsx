"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPasswordOTPPage: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [otpSent, setOtpSent] = useState<boolean>(false);
	const [otp, setOtp] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	const handleSendOTP = (): void => {
		if (!email) {
			setError("Please enter your email address.");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Invalid email format.");
			return;
		}
		setError("");
		setOtpSent(true);
		toast.success("OTP has been sent to your email.");
	};

	const handleResetPassword = (): void => {
		if (!otp) {
			setError("Please enter the OTP sent to your email.");
			return;
		}
		if (!newPassword || !confirmPassword) {
			setError("Both password fields are required.");
			return;
		}
		if (newPassword !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setError("");
		toast.success("Password reset successful!");
	};

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

				<form
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
						e.preventDefault();
						otpSent ? handleResetPassword() : handleSendOTP();
					}}
				>
					{!otpSent && (
						<div className="mb-4">
							<label className="block text-gray-600 font-medium mb-1">
								Email Address
							</label>
							<input
								type="email"
								value={email}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setEmail(e.target.value)
								}
								className="w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
								placeholder="Enter your registered email"
							/>
						</div>
					)}

					{otpSent && (
						<>
							<div className="mb-4">
								<label className="block text-gray-600 font-medium mb-1">
									OTP
								</label>
								<input
									type="text"
									value={otp}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setOtp(e.target.value)
									}
									className="w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Enter the OTP"
								/>
							</div>

							<div className="mb-4">
								<label className="block text-gray-600 font-medium mb-1">
									New Password
								</label>
								<input
									type="password"
									value={newPassword}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setNewPassword(e.target.value)
									}
									className="w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Enter your new password"
								/>
							</div>
						</>
					)}

					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700"
					>
						{otpSent ? "Reset Password" : "Send OTP"}
					</button>
				</form>

				<p className="text-gray-600 text-center mt-6">
					Remembered your password?{" "}
					<a
						href="/login"
						className="text-blue-600 font-medium hover:underline"
					>
						Back to Login
					</a>
				</p>
			</div>
		</div>
	);
};

export default ForgotPasswordOTPPage;
