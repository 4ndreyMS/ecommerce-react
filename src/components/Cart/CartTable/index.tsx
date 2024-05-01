import React from "react";

import { IProduct } from "../../../models/IProduct";
import { Button, Card, CardBody } from "@nextui-org/react";
import "./CartTable.scss";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";
import { DeleteIcon } from "../../../assets/deleteIcon";
import { count } from "firebase/firestore";
import { Link } from "react-router-dom";

interface CartTableProps {
	cartList: IProduct[];
}

const CartTable: React.FC<CartTableProps> = ({ cartList }) => {
	const [cart, setCartItems] = useRecoilState(cartProductsState);

	const handleIncrease = (itemToIncrease: IProduct) => {
		const updatedItems = cart.items.map((item: IProduct) =>
			item.id === itemToIncrease.id
				? { ...item, itemAmount: item.itemAmount + 1 }
				: item
		);
		setCartItems({ count: cart.count + 1, items: updatedItems });
	};

	const handleDecrease = (itemToDecrease) => {
		const updatedItems = cart.items.map((item: IProduct) =>
			item === itemToDecrease
				? {
						...item,
						itemAmount: item.itemAmount > 1 ? item.itemAmount - 1 : 1,
				  }
				: item
		);
		//in iterate over item obtaining the total
		const updCount = getTotalProdItemsReduce(updatedItems);

		setCartItems({ count: updCount, items: updatedItems });
	};

	const getTotalProdItemsReduce = (list) => {
		return list.reduce(
			(total: number, item: IProduct) => total + item.itemAmount,
			0
		);
	};

	const handleDelete = (itemToDelete) => {
		const updatedList = cart.items.filter(
			(item: IProduct) => item !== itemToDelete
		);

		setCartItems({
			count: getTotalProdItemsReduce(updatedList),
			items: updatedList,
		});
	};

	return (
		<div className="flex flex-col gap-4">
			{cart.items.length < 1 && (
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
			{cart.items.map((product: IProduct, i: number) => {
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
