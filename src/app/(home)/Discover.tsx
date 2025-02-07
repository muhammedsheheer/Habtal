"use client";
import Button from "@/components/Button";
import gsap from "gsap";
import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
const Discover: React.FC = () => {
	const textRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		gsap.fromTo(
			textRef.current,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 1.5, ease: "Power3.out" }
		);
	}, []);
	return (
		<section className="w-full h-full py-12 lg:py-20 px-4 sm:px-[10px] md:px-[50px] lg:px-[80px] 2xl:px-[140px] bg-[#f3f3f5] ">
			<div className="flex flex-col gap-8 lg:gap-14">
				<h1
					ref={textRef}
					className="text-[#25324B] text-3xl font-epilogue font-[600] lg:text-5xl"
				>
					Discover more <br /> than{" "}
					<span className="text-[#26A4FF]">5000+ Jobs</span>
				</h1>
				<div className="flex flex-col gap-4">
					<Image
						src={"/images/home/discover.png"}
						width={455}
						height={40}
						alt="line"
					/>
					<p className="w-full lg:w-[430px] text-sm lg:text-base font-epilogue text-[#515b6f] font-[400] ">
						Great platform for the job seeker that searching for new career
						heights and passionate about startups.
					</p>
					<div className="flex flex-col lg:flex-row gap-8 bg-[#fff] border-[#fff] px-6 py-6 w-full lg:w-[70%]">
						<div className="flex flex-row gap-4 items-center justify-center">
							<Search className="text-[#25324B] w-6 h-6 lg:w-8 lg:h-8" />
							<input
								className="border-b pb-3 text-[#000] border-gray-400 focus:outline-none focus:border-blue-500"
								type="text"
								placeholder="Job title or keyword"
							/>
						</div>
						<div className="flex flex-row gap-4 items-center justify-center">
							<MapPin className="text-[#25324B] w-6 h-6 lg:w-8 lg:h-8" />
							<input
								className="border-b pb-3 text-[#000] border-gray-400 focus:outline-none focus:border-blue-500"
								type="text"
								placeholder="Job title or keyword"
							/>
						</div>
						<div className="flex justify-center">
							<Button />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Discover;
