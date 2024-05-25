import React from "react";
import "./products.scss";
import "../PreviewProducts/PreviewProducts.scss";
import { IProductSpring } from "../../../models/IProduct";
import ProductItem from "../ProductItem";
import FilterBy from "./FilterBy";
import { useRecoilState } from "recoil";
import { unMutableProductsState } from "../../../states/filteredProductsState";

const ProducsTable: React.FC<{
	//if the pagination calls this component the data is paginated
	paginatedItems: IProductSpring[];
}> = ({ paginatedItems }) => {
	const [allItems] = useRecoilState(unMutableProductsState);

	const highestPrice: number = Math.max(
		...allItems.map((item: IProductSpring) => Number(item.price))
	);

	return (
		<section className="main-section">
			{/* send the unmutable global list */}
			<FilterBy highestPrice={highestPrice} unmutableProdList={allItems} />
			{paginatedItems.length < 1 && (
				<div className="wrapper">
					<h2 className="w-full">
						Sorry, we couldn’t find the product you’re looking for.
					</h2>
				</div>
			)}
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
