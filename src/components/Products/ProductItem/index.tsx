import React from "react";
import { IProduct } from "../../../models/IProduct";
import "./products.scss"
const ProductItem: React.FC<{ productInfo: IProduct }> = ({ productInfo }) => {
	return (
		<div className="products__card">
			<a href={`/product-details?id=${productInfo.id}`}>
				<div>
					<img
						className="products__card-img"
						src={productInfo.image}
						alt={productInfo.name}
					/>
				</div>
				<div className="products__card-description">
					<p className="semi-bold">{productInfo.name}</p>
					<p className="semi-bold text-0 products__card-description-type">
						{productInfo.abstract}
					</p>
					<p className="semi-bold">${productInfo.price} </p>
				</div>
			</a>
		</div>
	);
};

export default ProductItem;
