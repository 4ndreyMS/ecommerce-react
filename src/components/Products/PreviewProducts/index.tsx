import React, { useEffect, useState } from "react";
import "./PreviewProducts.scss";
import { IProductSpring } from "../../../models/IProduct";
import axios from "axios";
import ProductItem from "../ProductItem";
import "./PreviewProducts.scss";
import { Link } from "react-router-dom";

const PreviewProducts = () => {
	const [featuredProducstList, setFeaturedProducstList] = useState<
		IProductSpring[]
	>([]);

	const fetchData = async () => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		await axios
			.get(baseURL + "/api/v1/product/getAllFeatured")
			.then((response) => {
				if (response.data != undefined) {
					console.log(response.data.data);
					setFeaturedProducstList(response.data.data);
				}
			})
			.catch((error) => {
				console.error("Error fetching data:", error.message);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="preview-products">
			<div className="preview-products__container">
				<h2 className="preview-products__title font-medium">
					Our top products
				</h2>

				{featuredProducstList.length < 0 && <p>Loading ....</p>}

				<div id="preview-products" className="products__container wrapper">
					{featuredProducstList.map((item: IProductSpring, i: number) => {
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
