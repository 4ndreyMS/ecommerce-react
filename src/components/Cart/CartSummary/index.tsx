import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";
import { IProduct } from "../../../models/IProduct";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";

interface ProductTotal {
	totalPrice: number;
	totalItems: number;
}
const CartSummary = () => {
	const [productTotal, setProductTotal] = useState<ProductTotal>({
		totalItems: 0,
		totalPrice: 0,
	});
	const [cartItems] = useRecoilState(cartProductsState);

	useEffect(() => {
		let totalPrice = 0;
		let totalItems = 0;
		cartItems.items.forEach((product: IProduct) => {
			const price = Number(product.price) * product.itemAmount;
			totalPrice += price;
			totalItems += product.itemAmount;
		});
		setProductTotal({ totalPrice: totalPrice, totalItems: totalItems });
	}, [cartItems.items]);

	return (
		<Card className="bg-geige max-w-[20rem]  " radius="none">
			<CardHeader>
				<h2 className="text-2xl">Summary</h2>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="flex flex-col gap-4">
					<p>
						Subtotal{" "}
						{`(${productTotal.totalItems} products ): $ ${productTotal.totalPrice}`}
					</p>
					<Button
						isDisabled={cartItems.count < 1}
						as={Link}
						aria-label="Prooced to checkout"
						className="semi-bold btn-filled-transparent"
						to="/checkout"
						// variant="flat"
						radius="none"
					>
						Proceed to pay
					</Button>
				</div>
			</CardBody>
		</Card>
	);
};

export default CartSummary;
