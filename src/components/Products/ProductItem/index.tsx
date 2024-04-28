import React from "react";
import { IProduct } from "../../../models/IProduct";
import "./products.scss";
import { Chip } from "@nextui-org/react";
import { fillData } from "../../../service/ProductListService";
import { Link } from "react-router-dom";
const ProductItem: React.FC<{ productInfo: IProduct }> = ({ productInfo }) => {
	return (
		<div className="products__card">
			<Link to={`/product-details?id=${productInfo.id}`}>
				<div className="prducts__img-cont">
					<img
						className="products__card-img"
						src={productInfo.image}
						alt={productInfo.name}
					/>

					{productInfo.isFeatured && (
						<Chip
							className="products__chip"
							variant="faded"
							color="default"
							radius="sm"
						>
							Featured
						</Chip>
					)}
				</div>
				<div className="products__card-description">
					<p className="semi-bold">{productInfo.name}</p>
					<p className="semi-bold text-0 products__card-description-type">
						{productInfo.abstract}
					</p>
					<p className="semi-bold">${productInfo.price} </p>
				</div>
			</Link>
		</div>
	);
};

export default ProductItem;
