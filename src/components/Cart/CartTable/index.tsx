import React from "react";

import { IProduct, IProductSpring } from "../../../models/IProduct";
import { Button, Card, CardBody } from "@nextui-org/react";
import "./CartTable.scss";
import { useRecoilState } from "recoil";
import { IcartItem, cartProductsState } from "../../../states/cartState";
import { DeleteIcon } from "../../../assets/deleteIcon";
import { count } from "firebase/firestore";
import { Link } from "react-router-dom";
import { car } from "@cloudinary/url-gen/qualifiers/focusOn";
import axios from "axios";
import { loginState } from "../../../states/loginState";

// interface CartTableProps {
// 	cartList: IProductSpring[];
// }
// : React.FC<CartTableProps>
const CartTable = () => {
	const [cart, setCartItems] = useRecoilState(cartProductsState);
	const [globalUser] = useRecoilState(loginState);

	// const handleIncrease = (itemToIncrease: IProductSpring) => {
	// 	const updatedItems = cart.items.map((item: IProduct) =>
	// 		item.id === itemToIncrease.id
	// 			? { ...item, itemAmount: item.itemAmount + 1 }
	// 			: item
	// 	);
	// 	setCartItems({ count: cart.count + 1, items: updatedItems });
	// };

	// const handleDecrease = (itemToDecrease) => {
	// 	const updatedItems = cart.items.map((item: IProduct) =>
	// 		item === itemToDecrease
	// 			? {
	// 					...item,
	// 					itemAmount: item.itemAmount > 1 ? item.itemAmount - 1 : 1,
	// 			  }
	// 			: item
	// 	);
	// 	//in iterate over item obtaining the total
	// 	const updCount = getTotalProdItemsReduce(updatedItems);

	// 	setCartItems({ count: updCount, items: updatedItems });
	// };

	// const getTotalProdItemsReduce = (list) => {
	// 	return list.reduce(
	// 		(total: number, item: IProduct) => total + item.itemAmount,
	// 		0
	// 	);
	// };

	const handleDelete = async (itemToDelete: IProductSpring) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;

		await axios
			.delete(baseURL + "/api/v1/cart/deleteCartItem/" + itemToDelete.id, {
				headers: {
					Authorization: `Bearer ${globalUser.token}`,
				},
			})
			.then((response) => {
				if (response.data.data) {
					const updatedList = cart.filter(
						(item: IcartItem) => item.product !== itemToDelete
					);
					setCartItems(updatedList);
				}
			})
			.catch((error) => {
				console.error("Error fetching data:", error.message);
			});
	};

	// console.log("cart", cart);

	return (
		<div className="flex flex-col gap-4">
			{undefined != cart && cart.length < 1 && (
				<Card radius="none">
					<CardBody>
						<h2>Your cart is empty</h2>
						<p>
							View more products{" "}
							<Link className="txt-color-brown" to={"/products"}>
								here
							</Link>
						</p>
					</CardBody>
				</Card>
			)}

			{cart !== undefined &&
				cart.map((item, i: number) => {
					return (
						<Card radius="none" key={i + "item"}>
							<CardBody>
								<div className="cart-item flex gap-5">
									<div className="flex cart-item__img-cont ">
										<img
											className="cart-item__image"
											src={item.product.image}
											alt={item.product.name}
										/>
										<div>
											<h3>{item.product.name}</h3>
											<p>{item.product.summary}</p>
										</div>
									</div>

									<div className="cart-item__info-cont items-center">
										<div className="cart-item__amount-cont">
											<Button
												size="sm"
												className="amount-btn"
												radius="none"
												// onClick={() => handleDecrease(item.product)}
												aria-label="Decrease amount"
											>
												-
											</Button>
											<span>{item.quantity}</span>
											<Button
												size="sm"
												className="amount-btn"
												radius="none"
												// onClick={() => handleIncrease(item.product)}
												aria-label="Increase amount"
											>
												+
											</Button>
										</div>

										<p>${Number(item.product.price) * item.quantity}</p>
										<button
											className="delete-btn"
											aria-label="Delete"
											onClick={() => {
												handleDelete(item.product);
											}}
										>
											<DeleteIcon />
										</button>
									</div>
								</div>
							</CardBody>
						</Card>
					);
				})}
		</div>
	);
};

export default CartTable;
