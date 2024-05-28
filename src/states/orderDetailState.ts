import { atom } from "recoil";
import { tableData } from "../components/OrderTable";

export const orderDetailState = atom<tableData | null>({
	key: "orderDetailState",
	default: {
		id: 0,
		orderNum: 0,
		total: "",
		items: 0,
		status: "",
		action: "",
		purchaseDate: "",
	},
});
