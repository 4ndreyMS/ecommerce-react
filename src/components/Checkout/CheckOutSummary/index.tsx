import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";
import { Link } from "react-router-dom";
import { IProduct } from "../../../models/IProduct";
import "./CheckOutSummary.scss";
interface ProductTotal {
	totalPrice: number;
	totalItems: number;
}

const CheckOutSummary = () => {
	const [cartItems] = useRecoilState(cartProductsState);
	const [productTotal, setProductTotal] = useState<ProductTotal>({
		totalItems: 0,
		totalPrice: 0,
	});
	const shipping = 10;
	const tax = 8;
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
		<Card className="bg-geige h-fit" radius="none">
			<CardHeader>
				<h2 className="text-2xl">Summary</h2>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="flex flex-col gap-4">
					<div>
						{cartItems.items.map((item: IProduct, i: number) => {
							return (
								<div key={i + "item"} className="item-info-cont">
									<p>{item.name + " x ( " + item.itemAmount + " )"}</p>
									<p>${Number(item.price) * item.itemAmount}</p>
								</div>
							);
						})}
					</div>
					<div className="item-info-cont">
						<p>Shipping: </p>

						<p>${shipping}</p>
					</div>

					<div>
						<div className="item-info-cont">
							<p>Total before tax</p>
							<p>${productTotal.totalPrice}</p>
						</div>
						<div className="item-info-cont">
							<p>Estimated tax</p>
							<p>${tax}</p>
						</div>
					</div>
					<div className="item-info-cont">
						<p>Order total</p>
						<p>${tax + shipping + productTotal.totalPrice}</p>
					</div>

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

export default CheckOutSummary;
