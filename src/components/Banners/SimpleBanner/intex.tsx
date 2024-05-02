import React from "react";
import { Link } from "react-router-dom";

const SimpleBanner = ({ name }: { name: string }) => {
	return (
		<div className="banner-details">
			<div className="banner-details__cont wrapper">
				<p className="banner-details__title">
					<Link to="/">Home</Link>
					{" > "}
					<Link to="/products">Products</Link>
					{" > "}
					<span className="semi-bold">{name}</span>
				</p>
			</div>
		</div>
	);
};

export default SimpleBanner;
