import React from "react";
import { IProductSpring } from "../../../models/IProduct";
import "./products.scss";
import { Button, Chip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AddICon } from "../../../assets/addIcon";
import { useRecoilState } from "recoil";
import { IcartItem, cartProductsState } from "../../../states/cartState";
import { loginState } from "../../../states/loginState";
import { useCartManage } from "../../../service/hooks/useCartManage";

interface ProductItemProps {
	productInfo: IProductSpring;
	showFeatured: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
	productInfo,
	showFeatured,
}) => {
	const [cartItems] = useRecoilState(cartProductsState);
	const [globalUser] = useRecoilState(loginState);
	const { saveCartItem } = useCartManage();

	return (
		<div className="products__card">
			<Link to={`/product-details?id=${productInfo.id}`}>
				<div className="prducts__img-cont">
					<img
						className="products__card-img"
						src={productInfo.image}
						alt={productInfo.name}
					/>

					{showFeatured && productInfo.featuredStatus && (
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
					{productInfo.summary}
				</p>
				<div className="products__price-cont">
					<div>
						<p className="semi-bold">${productInfo.price} </p>
					</div>
					{globalUser.token != undefined && (
						<Button
							onClick={() => {
								//validate if increments or is the same
								let quantity = 1;

								cartItems != null &&
									cartItems != undefined &&
									cartItems.forEach((item) => {
										quantity =
											item.product.id === productInfo.id
												? item.quantity + 1
												: 1;
									});

								const insertItem: IcartItem = {
									product: productInfo,
									quantity: quantity,
								};

								saveCartItem(insertItem);
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
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
