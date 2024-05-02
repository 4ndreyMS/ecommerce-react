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
import { isEmptyObject } from "../../utils/objectValidations";

interface ModalProps {
	totalAmount: number;
}

const ModalCustom: React.FC<ModalProps> = ({ totalAmount }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [, setCart] = useRecoilState(cartProductsState);
	const [checkOutData] = useRecoilState(checkOutState);

	const clearCart = () => {
		setCart({ count: 0, items: [] });
	};

	console.log(
		Object.keys(checkOutData.addressForm).length >= 4 &&
			Object.keys(checkOutData.cardForm).length >= 4
	);

	console.log(
		checkOutData.addressForm,
		checkOutData.cardForm
		// Object.keys(checkOutData.addressForm).length >= 4 &&
		// 	Object.keys(checkOutData.cardForm).length >= 4
	);

	return (
		<>
			<Button
				isDisabled={
					!(Object.keys(checkOutData.addressForm).length >= 4) &&
					!(Object.keys(checkOutData.cardForm).length >= 4)
				}
				onPress={onOpen}
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
									<p className="text-center">Total amount: ${totalAmount}</p>
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
