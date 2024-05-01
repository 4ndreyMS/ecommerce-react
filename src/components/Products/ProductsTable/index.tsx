import React, { useState } from "react";
import "./products.scss";
import "../PreviewProducts/PreviewProducts.scss";
import { IProduct } from "../../../models/IProduct";
import ProductItem from "../ProductItem";
import FilterBy from "./FilterBy";
import { useRecoilState } from "recoil";
import { unMutableProductsState } from "../../../states/filteredProductsState";

const ProducsTable: React.FC<{
	//if the pagination calls this component the data is paginated
	paginatedItems: IProduct[];
}> = ({ paginatedItems }) => {
	const [allItems] = useRecoilState(unMutableProductsState);

	const highestPrice: number = Math.max(
		...allItems.map((item: IProduct) => Number(item.price))
	);

	console.log(highestPrice);
	return (
		<section className="main-section">
			{/* send the unmutable global list */}
			<FilterBy highestPrice={highestPrice} unmutableProdList={allItems} />
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
