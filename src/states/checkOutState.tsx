import { string } from "prop-types";
import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

export interface IAddressForm {
	address1: string;
	address2: string;
	city: string;
	state: string;
	zipCode: string;
}

export interface ICardForm {
	cardNumber: string;
	cardType: string;
	expiryDate: string;
}

interface IOrderForm {
	addressForm: {
		address1: string;
		address2: string;
		city: string;
		state: string;
		zipCode: string;
	};
	cardForm: {
		cardNumber: string;
		cardType: string;
		expiryDate: string;
	};
}

export const checkOutState = atom<IOrderForm>({
	key: "checkOutState",
	default: {
		addressForm: {
			address1: "",
			address2: "",
			city: "",
			state: "",
			zipCode: "",
		},
		cardForm: {
			cardNumber: "",
			cardType: "",
			expiryDate: "",
		},
	},
});
