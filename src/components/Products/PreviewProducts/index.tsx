import React, { useEffect, useState } from "react";
import "./PreviewProducts.scss";
import { IProduct } from "../../../models/IProduct";
import axios from "axios";
import { getAllProducts } from "../../../service/ProductListService";
import ProductItem from "../ProductItem";
import "./PreviewProducts.scss";
import { Link } from "react-router-dom";

const PreviewProducts = () => {
	const [producstList, setProductList] = useState<IProduct[]>([]);
	useEffect(() => {
		getAllProducts().then((data) => setProductList(data));
	}, []);

	return (
		<div className="preview-products">
			<div className="preview-products__container">
				<h2 className="preview-products__title font-medium">
					Our top products
				</h2>

				{producstList.length < 0 && <p>Loading ....</p>}

				<div id="preview-products" className="products__container wrapper">
					{producstList.map((item: IProduct, i: number) => {
						return (
							item.isFeatured && (
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
