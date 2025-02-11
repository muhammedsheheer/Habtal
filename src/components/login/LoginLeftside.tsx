"use client";
import Image from "next/image";
import React from "react";

const LoginLeftSide: React.FC = () => {
	return (
		<div className="hidden lg:block relative bg-lightGrayBlue  w-2/5 h-screen pt-14">
			<Image
				className="w-full h-full absolute"
				src="/images/Login.png"
				alt="Man image"
				layout="fill"
				objectFit="cover"
			/>
		</div>
	);
};

export default LoginLeftSide;
