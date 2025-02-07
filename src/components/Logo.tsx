import Image from "next/image";
import React from "react";

interface LogoProps {
	color: string;
}

const Logo: React.FC<LogoProps> = ({ color }) => {
	return (
		<section>
			<div className="flex flex-row justify-center items-center gap-1">
				<Image
					src={"/images/navbar/logo.svg"}
					width={32}
					height={32}
					alt="logo"
					className="w-10"
				/>
				<span
					style={{ color: color }}
					className={` text-lg font-bold  font-redHat `}
				>
					Habtal
				</span>
			</div>
		</section>
	);
};

export default Logo;
