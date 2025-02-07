"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Clock } from "lucide-react";

const OTPPage: React.FC = () => {
	const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
	const [error, setError] = useState<string>("");
	const [timer, setTimer] = useState<number>(60);
	const router = useRouter();

	const handleChange = (value: string, index: number) => {
		if (!/^\d?$/.test(value)) return;
		const updatedOtp = [...otp];
		updatedOtp[index] = value;
		setOtp(updatedOtp);

		if (value && index < otp.length - 1) {
			const nextInput = document.getElementById(
				`otp-input-${index + 1}`
			) as HTMLInputElement | null;
			nextInput?.focus();
		}
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (event.key === "Backspace" && !otp[index] && index > 0) {
			const prevInput = document.getElementById(
				`otp-input-${index - 1}`
			) as HTMLInputElement | null;
			prevInput?.focus();
		}
	};

	const handleSubmit = () => {
		if (otp.includes("")) {
			setError("Please enter the complete OTP.");
			return;
		}
		setError("");
		toast.success(`OTP Submitted: ${otp.join("")}`);
	};

	const handleResendOTP = () => {
		setOtp(new Array(6).fill(""));
		setTimer(60);
		toast.success("OTP resent successfully.");
	};

	useEffect(() => {
		const countdown = setInterval(() => {
			setTimer((prev) => (prev > 0 ? prev - 1 : prev));
		}, 1000);
		return () => clearInterval(countdown);
	}, []);

	return (
		<div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-50">
			<div className="hidden lg:block lg:w-1/2 h-full">
				<Image
					src="/images/OtpImage.webp"
					alt="OTP Verification"
					width={600}
					height={400}
					className="w-full h-full object-cover"
					priority
				/>
			</div>

			<div className="bg-white shadow-md rounded-lg p-8 lg:w-1/3 w-full mx-4">
				<h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
					OTP Verification
				</h2>
				<p className="text-gray-600 text-center mb-6">
					Enter the 6-digit code sent to your registered email or phone.
				</p>

				<div className="flex justify-center gap-2 mb-4">
					{otp.map((digit, index) => (
						<input
							key={index}
							id={`otp-input-${index}`}
							type="text"
							value={digit}
							maxLength={1}
							onChange={(e) => handleChange(e.target.value, index)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							className="w-12 h-12 text-center border rounded-md text-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
						/>
					))}
				</div>

				{error && (
					<p className="text-red-500 text-sm text-center mb-4">{error}</p>
				)}

				<button
					onClick={handleSubmit}
					className="w-full bg-[#4640DE] text-white py-2 rounded-md font-medium hover:bg-blue-700"
				>
					Verify OTP
				</button>

				<div className="flex justify-between items-center mt-4">
					<button
						onClick={handleResendOTP}
						className={`text-[#4640DE] font-medium hover:underline ${
							timer > 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
						}`}
						disabled={timer > 0}
					>
						Resend OTP
					</button>
					<div className="flex items-center text-gray-600">
						<Clock className="mr-2" size={18} />
						{timer > 0 ? `Resend in ${timer}s` : "Ready to resend"}
					</div>
				</div>

				<p className="text-gray-600 text-center mt-6">
					Entered the wrong details?{" "}
					<span
						onClick={() => router.push("/login")}
						className="text-[#4640DE] font-medium hover:underline cursor-pointer"
					>
						Back to Login
					</span>
				</p>
			</div>
		</div>
	);
};

export default OTPPage;
