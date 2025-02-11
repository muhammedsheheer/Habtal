"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const router = useRouter();

	const handleLogout = async () => {
		await signOut({ redirect: false });
		router.push("/login");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
			<button
				onClick={handleLogout}
				className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
			>
				Logout
			</button>
		</div>
	);
}
