import React, { ReactNode } from "react";
import "./banners.scss";

interface BannerProps {
	title: string;
	children: ReactNode;
}

const BannerBgImage: React.FC<BannerProps> = ({ title, children }) => {
	return (
		<div className="banner-products">
			<div className="banner-products__cont">
				<h2>{title}</h2>
				{children}
			</div>
		</div>
	);
};

export default BannerBgImage;
