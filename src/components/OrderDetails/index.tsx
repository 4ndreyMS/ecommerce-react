import {
	Button,
	Card,
	CardBody,
	Chip,
	Select,
	SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { orderDetailState } from "../../states/orderDetailState";
import { useOrderManage } from "../../service/hooks/useOrderManage";
import { IOrder, ISingleOrder } from "../../models/IOrder";
import { useUserDetails } from "../../service/hooks/useUserDetails";

const OrderDetails = () => {
	const [OrderDetails, serOderDetails] = useRecoilState(orderDetailState);
	const [currentOrder, setCurrentOrder] = useState<ISingleOrder>();
	const [isAdmin, setIsAdmin] = useState(false);
	const { fetchIsAdmin } = useUserDetails();
	const [orderStatus, setOrderStatus] = useState(new Set([]));

	const { getOrderById, updateStatus } = useOrderManage();

	const fetchData = async () => {
		if (OrderDetails !== null) {
			const response = await getOrderById(OrderDetails?.orderNum);
			console.log("response", response);
			setCurrentOrder(response);
			response && setOrderStatus(new Set([response.orderStatus]));
		}

		const isAdmin = await fetchIsAdmin();
		setIsAdmin(isAdmin);
	};

	useEffect(() => {
		fetchData();
	}, []);

	function getCardType(number: string) {
		// Visa
		let re = new RegExp("^4");
		if (number.match(re) != null) return "Visa";

		// Mastercard
		re = new RegExp("^5[1-5]");
		if (number.match(re) != null) return "Mastercard";

		// AMEX
		re = new RegExp("^3[47]");
		if (number.match(re) != null) return "AMEX";

		return "NA";
	}
	const statusColorMap = {
		CONFIRMED: "success",
		CANCELED: "danger",
		PENDING: "warning",
	};
	useEffect(() => {
		console.log("sttus", orderStatus);
	}, [orderStatus]);
	return (
		<div className="flex flex-col">
			<div>
				<Button
					radius="none"
					className="font-medium bg-brown text-white"
					size="sm"
					onClick={() => {
						serOderDetails(null);
					}}
				>
					Back
				</Button>
			</div>
			<div className="flex flex-col gap-4">
				<div>
					<h2>
						Order #
						{currentOrder &&
							(currentOrder.id < 10
								? "000" + currentOrder.id
								: "00" + currentOrder.id.toString())}
					</h2>
					<p>Date of purchase: {currentOrder && currentOrder.creationDate}</p>
				</div>
				<div>
					{isAdmin && (
						<Select
							className="border-brown"
							radius="none"
							label="Order status"
							name="ordreStatus"
							selectedKeys={orderStatus}
							onChange={(status) => {
								setOrderStatus(new Set([status.target.value]));
								currentOrder &&
									updateStatus({
										id: currentOrder.id,
										orderStatus: status.target.value,
									});
							}}
							placeholder="Select the status"
							fullWidth
							variant="bordered"
						>
							<SelectItem key={"PENDING"} value={"PENDING"}>
								Pending
							</SelectItem>
							<SelectItem key={"CANCELED"} value={"CANCELED"}>
								Cancelled
							</SelectItem>
							<SelectItem key={"CONFIRMED"} value={"CONFIRMED"}>
								Confirmed
							</SelectItem>
						</Select>
					)}
					{!isAdmin && (
						<Chip
							radius="none"
							className="text-[black]"
							color={currentOrder && statusColorMap[currentOrder?.orderStatus]}
							size="sm"
							variant="flat"
						>
							{currentOrder &&
								currentOrder?.orderStatus.toString().charAt(0).toUpperCase() +
									currentOrder?.orderStatus.toString().slice(1).toLowerCase()}
						</Chip>
					)}
				</div>
				<div>
					<p className="font-semibold">Shipping Information</p>
					<p>{currentOrder && currentOrder.orderedItems[0].user.fullName}</p>
					<p>{currentOrder && currentOrder.orderedItems[0].user.email}</p>
				</div>
				<div>
					<p>{currentOrder && currentOrder.addres1}</p>
					{currentOrder && currentOrder.addres2 && (
						<p>{currentOrder.addres2}</p>
					)}
					<p>
						{currentOrder &&
							currentOrder.city +
								", " +
								currentOrder.state +
								", " +
								currentOrder.zipCode}
					</p>
				</div>
				<div>
					<p className="font-semibold">Payment Method</p>
					<div>
						<p>
							<span>
								{currentOrder != undefined &&
									getCardType(currentOrder.cardNumber.toString())}
							</span>
							<span>
								{" "}
								****
								{currentOrder != undefined &&
									currentOrder.cardNumber.toString().slice(-4)}
							</span>
						</p>
					</div>
				</div>

				<div>
					<p>Products</p>
					{currentOrder &&
						currentOrder.orderedItems.map((item, i) => {
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
													<span>Amount: {item.quantity}</span>
												</div>

												<p>Price ${Number(item.product.price)}</p>
											</div>
										</div>
									</CardBody>
								</Card>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;
