import { atom } from "recoil";

export const filteredProductsState = atom({
	key: "filteredProductState",
	default: [],
});

export const unMutableProductsState = atom({
	key: "unMutableProductsState",
	default: [],
});
