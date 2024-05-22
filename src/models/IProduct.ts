export interface IProduct {
	id: string;
	image: string;
	name: string;
	abstract: string;
	description: string;
	price: string;
	isFeatured: boolean;
	isActive: boolean;
	category: string;
	itemAmount: number;
	summary: string;
	stockQuantity: number;
}

export interface IProductSpring {
	id: number;
	image: string;
	name: string;
	description: string;
	price: number;
	isFeatured: boolean;
	isActive: boolean;
	category: string;
	summary: string;
	stockQuantity: number;
}
