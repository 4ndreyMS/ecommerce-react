import { Badge } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { CartIcon } from "./CartIcon";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../../states/cartState";
import { loginState } from "../../../states/loginState";
import axios from "axios";
import { isEmptyObject } from "../../../utils/objectValidations";
const CartIBadge = () => {
	const [isInvisible, setIsInvisible] = useState(false);
	const [counter, setCounter] = useState(0);
	const [cartItem] = useRecoilState(cartProductsState);
	const [loggedUser, setLoggedUSer] = useRecoilState(loginState);

	const getCartCounter = async () => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		await axios
			.get(baseURL + "/api/v1/cart/getCartCounter", {
				headers: {
					Authorization: `Bearer ${loggedUser.token}`,
				},
			})
			.then((response) => {
				console.log(response);
				if (response.data.data > 0) {
					setCounter(response.data.data);
					setIsInvisible(false);
				} else {
					setIsInvisible(true);
				}
			})
			.catch((error) => {
				console.error("Error fetching data:", error.message);
			});
	};
	useEffect(() => {
		isEmptyObject(loggedUser) ? setIsInvisible(true) : getCartCounter();
	}, [cartItem, loggedUser]);

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
