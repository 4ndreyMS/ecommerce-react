import { useRecoilState } from "recoil";
import axios from "axios";
import { useCallback } from "react";
import { IcartItem, cartProductsState } from "../../states/cartState";
import { loginState } from "../../states/loginState";
import { IProductSpring } from "../../models/IProduct";

export const useCartManage = () => {
	const [cartItems, setCartItems] = useRecoilState(cartProductsState);
	const [globalUser] = useRecoilState(loginState);

	const saveCartItem = async (insertItem: IcartItem) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		const config = {
			headers: {
				Authorization: `Bearer ${globalUser.token}`,
			},
		};
		await axios
			.post(baseURL + "/api/v1/cart/create", insertItem, config)
			.then((response) => {
				const responseData = response.data.data;
				const responseProductItem: IcartItem = {
					quantity: responseData.quantity,
					product: responseData.product,
				};

				let productExists = false;

				const updatedCartItems = cartItems.map((item) => {
					if (item.product.id === responseProductItem.product.id) {
						productExists = true;
						return { ...item, quantity: responseProductItem.quantity };
					}
					return item;
				});

				if (productExists) {
					setCartItems(updatedCartItems);
				} else {
					setCartItems([...cartItems, responseProductItem]);
				}
			})
			.catch((error: Error) => {
				throw error.message;
			});
	};

	const deleteCartItem = async (itemToDelete: IProductSpring) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;

		await axios
			.delete(baseURL + "/api/v1/cart/deleteCartItem/" + itemToDelete.id, {
				headers: {
					Authorization: `Bearer ${globalUser.token}`,
				},
			})
			.then((response) => {
				if (response.data.data) {
					const updatedList = cartItems.filter(
						(item: IcartItem) => item.product !== itemToDelete
					);
					setCartItems(updatedList);
				}
			})
			.catch((error) => {
				console.error("Error fetching data:", error.message);
			});
	};

	return { saveCartItem, deleteCartItem };
};