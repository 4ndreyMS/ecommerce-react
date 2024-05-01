import React from "react";

const SimpleBanner = ({ name }: { name: string }) => {
	return (
		<div className="banner-details">
			<div className="banner-details__cont wrapper">
				<p className="banner-details__title">
					{"Home > products > "}
					<span className="semi-bold">{name}</span>
				</p>
			</div>
		</div>
	);
};

export default SimpleBanner;
