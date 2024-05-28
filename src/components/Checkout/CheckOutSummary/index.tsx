import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";
import "./CheckOutSummary.scss";
import ModalCustom from "../../Modal";
import { checkOutState } from "../../../states/checkOutState";
export interface IProductTotal {
	totalPrice: number;
	totalItems: number;
	totalPriceNoTax: number;
	taxPrice: number;
	shippingAmount: number;
}

const CheckOutSummary = () => {
	const [cartItems] = useRecoilState(cartProductsState);
	const [productTotal, setProductTotal] = useState<IProductTotal>({
		totalItems: 0,
		totalPrice: 0,
		totalPriceNoTax: 0,
		taxPrice: 0,
		shippingAmount: 0,
	});

	const shipping = 10;
	const tax = 8;
	useEffect(() => {
		let totalPrice = 0;
		let totalItems = 0;

		cartItems.forEach((item) => {
			const price = Number(item.product.price) * item.quantity;
			totalPrice += price;
			totalItems += item.quantity;
		});
		setProductTotal({
			totalPrice: totalPrice,
			totalItems: totalItems,
			totalPriceNoTax: totalPrice + shipping,
			taxPrice: tax,
			shippingAmount: shipping,
		});
	}, [cartItems]);

	return (
		<Card className="bg-geige h-fit" radius="none">
			<CardHeader>
				<h2 className="text-2xl">Summary</h2>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="flex flex-col gap-4">
					<div>
						{cartItems.map((item, i: number) => {
							return (
								<div key={i + "item"} className="item-info-cont">
									<p>{item.product.name + " x ( " + item.quantity + " )"}</p>
									<p>${Number(item.product.price) * item.quantity}</p>
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
							<p>${productTotal.totalPriceNoTax}</p>
						</div>
						<div className="item-info-cont">
							<p>Estimated tax</p>
							<p>${tax}</p>
						</div>
					</div>
					<div className="item-info-cont">
						<p>Order total</p>
						<p>${productTotal.totalPrice + tax + shipping}</p>
					</div>
					<ModalCustom totalAmount={productTotal} />
				</div>
			</CardBody>
		</Card>
	);
};

export default CheckOutSummary;
