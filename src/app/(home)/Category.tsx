import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const jobListings = Array(8).fill({
	companyLogo: "/images/home/categoryLogo.svg",
	jobTitle: "Email Marketing",
	description: "235 jobs available",
});

const Category: React.FC = () => {
	return (
		<section className="w-full h-full pb-12 lg:pb-20">
			<div className="flex flex-col gap-4 lg:gap-8">
				<div className="flex flex-col gap-4 px-4 sm:px-[10px] md:px-[50px] lg:px-[80px] 2xl:px-[140px] lg:gap-8">
					<div className="flex flex-row justify-between">
						<h2 className="text-[#25324B] font-[700] font-epilogue text-2xl lg:text-4xl ">
							Explore by <span className="text-[#26A4FF]">category</span>
						</h2>
						<Link
							className="flex flex-row gap-2 text-[#4640DE] font-[600] font-epilogue text-sm lg:text-base items-center justify-center "
							href={"/jobs"}
						>
							Show all jobs <ArrowRight className="w-4 text-[#4640DE]" />
						</Link>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{jobListings.map((job, index) => (
							<div
								key={index}
								className="flex border border-[#D6DDEB] hover:bg-opacity-35 hover:bg-[#4640DE] hover:cursor-pointer  px-4 py-2 flex-col gap-4 lg:gap-6"
							>
								<div className="flex flex-row items-center justify-between">
									<div>
										<Image
											src={job.companyLogo}
											width={1440}
											height={197}
											alt="Company Logo"
											className="w-10 "
										/>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<span className="font-epilogue  font-[600] text-base text-[#25324B]">
										{job.jobTitle}
									</span>
								</div>
								<div>
									<p className="text-[#7C8493]  flex flex-row  items-center gap-2 font-[400] font-inter text-base line-clamp-2 w-full">
										{job.description}{" "}
										<ArrowRight className="w-4  text-[#25324B]" />
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Category;
