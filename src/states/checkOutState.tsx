import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

export const checkOutState = atom({
	key: "checkOutState",
	default: { addressForm: {}, cardForm: {} },
	// effects_UNSTABLE: [persistAtom],
});
