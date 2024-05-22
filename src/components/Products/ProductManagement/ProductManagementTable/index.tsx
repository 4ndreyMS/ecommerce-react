import React from "react";
import "./ProductManagementTable.scss";
import { Card, CardBody } from "@nextui-org/react";
import { DeleteIcon } from "../../../../assets/deleteIcon";
import { IProductSpring } from "../../../../models/IProduct";
const ProductManagementTable = () => {
	const items: IProductSpring[] = [
		{
			id: 1,
			name: "update teee",
			description: "ddd",
			summary: "ddd",
			price: 2.0,
			stockQuantity: 1,
			image:
				"https://res.cloudinary.com/dhky0tai1/image/upload/v1716326335/z6jgtodywwcosig9gt5t.jpg",
			isFeatured: true,
			isActive: true,
			category: "LIVING_ROOM",
		},
	];

	return (
		<div className="product-manage-table">
			<Card radius="none">
				<CardBody>
					<div className="product-manage-table__product-item flex gap-5">
						<div className="product-manage-table__img-cont">
							<div className="product-manage-table__spacer"></div>
							<div>
								<h3>Product</h3>
							</div>
						</div>

						<div className="product-manage-table__info-cont items-center">
							<p className="hidable">Price</p>
							<p>Stock</p>
							<p>Actions</p>
						</div>
					</div>
				</CardBody>
			</Card>
			{items.map((product: IProductSpring, i: number) => {
				return (
					<Card radius="none" key={i + "item"}>
						<CardBody>
							<div className="product-manage-table__product-item flex gap-5">
								<div className="product-manage-table__img-cont">
									<img
										className="cart-item__image hidable"
										src={product.image}
										alt={product.name}
									/>
									<div>
										<h3>{product.name}</h3>
									</div>
								</div>

								<div className="product-manage-table__info-cont items-center">
									<p className="hidable">${product.price}</p>
									<p>{product.stockQuantity}</p>
									<button
										className="delete-btn"
										aria-label="Delete"
										onClick={() => {
											// handleDelete(product);
										}}
									>
										<DeleteIcon />
									</button>
								</div>
							</div>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
};

export default ProductManagementTable;
