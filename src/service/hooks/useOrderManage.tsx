import { useRecoilState } from "recoil";
import { loginState } from "../../states/loginState";
import axios from "axios";
import { IOrderInfo } from "../../models/IOrderInfo";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { cartProductsState } from "../../states/cartState";
import { useState } from "react";
import { boolean } from "yup";

export const useOrderManage = () => {
	// const [cartItems, setCartItems] = useRecoilState(cartProductsState);
	const [response, setResoponse] = useState(false);
	const [error, setError] = useState("");

	const [globalUser] = useRecoilState(loginState);
	const [, setCart] = useRecoilState(cartProductsState);
	const navigate = useNavigate();

	const saveOrderItem = async (insertItem: IOrderInfo) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		const config = {
			headers: {
				Authorization: `Bearer ${globalUser.token}`,
			},
		};
		return await axios
			.post(baseURL + "/api/v1/order/create", insertItem, config)
			.then((response) => {
				if (response.data.data != undefined && response.data.data) {
					setResoponse(response.data.data);
					console.log("response on succes", response.data.data);
					return true;
				} else {
					console.log("response on error", response.data.data);
					setResoponse(false);
					return false;
				}
			})
			.catch((error: Error) => {
				toast.error("Error placing your order!");
				setResoponse(false);
				return false;
			});
	};
	return { saveOrderItem, response, error };
};
