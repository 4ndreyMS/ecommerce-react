import { atom } from "recoil";

export const addEdit = atom({
	key: "addEdit",
	default: 0,
	// effects_UNSTABLE: [persistAtom],
});
