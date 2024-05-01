import React from "react";
import { IProduct } from "../../../models/IProduct";
import SimpleBanner from "../../Banners/SimpleBanner/intex";

const ProductDetail = ({ product }: { product: IProduct }) => {
	console.log(product);
	return (
		<>
			<div>
				<SimpleBanner name={product.name} />
				<div className="product-detail__container wrapper">
					<img
						src={product.image}
						alt={product.name}
						className="product-detail__image"
					/>
					<div className="product-detail__content-cont">
						<h1>{product.name}</h1>
						<p>
							<span className="semi-bold">Price: </span> ${product.price}
						</p>
						<p>
							<span className="semi-bold">Category: </span>
							{product.category}
						</p>
						<p>
							<span className="semi-bold">Description: </span>
							{product.description}
						</p>
						<div className="product-detail__reviews-cont">
							<div>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star"></span>
								<span className="fa fa-star"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetail;
