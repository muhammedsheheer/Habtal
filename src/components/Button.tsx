import Image from "next/image";
import React from "react";

const Button: React.FC = () => {
	return (
		<section>
			<button className="bg-[#4640DE] text-[#fff]  hover:bg-[#312e7e] px-6 py-4 font-epilogue font-[600] text-sm lg:text-base ">
				Search my Job
			</button>
		</section>
	);
};

export default Button;
