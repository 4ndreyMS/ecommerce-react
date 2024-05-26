import React from "react";
import { IProduct, IProductSpring } from "../../../models/IProduct";
import "./products.scss";
import { Button, Chip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AddICon } from "../../../assets/addIcon";
import { useRecoilState } from "recoil";
import { IcartItem, cartProductsState } from "../../../states/cartState";
import { loginState } from "../../../states/loginState";
import { IinsertItemCart } from "../ProductDetail/ProductDetail";
import axios from "axios";

interface ProductItemProps {
	productInfo: IProductSpring;
	showFeatured: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
	productInfo,
	showFeatured,
}) => {
	const [cartItems, setCartItems] = useRecoilState(cartProductsState);
	const [globalUser] = useRecoilState(loginState);

	const addToCart = async (insertItem: IinsertItemCart) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		const config = {
			headers: {
				Authorization: `Bearer ${globalUser.token}`,
			},
		};
		await axios
			.post(baseURL + "/api/v1/cart/create", insertItem, config) // Cambia la URL a tu endpoint de autenticación
			.then((response) => {
				const responseData = response.data.data;
				const responseProductItem: IcartItem = {
					quantity: responseData.quantity,
					product: responseData.product,
				};

				let productExists = false;

				// Create a new array with updated quantity for existing product
				const updatedCartItems = cartItems.map((item) => {
					if (item.product.id === responseProductItem.product.id) {
						productExists = true;
						return { ...item, quantity: responseProductItem.quantity };
					}
					return item;
				});

				// If the product does not exist, insert the new item
				if (productExists) {
					setCartItems(updatedCartItems);
				} else {
					setCartItems([...cartItems, responseProductItem]);
				}

				// Update the state
			})
			.catch((erro: Error) => {
				throw erro.message;
			});
	};

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
								console.log("cartItems", cartItems);

								(cartItems != null || cartItems != undefined) &&
									cartItems.map((item) => {
										quantity =
											item.product.id === productInfo.id
												? item.quantity + 1
												: 1;
									});

								const insertItem: IinsertItemCart = {
									product: productInfo,
									quantity: quantity,
								};
								addToCart(insertItem);
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
