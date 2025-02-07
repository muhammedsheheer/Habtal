import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Globe } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const Footer: React.FC = () => {
	return (
		<div className="flex flex-col bg-lightDark w-full h-full pb-10 px-4 lg:px-[50px] bg-[#000] xl:px-[100px]">
			<div className="flex flex-col lg:flex-row gap-6 lg:justify-between  py-8 lg:py-16">
				<div className="flex flex-col items-start gap-2 lg:gap-4">
					<Logo color="#fff" />
					<p className="text-[16px] text-[#D6DDEB] text-base lg:text-lg w-full max-w-[400px]">
						Great platform for the job seeker that passionate about startups.
						Find your dream job easier.
					</p>
				</div>
				<div className="flex flex-row jus gap-10  lg:gap-28 ">
					<ul className="flex flex-col gap-4">
						<li>
							<h3 className="text-white font-semibold text-[16px]">About</h3>
						</li>
						<li>
							<Link
								className="text-[#D6DDEB] text-[16px] hover:text-white"
								href="/companies"
							>
								Companies
							</Link>
						</li>
						<li>
							<Link
								className="text-[#D6DDEB] text-[16px] hover:text-white"
								href="/jobs"
							>
								Jobs
							</Link>
						</li>
						<li>
							<Link
								className="text-[#D6DDEB] text-[16px] hover:text-white"
								href="/terms"
							>
								Terms
							</Link>
						</li>
						<li>
							<Link
								className="text-[#D6DDEB] text-[16px] hover:text-white"
								href="privacy_policy"
							>
								Privacy Policy
							</Link>
						</li>
					</ul>
					<ul className="flex flex-col gap-4">
						<li>
							<h3 className="text-white font-semibold text-[16px]">
								Resources
							</h3>
						</li>
						<li>
							<Link
								className="text-[#D6DDEB] text-[16px] hover:text-white"
								href="/help_docs"
							>
								Help Docs
							</Link>
						</li>
						<li>
							<Link
								className="text-[#D6DDEB] text-[16px] hover:text-white"
								href="/guide"
							>
								Guide
							</Link>
						</li>
						<li>
							<Link
								className="text-[#D6DDEB] text-[16px] hover:text-white"
								href="/updates"
							>
								Updates
							</Link>
						</li>
						<li>
							<Link
								className="text-[#D6DDEB] text-[16px] hover:text-white"
								href="/contact"
							>
								Contact Us
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col  gap-5">
					<h3 className="text-white text-[16px] font-semibold">
						Get job notifications
					</h3>
					<p className="w-full max-w-[350px]  text-[#D6DDEB] text-base lg:text-lg">
						The latest job news, articles, sent to your inbox weekly.
					</p>
					<div className="flex flex-row gap-3">
						<input
							className="bg-white text-[#D6DDEB] pl-4"
							type="email"
							placeholder="Email Address"
						/>
						<button className="text-[13px] text-white px-4 py-2 bg-[#4640DE]">
							Subscribe
						</button>
					</div>
				</div>
			</div>
			<div>
				<hr className="border-t border-gray-500 my-14 " />
				<div className="flex flex-col gap-6 lg:gap-0 lg:flex-row lg:justify-between">
					<span className="text-[#D6DDEB] text-center">
						2025 @ Habtal. All rights reserved.
					</span>
					<ul className="flex flex-row gap-8 justify-center">
						{[Facebook, Instagram, Globe, Linkedin, Twitter].map(
							(Icon, index) => (
								<li key={index} className="flex items-center justify-center">
									<div className="bg-gray-500 rounded-full p-1">
										<Icon className="text-white text-2xl" />
									</div>
								</li>
							)
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Footer;
