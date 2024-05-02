import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";
import { IProduct } from "../../../models/IProduct";
import "./CheckOutSummary.scss";
import ModalCustom from "../../Modal";
interface ProductTotal {
	totalPrice: number;
	totalItems: number;
	totalPriceNoTax: number;
}

const CheckOutSummary = () => {
	const [cartItems] = useRecoilState(cartProductsState);
	const [productTotal, setProductTotal] = useState<ProductTotal>({
		totalItems: 0,
		totalPrice: 0,
		totalPriceNoTax: 0,
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
		setProductTotal({
			totalPrice: totalPrice,
			totalItems: totalItems,
			totalPriceNoTax: totalPrice + shipping,
		});
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
					<ModalCustom totalAmount={productTotal.totalPrice + tax + shipping} />
				</div>
			</CardBody>
		</Card>
	);
};

export default CheckOutSummary;
