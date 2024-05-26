import { atom } from "recoil";
import { IProductSpring } from "../models/IProduct";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

export interface IcartItem {
	quantity: number;
	product: IProductSpring;
}

export const cartProductsState = atom<IcartItem[]>({
	key: "cartProductsState",
	default: [],
	// effects_UNSTABLE: [persistAtom],
});
