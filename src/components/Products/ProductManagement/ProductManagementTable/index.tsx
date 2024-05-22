import React from "react";
import "./ProductManagementTable.scss";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { DeleteIcon } from "../../../../assets/deleteIcon";
import { IProductSpring } from "../../../../models/IProduct";

const ProductItem: React.FC<{ product: IProductSpring }> = ({ product }) => {
	return (
		<Card radius="none">
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
						{product.active ? (
							<Chip color="success">Active</Chip>
						) : (
							<Chip color="danger">Inactive</Chip>
						)}
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
};

const ProductManagementTable: React.FC<{ productList: IProductSpring[] }> = ({
	productList,
}) => {
	// console.log(productList.length);
	return (
		<div className="product-manage-table">
			{undefined === productList ? (
				<Card radius="none">
					<CardBody>
						<h2>No products yet</h2>
					</CardBody>
				</Card>
			) : (
				<>
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
									<p>Status</p>
									<p>Actions</p>
								</div>
							</div>
						</CardBody>
					</Card>

					{null !== productList &&
						productList.map((product: IProductSpring, i: number) => (
							<ProductItem key={i + "item"} product={product} />
						))}
				</>
			)}
		</div>
	);
};

export default ProductManagementTable;
