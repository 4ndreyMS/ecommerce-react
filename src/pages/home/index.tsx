import React, { useEffect } from "react";
import Hero from "../../components/Hero";
import PreviewProducts from "../../components/Products/PreviewProducts";
import Footer from "../../components/Layout/Footer";
import { useLocation } from "react-router-dom";

export const scrollToSection = (sectionId: string) => {
	const targetElement = document.getElementById(sectionId);
	if (targetElement) {
		targetElement.scrollIntoView({ behavior: "smooth" });
	}
};

const HomePage = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const sectionId = location.hash.slice(1); // Remove the '#' character
			scrollToSection(sectionId);
		}
	}, [location.hash]);

	return (
		<>
			<Hero />
			<PreviewProducts />
			<Footer />
		</>
	);
};

export default HomePage;
