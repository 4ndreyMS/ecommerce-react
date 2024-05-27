export interface IOrderInfo {
	id: number;
	orderStatus: string;
	addres1: string;
	addres2: string;
	city: string;
	state: string;
	zipCode: string;
	cardNumber: string;
	cardType: string;
	expiryDate: string;
	totalAmount: number;
	totalWithoutTax: number;
	taxAmount: number;
}
