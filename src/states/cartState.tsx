import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cartProductsState = atom({
	key: "cartProducts",
	default: { count: 0, items: [] },
	effects_UNSTABLE: [persistAtom],
});
