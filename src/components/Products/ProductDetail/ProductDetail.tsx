import { IProduct, IProductSpring } from "../../../models/IProduct";
import SimpleBanner from "../../Banners/SimpleBanner/intex";
import { Button } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { IcartItem, cartProductsState } from "../../../states/cartState";
import axios from "axios";
import { loginState } from "../../../states/loginState";
import { isEmptyObject } from "../../../utils/objectValidations";

interface IinsertItemCart {
	product: IProductSpring;
	quantity: number;
}

const ProductDetail = ({ product }: { product: IProductSpring }) => {
	const [cartItems, setCartItems] = useRecoilState(cartProductsState);
	const [globalUser] = useRecoilState(loginState);

	const addToCart = async (insertItem: IinsertItemCart) => {
		console.log(insertItem);
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

	// console.log();

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
						{!isEmptyObject(globalUser) && (
							<Button
								aria-label="Add to cart"
								className="semi-bold button-unfilled max-w-[10rem]"
								// variant="flat"
								radius="none"
								onClick={() => {
									//validate if increments or is the same
									let quantity = 1;
									console.log("cartItems", cartItems);

									(cartItems != null || cartItems != undefined) &&
										cartItems.map((item) => {
											quantity =
												item.product.id === product.id ? item.quantity + 1 : 1;
										});

									const insertItem: IinsertItemCart = {
										product: product,
										quantity: quantity,
									};
									addToCart(insertItem);
								}}
							>
								Add to cart
							</Button>
						)}

						{/* <Button
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
						</Button> */}
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
