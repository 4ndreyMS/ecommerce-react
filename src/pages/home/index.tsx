import React from "react";
import Hero from "../../components/Hero";
import PreviewProducts from "../../components/Products/PreviewProducts";
import Footer from "../../components/Layout/Footer";
import { loginState } from "../../states/loginState";
import { useRecoilState } from "recoil";
const HomePage = () => {
	const [user] = useRecoilState(loginState);

	return (
		<>
			<Hero />
			<h1>{Object.keys(user).length > 0 ? user.user.email : "no data"}</h1>
			<PreviewProducts />
			<Footer />
		</>
	);
};

export default HomePage;
