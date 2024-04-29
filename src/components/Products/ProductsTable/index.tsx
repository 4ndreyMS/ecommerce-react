import React, { useState } from "react";
import "./products.scss";
import "../PreviewProducts/PreviewProducts.scss";
import { IProduct } from "../../../models/IProduct";
import ProductItem from "../ProductItem";
import ProductsBanner from "../../Banners/ProductsBanner";

const ProducsTable: React.FC<{ paginatedProducts: IProduct[] }> = ({
	paginatedProducts,
}) => {
	return (
		<section className="main-section">
			<ProductsBanner />
			<div className="products__container wrapper">
				{paginatedProducts &&
					paginatedProducts.map((product, i) => (
						<ProductItem
							showFeatured={false}
							key={`item-${i}`}
							productInfo={product}
						/>
					))}
			</div>
		</section>
	);
};

export default ProducsTable;
