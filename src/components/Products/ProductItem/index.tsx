import React from "react";
import { IProduct } from "../../../models/IProduct";
import "./products.scss";
import { Button, Chip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AddICon } from "../../../assets/addIcon";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";

interface ProductItemProps {
	productInfo: IProduct;
	showFeatured: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
	productInfo,
	showFeatured,
}) => {
	const [cartItems, setCartItems] = useRecoilState(cartProductsState);

	return (
		<div className="products__card">
			<Link to={`/product-details?id=${productInfo.id}`}>
				<div className="prducts__img-cont">
					<img
						className="products__card-img"
						src={productInfo.image}
						alt={productInfo.name}
					/>

					{showFeatured && productInfo.isFeatured && (
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
			</Link>

			<div className="products__card-description">
				<p className="semi-bold">{productInfo.name}</p>
				<p className="semi-bold text-0 products__card-description-type">
					{productInfo.abstract}
				</p>
				<div className="products__price-cont">
					<div>
						<p className="semi-bold">${productInfo.price} </p>
					</div>

					<Button
						onClick={() => {
							const amount = !productInfo.itemAmount
								? 1
								: productInfo.itemAmount + 1;
							const updatedProductInfo = {
								...productInfo,
								itemAmount: amount,
							};

							console.log(updatedProductInfo);
							console.log(cartItems);

							setCartItems([...cartItems, updatedProductInfo]);
						}}
						size="sm"
						isIconOnly
						radius="full"
						color="warning"
						variant="faded"
						aria-label="Add to cart"
						className="button-filled-brown-bg"
					>
						<AddICon />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
