"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import LoginLeftSide from "@/components/login/LoginLeftside";

const Login: React.FC = () => {
	const [selectedOption, setSelectedOption] = useState<"user" | "company">(
		"user"
	);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<div className="flex flex-col w-full  bg-[#fff] lg:flex-row h-full">
			<LoginLeftSide />
			<div className="flex items-center justify-center w-full lg:w-3/5 h-screen">
				<div className="bg-white flex flex-col items-center w-full lg:w-3/5 py-8">
					<div className="flex gap-2 mb-6">
						<button
							onClick={() => setSelectedOption("company")}
							className={`px-5 py-2 rounded-sm ${
								selectedOption === "company"
									? "bg-[#E9EBFD] text-[#4640DE]"
									: " text-[#000]"
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
						Welcome Back, Dude
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

					<div className="w-full max-w-md bg-white p-6">
						<form>
							<div className="mb-4">
								<label className="block text-[#0d0d0d] font-medium mb-1">
									Email
								</label>
								<input
									type="email"
									className="w-full border rounded-sm px-3 py-2 text-gray-800"
									placeholder="Enter your email"
								/>
							</div>

							<div className="mb-4 relative">
								<div className="flex flex-row justify-between">
									<label className="block text-[#0d0d0d] font-medium mb-1">
										Password
									</label>
									<Link
										className="text-[#4640DE] font-medium text-sm mb-1"
										href="/forgot-password"
									>
										Forgot password?
									</Link>
								</div>
								<div className="relative">
									<input
										type={showPassword ? "text" : "password"}
										className="w-full border rounded-sm px-3 py-2 text-gray-800"
										placeholder="Enter your password"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute inset-y-0 right-3 flex items-center justify-center px-2 text-[#4640DE]"
									>
										{showPassword ? <EyeOff /> : <Eye />}
									</button>
								</div>
							</div>

							<button className="w-full bg-[#4640DE] text-white py-2 rounded-sm font-medium">
								Login
							</button>
						</form>
					</div>

					<div className="flex flex-row gap-1">
						<span className="text-[#202430]">Don’t have an account?</span>
						<Link className="text-[#4640DE]" href="/signup">
							SignUp
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
