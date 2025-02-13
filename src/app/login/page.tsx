"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import LoginLeftSide from "@/components/login/LoginLeftside";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const loginSchema = z.object({
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
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
	// const [selectedOption, setSelectedOption] = useState<"user" | "company">(
	// 	"user"
	// );
	// const [showPassword, setShowPassword] = useState(false);
	// const router = useRouter();

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm<LoginFormInputs>({
	// 	resolver: zodResolver(loginSchema),
	// });

	// const mutation = useMutation({
	// 	mutationFn: async (data: LoginFormInputs) => {
	// 		const res = await signIn("credentials", {
	// 			redirect: false,
	// 			email: data.email,
	// 			password: data.password,
	// 		});

	// 		if (!res || res.error) throw new Error(res?.error || "Login failed");
	// 	},
	// 	onSuccess: async () => {
	// 		const sessionResponse = await fetch("/api/auth/session");
	// 		const session = await sessionResponse.json();

	// 		if (!session || !session.user || !session.user.role) {
	// 			toast.error("Invalid session data. Try again.");
	// 			return;
	// 		}

	// 		const { role } = session.user;

	// 		if (role === "user") {
	// 			router.push("/user/dashboard");
	// 		} else if (role === "employer") {
	// 			router.push("/company/dashboard");
	// 		} else if (role === "admin") {
	// 			router.push("/admin/dashboard");
	// 		} else {
	// 			router.push("/");
	// 		}
	// 		toast.success("Login successful!");
	// 	},
	// 	onError: (error) => {
	// 		toast.error(error.message || "Login failed");
	// 	},
	// });

	// const handleGoogleLogin = async () => {
	// 	const res = await signIn("google", { redirect: false });
	// 	if (res?.error) {
	// 		toast.error(res.error);
	// 	} else {
	// 		router.push("/user/dashboard");
	// 	}
	// };

	const [selectedOption, setSelectedOption] = useState<"user" | "company">(
		"user"
	);
	const [showPassword, setShowPassword] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsClient(true);
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	});

	const mutation = useMutation({
		mutationFn: async (data: LoginFormInputs) => {
			const res = await signIn("credentials", {
				redirect: false,
				email: data.email,
				password: data.password,
			});

			if (!res || res.error) throw new Error(res?.error || "Login failed");
		},
		onSuccess: async () => {
			if (!isClient) return;

			const sessionResponse = await fetch("/api/auth/session");
			const session = await sessionResponse.json();

			if (!session || !session.user || !session.user.role) {
				toast.error("Invalid session data. Try again.");
				return;
			}

			const { role } = session.user;

			if (role === "user") {
				router.push("/user/dashboard");
			} else if (role === "employer") {
				router.push("/company/dashboard");
			} else if (role === "admin") {
				router.push("/admin/dashboard");
			} else {
				router.push("/");
			}
			toast.success("Login successful!");
		},
		onError: (error) => {
			toast.error(error.message || "Login failed");
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

	if (!isClient) return null;

	return (
		<div className="flex flex-col w-full bg-[#fff] lg:flex-row h-full">
			<LoginLeftSide />
			<div className="flex items-center justify-center w-full lg:w-3/5 h-screen">
				<div className="bg-white flex flex-col items-center w-full lg:w-3/5 py-8">
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
						Welcome Back, Dude
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

					<div className="w-full max-w-md bg-white p-6">
						<form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
							<div className="mb-4">
								<label className="block text-[#0d0d0d] font-medium mb-1">
									Email
								</label>
								<input
									type="email"
									{...register("email")}
									className="w-full border rounded-sm px-3 py-2 text-gray-800"
									placeholder="Enter your email"
								/>
								{errors.email && (
									<p className="text-red-500 text-sm">{errors.email.message}</p>
								)}
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
										{...register("password")}
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
								{errors.password && (
									<p className="text-red-500 text-sm">
										{errors.password.message}
									</p>
								)}
							</div>

							<button
								type="submit"
								disabled={mutation.isPending}
								className="w-full bg-[#4640DE] text-white py-2 rounded-sm font-medium"
							>
								{mutation.isPending ? "Logging in..." : "Login"}
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
