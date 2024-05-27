import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import React from "react";
import "./Modal.scss";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../states/cartState";
import { checkOutState } from "../../states/checkOutState";
import { useOrderManage } from "../../service/hooks/useOrderManage";
import { IOrderInfo } from "../../models/IOrderInfo";
import { IProductTotal } from "../Checkout/CheckOutSummary";
import toast from "react-hot-toast";

interface ModalProps {
	totalAmount: IProductTotal;
}

const ModalCustom: React.FC<ModalProps> = ({ totalAmount }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { saveOrderItem, response } = useOrderManage();
	const [, setCart] = useRecoilState(cartProductsState);
	const [checkOutData] = useRecoilState(checkOutState);

	const clearCart = () => {
		setCart([]);
	};

	const storeOrderInfo = () => {
		const newOrder: IOrderInfo = {
			id: 0,
			totalAmount: totalAmount.totalItems,
			taxAmount: totalAmount.taxPrice,
			totalWithoutTax: totalAmount.totalPriceNoTax,
			orderStatus: "PENDING",
			addres1: checkOutData.addressForm.address1,
			addres2: checkOutData.addressForm.address2,
			city: checkOutData.addressForm.city,
			state: checkOutData.addressForm.state,
			zipCode: checkOutData.addressForm.zipCode,
			cardNumber: checkOutData.cardForm.cardNumber,
			cardType: checkOutData.cardForm.cardType,
			expiryDate: checkOutData.cardForm.expiryDate,
		};
		saveOrderItem(newOrder).then((response) => {
			if (response) {
				onOpen();
				setTimeout(() => {
					// Clear the state
					setCart([]);
					// Redirect to the cart
				}, 25000);
			} else {
				console.log("response", response);
				toast.error("Error placing your order!");
			}
		});
	};

	return (
		<>
			<Button
				isDisabled={
					checkOutData.addressForm.address1 === "" ||
					checkOutData.addressForm.address2 === "" ||
					checkOutData.addressForm.city === "" ||
					checkOutData.addressForm.state === "" ||
					checkOutData.addressForm.zipCode === "" ||
					checkOutData.cardForm.cardNumber === "" ||
					checkOutData.cardForm.expiryDate === ""
				}
				onPress={() => {
					storeOrderInfo();
				}}
				aria-label="Place your order"
				className="semi-bold btn-filled-transparent"
				radius="none"
			>
				Place your order
			</Button>
			<Modal
				onClick={clearCart}
				placement={"center"}
				size="md"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				className="modal"
			>
				<ModalContent>
					{(onClose) => (
						<div>
							<ModalHeader className="flex flex-col gap-1">
								Order Confirmed
							</ModalHeader>
							<ModalBody>
								<h2 className="modal-succes-purchase text-2xl">
									Thanks for your purchase!
								</h2>

								<div className="success-message flex justify-center">
									<img
										className="max-w-[6rem]"
										src="/images/successImg.png"
										alt="Succes image"
									/>
								</div>
								<div>
									<p className="text-center">
										Total amount: ${totalAmount.taxPrice}
									</p>
								</div>
								<div>
									<p className="text-center">
										Great news! Your order is on its way! We expect to ship your
										product within the next 5 days.
									</p>
								</div>
							</ModalBody>
							<ModalFooter>
								<div>
									<Button
										color="danger"
										variant="light"
										onPress={() => {
											clearCart();
											onClose;
										}}
									>
										Close
									</Button>
								</div>
							</ModalFooter>
						</div>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalCustom;
