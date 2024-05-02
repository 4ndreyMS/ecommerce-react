import React from "react";
import { IProduct } from "../../../models/IProduct";
import SimpleBanner from "../../Banners/SimpleBanner/intex";
import { Button } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";

const ProductDetail = ({ product }: { product: IProduct }) => {
	const [cartItems, setCartItems] = useRecoilState(cartProductsState);

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
						<Button
							aria-label="Add to cart"
							className="semi-bold button-unfilled max-w-[10rem]"
							// variant="flat"
							radius="none"
							onClick={() => {
								const amount = !product.itemAmount ? 1 : product.itemAmount + 1;

								//update sigle product amount
								const updatedProductInfo = {
									...product,
									itemAmount: amount,
								};

								const totalItemAmount = Number.isNaN(cartItems.count)
									? 1
									: cartItems.count + 1;
								setCartItems({
									count: totalItemAmount,
									items: [...cartItems.items, updatedProductInfo],
								});
							}}
						>
							Add to cart
						</Button>
						{/* <div className="product-detail__reviews-cont">
							<div>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star"></span>
								<span className="fa fa-star"></span>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetail;
