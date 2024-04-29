import React, { useState } from "react";
import "./products.scss";
import "../PreviewProducts/PreviewProducts.scss";
import { IProduct } from "../../../models/IProduct";
import ProductItem from "../ProductItem";
import ProductsBanner from "../../Banners/ProductsBanner";
import FilterBy from "./FilterBy";
import { useRecoilState } from "recoil";
import { unMutableProductsState } from "../../../states/filteredProductsState";

const ProducsTable: React.FC<{
	//if the pagination calls this component the data is paginated
	paginatedItems: IProduct[];
}> = ({ paginatedItems }) => {
	const [allItems] = useRecoilState(unMutableProductsState);
	return (
		<section className="main-section">
			<ProductsBanner />
			{/* send the unmutable global list */}
			<FilterBy unmutableProdList={allItems} />
			<div className="products__container wrapper">
				{paginatedItems &&
					paginatedItems.map((product, i) => (
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
