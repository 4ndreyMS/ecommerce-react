import { useRecoilState } from "recoil";
import axios from "axios";
import { useCallback } from "react";
import { IcartItem, cartProductsState } from "../../states/cartState";
import { loginState } from "../../states/loginState";
import { IProductSpring } from "../../models/IProduct";
import { useNavigate } from "react-router-dom";
import { isEmptyObject } from "../../utils/objectValidations";
import toast from "react-hot-toast";

export const useCartManage = () => {
	const [cartItems, setCartItems] = useRecoilState(cartProductsState);
	const [globalUser] = useRecoilState(loginState);
	const navigate = useNavigate();

	const saveCartItem = async (
		insertItem: IcartItem,
		successMessage: string
	) => {
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
				toast.success(successMessage ? successMessage : "Cart updated!", {
					position: "bottom-center",
				});
			})
			.catch((error: Error) => {
				toast.error("Error updating the cart!");
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
					toast.success("Item removed from cart!");
					setCartItems(updatedList);
				}
			})
			.catch((error) => {
				toast.error("Error removing from cart!");
				console.error("Error fetching data:", error.message);
			});
	};

	const handleButtonAdd = (
		productInfo: IProductSpring,
		successMessage: string
	) => {
		if (isEmptyObject(globalUser)) {
			console.log("change");
			navigate("/signin", { replace: false });
		} else {
			const existingItem = cartItems?.find(
				(item) => item.product.id === productInfo.id
			);
			const quantity = existingItem ? existingItem.quantity + 1 : 1;

			const insertItem: IcartItem = {
				product: productInfo,
				quantity: quantity,
			};

			saveCartItem(insertItem, successMessage);
		}
	};

	const getProductsCart = async () => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		await axios
			.get(baseURL + "/api/v1/cart/getCartItems", {
				headers: {
					Authorization: `Bearer ${globalUser.token}`,
				},
			})
			.then((response) => {
				setCartItems(response.data.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error.message);
			});
	};

	return { saveCartItem, deleteCartItem, handleButtonAdd, getProductsCart };
};
