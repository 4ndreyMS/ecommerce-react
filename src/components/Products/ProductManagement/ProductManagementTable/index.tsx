import React from "react";
import "./ProductManagementTable.scss";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { DeleteIcon } from "../../../../assets/deleteIcon";
import { IProductSpring } from "../../../../models/IProduct";
import { useRecoilState } from "recoil";
import { manageProductState } from "../../../../states/manageProductState";

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
						{product.activeStatus ? (
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

const ProductManagementTable = () => {
	const [managedProducts] = useRecoilState(manageProductState);

	console.log(manageProductState);
	return (
		<div className="product-manage-table">
			{undefined === managedProducts ||
			null === managedProducts ||
			managedProducts?.length < 1 ? (
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

					{undefined !== managedProducts &&
						null !== managedProducts &&
						managedProducts.map(
							(product: IProductSpring, i: number) =>
								!product.deletedStatus && (
									<ProductItem key={i + "item"} product={product} />
								)
						)}
				</>
			)}
		</div>
	);
};

export default ProductManagementTable;
