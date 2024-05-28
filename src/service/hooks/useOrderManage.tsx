import { useRecoilState } from "recoil";
import { loginState } from "../../states/loginState";
import axios from "axios";
import { IOrderInfo } from "../../models/IOrderInfo";
import toast from "react-hot-toast";
import { useState } from "react";
import { IOrder } from "../../models/IOrder";
export interface IUpdInterface {
	id: number;
	orderStatus: string;
}
export const useOrderManage = () => {
	// const [cartItems, setCartItems] = useRecoilState(cartProductsState);
	const [response, setResoponse] = useState(false);
	const [error] = useState("");

	const [globalUser] = useRecoilState(loginState);

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

	const getUserOrders = async () => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		try {
			const response = await axios.get(
				baseURL + "/api/v1/order/allUserOrders",
				{
					headers: {
						Authorization: `Bearer ${globalUser.token}`,
					},
				}
			);
			return response.data.data; // return the data to the caller
		} catch (error) {
			console.error("Error fetching data:", error);
			return null; // return null in case of an error
		}
	};

	const getAllOrders = async () => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		try {
			const response = await axios.get(baseURL + "/api/v1/order/allOrder", {
				headers: {
					Authorization: `Bearer ${globalUser.token}`,
				},
			});
			return response.data.data; // return the data to the caller
		} catch (error) {
			console.error("Error fetching data:", error);
			return null; // return null in case of an error
		}
	};

	const getOrderById = async (id: number) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		try {
			const response = await axios.get(
				baseURL + "/api/v1/order/getById/" + id,
				{
					headers: {
						Authorization: `Bearer ${globalUser.token}`,
					},
				}
			);
			return response.data.data; // return the data to the caller
		} catch (error) {
			toast.error("Error obtaining order!");
		}
	};

	const updateStatus = async (orderToUpdate: IUpdInterface) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		const config = {
			headers: {
				Authorization: `Bearer ${globalUser.token}`,
			},
		};

		axios
			.put(baseURL + "/api/v1/order/updateStatus", orderToUpdate, config)
			.then((response) => {
				const responseData = response.data.data;
				if (responseData) {
					toast.success("Status updated!");
				}
			})
			.catch((error) => {
				toast.error("Error updating status!");
				console.error("Error:", error);
				// Handle errors here
			});
	};
	return {
		saveOrderItem,
		getUserOrders,
		response,
		error,
		getAllOrders,
		getOrderById,
		updateStatus,
	};
};
