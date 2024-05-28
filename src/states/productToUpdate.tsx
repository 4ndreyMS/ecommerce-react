import { atom } from "recoil";
import { IProductSpring } from "../models/IProduct";

export const productToUpdate = atom<IProductSpring | null>({
	key: "productToUpdate",
	default: null,
});
