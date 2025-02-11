"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Clock } from "lucide-react";

const OTPPage: React.FC = () => {
	const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
	const [timer, setTimer] = useState<number>(60);
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get("email");

	const mutation = useMutation({
		mutationFn: async (otpData: { otp: string; email: string }) => {
			const response = await fetch("/api/auth/otp-verify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(otpData),
			});
			if (!response.ok) throw new Error("OTP verification failed!");
			return response.json();
		},
		onSuccess: () => {
			toast.success("OTP Verified Successfully!");
			router.replace("/login");
		},
		onError: (error) => {
			const errorMessage = error.message || "Invalid OTP. Please try again.";
			toast.error(errorMessage);
		},
	});

	const handleChange = (value: string, index: number) => {
		if (!/^\d?$/.test(value)) return;

		const updatedOtp = [...otp];
		updatedOtp[index] = value;
		setOtp(updatedOtp);

		if (value && index < otp.length - 1) {
			document.getElementById(`otp-input-${index + 1}`)?.focus();
		}
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (event.key === "Backspace" && !otp[index] && index > 0) {
			document.getElementById(`otp-input-${index - 1}`)?.focus();
		}
	};

	const handleSubmitOTP = () => {
		const otpValue = otp.join("");

		if (otpValue.length !== 6) {
			toast.error("OTP must be 6 digits");
			return;
		}

		mutation.mutate({ otp: otpValue, email: email! });
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

				<button
					onClick={handleSubmitOTP}
					className="w-full bg-[#4640DE] text-white py-2 rounded-md font-medium hover:bg-blue-700"
				>
					{mutation.isPending ? "Verifying..." : "Verify OTP"}
				</button>

				<p className="text-gray-600 text-center mt-6 flex items-center justify-center gap-2">
					{timer > 0 ? (
						<>
							<Clock size={18} />
							<span>Resend in {timer}s</span>
						</>
					) : (
						<button
							onClick={handleResendOTP}
							className="text-[#4640DE] hover:underline flex items-center gap-2"
						>
							<span>Resend OTP</span>
						</button>
					)}
				</p>
			</div>
		</div>
	);
};

export default OTPPage;
