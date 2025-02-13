"use client";
import Image from "next/image";
import React from "react";

const LoginLeftSide: React.FC = () => {
	return (
		<div className="hidden lg:block relative bg-lightGrayBlue  w-2/5 h-screen pt-14">
			<Image
				src="/images/Login.png"
				fill
				style={{ objectFit: "cover" }}
				alt="Login"
			/>
		</div>
	);
};

export default LoginLeftSide;
