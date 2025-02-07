import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const jobListings = Array(8).fill({
	companyLogo: "/images/home/CompanyLogo.svg",
	jobType: "Full Time",
	jobTitle: "Email Marketing",
	companyName: "Revolut",
	description: "Revolut is looking for Email Marketing to help team ma ...",
	tag: "Marketing",
	tags: "Business",
});

const Featured: React.FC = () => {
	return (
		<section className="w-full h-full pb-12 lg:pb-20">
			<div className="flex flex-col gap-4 lg:gap-8">
				<Image
					src={"/images/home/featurd_t.png"}
					width={1440}
					height={197}
					alt="line"
					className="w-full h-full"
				/>
				<div className="flex flex-col gap-4 px-4 sm:px-[10px] md:px-[50px] lg:px-[80px] 2xl:px-[140px] lg:gap-8">
					<div className="flex flex-row justify-between">
						<h2 className="text-[#25324B] font-[400] font-abel text-2xl lg:text-4xl ">
							Featured <span className="text-[#26A4FF]">jobs</span>
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
								className="flex border border-[#D6DDEB] px-4 py-2 flex-col gap-4 lg:gap-6"
							>
								<div className="flex flex-row items-center justify-between">
									<div>
										<Image
											src={job.companyLogo}
											width={1440}
											height={197}
											alt="Company Logo"
											className="w-14"
										/>
									</div>
									<div>
										<span className="text-[#4640DE] border border-[#4640DE] px-4 flex justify-center items-center py-2 text-center font-[400] font-epilogue text-sm ">
											{job.jobType}
										</span>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<span className="font-epilogue font-[600] text-base text-[#25324B]">
										{job.jobTitle}
									</span>
									<span className="text-[#515B6F] font-[400] font-epilogue text-base">
										{job.companyName}
									</span>
								</div>
								<div>
									<p className="text-[#7C8493] font-[400] font-inter text-base line-clamp-2 w-full">
										{job.description}
									</p>
								</div>
								<div className="flex flex-row gap-4">
									<span className="text-[#FFB836] px-4 py-2 font-epilogue text-sm font-[600] text-center rounded-full bg-opacity-15 bg-[#FFB836]">
										{job.tag}
									</span>
									<span className="text-[#56CDAD] px-4 py-2 font-epilogue text-sm font-[600] text-center rounded-full bg-opacity-15 bg-[#56CDAD]">
										{job.tags}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Featured;
