import { atom } from "recoil";
import { IProductSpring } from "../models/IProduct";

export const manageProductState = atom<IProductSpring[]>({
	key: "manageProductState",
	default: [],
});
