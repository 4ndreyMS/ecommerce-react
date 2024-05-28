import { IProductSpring } from "./IProduct";

export interface IOrder {
	address1: string;
	address2: string;
	cardNumber: string;
	cardType: string;
	city: string;
	expiryDate: string;
	id: number;
	orderStatus: string;
	orderedItems: OrderedItem[];
	state: string;
	taxAmount: number;
	totalAmount: number;
	totalWithoutTax: number;
	zipCode: string;
}

export interface OrderedItem {
	product: IProductSpring;
	quantity: number;
	price: number;
}
