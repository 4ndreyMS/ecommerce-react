import React from "react";

import { IProductSpring } from "../../../models/IProduct";
import { Button, Card, CardBody } from "@nextui-org/react";
import "./CartTable.scss";
import { useRecoilState } from "recoil";
import { IcartItem, cartProductsState } from "../../../states/cartState";
import { DeleteIcon } from "../../../assets/deleteIcon";
import { Link } from "react-router-dom";
import { useCartManage } from "../../../service/hooks/useCartManage";

const CartTable = () => {
	const [cart] = useRecoilState(cartProductsState);
	const { saveCartItem, deleteCartItem } = useCartManage();

	const handleIncrease = (itemToIncrease: IcartItem) => {
		const insertItem: IcartItem = {
			product: itemToIncrease.product,
			quantity: itemToIncrease.quantity + 1,
		};

		saveCartItem(insertItem, "Cart updated!");
	};

	const handleDecrease = (itemToDecrese: IcartItem) => {
		if (itemToDecrese.quantity === 1) {
			deleteCartItem(itemToDecrese.product);
		} else {
			const insertItem: IcartItem = {
				product: itemToDecrese.product,
				quantity: itemToDecrese.quantity - 1,
			};
			saveCartItem(insertItem, "Cart updated!");
		}
	};

	const handleDelete = (itemToDelete: IProductSpring) => {
		deleteCartItem(itemToDelete);
	};

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
												onClick={() => handleDecrease(item)}
												aria-label="Decrease amount"
											>
												-
											</Button>
											<span>{item.quantity}</span>
											<Button
												size="sm"
												className="amount-btn"
												radius="none"
												onClick={() => handleIncrease(item)}
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
