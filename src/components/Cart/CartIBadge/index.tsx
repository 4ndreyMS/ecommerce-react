import { Badge } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { CartIcon } from "./CartIcon";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";
const CartIBadge = () => {
	const [isInvisible, setIsInvisible] = useState(false);

	const [cartItem] = useRecoilState(cartProductsState);

	useEffect(() => {
		if (cartItem.count === 0 || Number.isNaN(cartItem.count)) {
			setIsInvisible(true);
		} else {
			setIsInvisible(false);
		}
	}, [[], cartItem]);
	return (
		<Badge
			color="danger"
			content={cartItem.count}
			isInvisible={isInvisible}
			shape="circle"
		>
			<CartIcon size={30} />
		</Badge>
	);
};

export default CartIBadge;
