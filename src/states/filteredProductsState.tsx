import { atom } from "recoil";
import { IProductSpring } from "../models/IProduct";

export const filteredProductsState = atom({
	key: "filteredProductState",
	default: [],
});

export const unMutableProductsState = atom<IProductSpring[]>({
	key: "unMutableProductsState",
	default: [],
});
