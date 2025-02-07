import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Discover from "./(home)/Discover";
import Featured from "./(home)/Featured";
import Category from "./(home)/Category";

export default function Home() {
	return (
		<main className="relative overflow-hidden [100vh] w-full flex">
			<div className="flex flex-col justify-center items-center bg-[#fff] h-full w-full">
				<Navbar />
				<Discover />
				<Featured />
				<Category />
				<Footer />
			</div>
		</main>
	);
}
