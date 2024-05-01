import React from "react";

import { IProduct } from "../../../models/IProduct";
import { Button, Card, CardBody } from "@nextui-org/react";
import "./CartTable.scss";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";
import { DeleteIcon } from "../../../assets/deleteIcon";

interface CartTableProps {
	cartList: IProduct[];
}

const CartTable: React.FC<CartTableProps> = ({ cartList }) => {
	const [cart, setCartItems] = useRecoilState(cartProductsState);

	const handleIncrease = (itemToIncrease: IProduct) => {
		setCartItems(
			cart.map((item: IProduct) =>
				item.id === itemToIncrease.id
					? { ...item, itemAmount: item.itemAmount + 1 }
					: item
			)
		);
	};

	const handleDecrease = (itemToDecrease) => {
		setCartItems(
			cart.map((item: IProduct) =>
				item === itemToDecrease
					? {
							...item,
							itemAmount: item.itemAmount > 1 ? item.itemAmount - 1 : 1,
					  }
					: item
			)
		);
	};

	const handleDelete = (itemToDelete) => {
		setCartItems(cart.filter((item) => item !== itemToDelete));
	};

	return (
		<div className="flex flex-col gap-4">
			{cart.map((product: IProduct, i: number) => {
				return (
					<Card radius="none" key={i + "item"}>
						<CardBody>
							<div className="cart-item flex gap-5">
								<img
									className="cart-item__image"
									src={product.image}
									alt={product.name}
								/>
								<div className="cart-item__info-cont items-center">
									<div>
										<h3>{product.name}</h3>
										<p>{product.abstract}</p>
									</div>
									<div className="cart-item__amount-cont">
										<Button
											size="sm"
											className="amount-btn"
											radius="none"
											onClick={() => handleDecrease(product)}
											aria-label="Decrease amount"
										>
											-
										</Button>
										<span>{product.itemAmount}</span>
										<Button
											size="sm"
											className="amount-btn"
											radius="none"
											onClick={() => handleIncrease(product)}
											aria-label="Increase amount"
										>
											+
										</Button>
									</div>
									<p>${Number(product.price) * product.itemAmount}</p>
									<button
										className="delete-btn"
										aria-label="Delete"
										onClick={() => {
											handleDelete(product);
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
