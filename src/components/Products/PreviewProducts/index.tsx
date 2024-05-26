import React, { useEffect, useState } from "react";
import "./PreviewProducts.scss";
import { IProduct, IProductSpring } from "../../../models/IProduct";
import axios from "axios";
import { getAllProducts } from "../../../service/ProductListService";
import ProductItem from "../ProductItem";
import "./PreviewProducts.scss";
import { Link } from "react-router-dom";
import { unMutableProductsState } from "../../../states/filteredProductsState";
import { useRecoilState } from "recoil";

const PreviewProducts = () => {
	const [producstList, setUnmutableProducts] = useRecoilState(
		unMutableProductsState
	);

	return (
		<div className="preview-products">
			<div className="preview-products__container">
				<h2 className="preview-products__title font-medium">
					Our top products
				</h2>

				{producstList.length < 0 && <p>Loading ....</p>}

				<div id="preview-products" className="products__container wrapper">
					{producstList.map((item: IProductSpring, i: number) => {
						return (
							item.featuredStatus && (
								<ProductItem
									key={"item" + i}
									showFeatured={true}
									productInfo={item}
								/>
							)
						);
					})}
				</div>
				<Link
					aria-label="Show more products"
					className="button-unfilled semi-bold"
					to={"/products"}
				>
					Show all
				</Link>
			</div>
		</div>
	);
};

export default PreviewProducts;
