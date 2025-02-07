import type { Metadata } from "next";
import {
	Abel,
	Epilogue,
	Geist,
	Geist_Mono,
	Inter,
	Red_Hat_Display,
} from "next/font/google";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const epilogue = Epilogue({
	subsets: ["latin"],
	variable: "--font-epilogue",
	weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const abel = Abel({
	subsets: ["latin"],
	variable: "--font-abel",
	weight: ["400"],
});

const red_hat_display = Red_Hat_Display({
	subsets: ["latin"],
	variable: "--font-red_hat_display",
	weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "Habtal",
	description: "Job Platform",
	icons: "images/navbar/logo.svg",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${epilogue.variable} ${red_hat_display.variable} ${abel.variable} ${inter.variable} antialiased`}
			>
				{children}
				<ToastContainer position="top-right" autoClose={3000} />
			</body>
		</html>
	);
}
