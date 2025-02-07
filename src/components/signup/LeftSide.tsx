import Image from "next/image";
import React from "react";

const LeftSide: React.FC = () => {
	return (
		<div className="hidden lg:flex items-center justify-center bg-lightGrayBlue w-2/5 h-screen pt-24">
			<Image
				className="max-w-full max-h-full object-contain"
				src="/images/SignUp.png"
				alt="Man image"
				width={500}
				height={500}
				priority
			/>
		</div>
	);
};

export default LeftSide;
