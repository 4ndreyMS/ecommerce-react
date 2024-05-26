import { Badge } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { CartIcon } from "./CartIcon";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";
const CartIBadge = () => {
	const [isInvisible, setIsInvisible] = useState(false);
	const [counter, setCounter] = useState(0);
	const [cartItem] = useRecoilState(cartProductsState);

	useEffect(() => {
		let countItems = 0;
		cartItem.forEach((item) => {
			countItems = countItems + item.quantity;
		});

		setCounter(countItems);
		if (countItems === 0) {
			setIsInvisible(true);
		} else {
			setIsInvisible(false);
		}
	}, [[], cartItem]);
	return (
		<Badge
			color="danger"
			content={counter}
			isInvisible={isInvisible}
			shape="circle"
		>
			<CartIcon size={30} />
		</Badge>
	);
};

export default CartIBadge;
