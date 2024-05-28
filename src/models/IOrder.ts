import { IProductSpring } from "./IProduct";
import { IUserCredentials } from "./IUserCredentials";

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
	creationDate: string;
	zipCode: string;
	totalItemsAmount: number;
}

export interface OrderedItem {
	product: IProductSpring;
	quantity: number;
	price: number;
}

export interface ISingleOrder {
	addres1: string;
	addres2: string;
	cardNumber: string;
	cardType: string;
	city: string;
	expiryDate: string;
	id: number;
	orderStatus: string;
	orderedItems: OrderedItemSingle[];
	state: string;
	taxAmount: number;
	totalAmount: number;
	totalWithoutTax: number;
	creationDate: string;
	zipCode: string;
	totalItemsAmount: number;
}

export interface OrderedItemSingle {
	product: IProductSpring;
	quantity: number;
	price: number;
	user: IUserCredentials;
}
