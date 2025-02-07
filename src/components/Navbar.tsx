"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
const Navbar: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="w-full h-[10vh] bg-[#F8F8FD]">
			<div className="flex flex-row justify-between items-center pt-2 px-4 md:px-10 h-16">
				<div className="flex items-center gap-8">
					<Link href="/">
						<Logo color="#25324B" />
					</Link>

					<div className="hidden md:flex flex-row items-center gap-6">
						<Link
							href="#"
							className="text-[16px] font-epilogue font-medium hover:text-[#4640DE] relative inline-block text-[#515B6F] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#4640DE] after:transition-all after:duration-300 hover:after:w-full"
						>
							Find Jobs
						</Link>
						<Link
							href="#"
							className="text-[16px] font-epilogue font-medium hover:text-[#4640DE] relative inline-block text-[#515B6F] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#4640DE] after:transition-all after:duration-300 hover:after:w-full"
						>
							Browse Companies
						</Link>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<button
						className="block md:hidden text-[#515B6F] text-2xl"
						onClick={toggleMenu}
					>
						☰
					</button>

					<div className="hidden md:flex gap-3">
						<button className="border font-epilogue text-[13px] font-semibold bg-[#F8F8FD] px-3 py-2 hover:bg-[#4640DE] hover:text-white text-[#4640DE]">
							<Link href="/login">Login</Link>
						</button>
						<button className="border font-epilogue text-[13px] font-semibold bg-[#4640DE] hover:text-[#4640DE] hover:bg-white px-2 py-2 text-[#F8F8FD]">
							<Link href="/signup">Signup</Link>
						</button>
					</div>
				</div>
			</div>

			<div
				className={`fixed top-0 left-0 w-[75%] h-full bg-white shadow-lg transform transition-transform duration-300 ${
					isMenuOpen ? "translate-x-0" : "-translate-x-full"
				} z-50`}
			>
				<button
					className="absolute top-4 right-4 text-[#515B6F] text-2xl"
					onClick={toggleMenu}
				>
					✕
				</button>
				<div className="absolute top-4 left-4">
					<Logo color="#25324B" />
				</div>
				<div className="flex flex-col items-start px-5 pt-28 gap-6">
					<Link
						href="#"
						className="text-[16px] font-epilogue font-medium text-[#515B6F] hover:text-[#4640DE]"
						onClick={toggleMenu}
					>
						Find Jobs
					</Link>
					<Link
						href="#"
						className="text-[16px] font-epilogue font-medium text-[#515B6F] hover:text-[#4640DE]"
						onClick={toggleMenu}
					>
						Browse Companies
					</Link>
					<button className="w-full border font-epilogue text-[13px] font-semibold bg-white px-3 py-2 text-[#4640DE]">
						<Link href="/login">Login</Link>
					</button>
					<button className="w-full font-epilogue border text-[13px] font-semibold bg-[#4640DE] px-2 py-2 text-white">
						<Link href="/signup">Signup</Link>
					</button>
				</div>
			</div>

			{isMenuOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={toggleMenu}
				></div>
			)}
		</nav>
	);
};

export default Navbar;
