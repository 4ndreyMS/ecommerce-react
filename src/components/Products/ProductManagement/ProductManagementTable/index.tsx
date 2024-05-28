import React from "react";
import "./ProductManagementTable.scss";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { DeleteIcon } from "../../../../assets/deleteIcon";
import { IProductSpring } from "../../../../models/IProduct";
import { useRecoilState } from "recoil";
import { manageProductState } from "../../../../states/manageProductState";
import { EditIcon } from "../../../../assets/editIcon";
import axios from "axios";
import { loginState } from "../../../../states/loginState";
import toast from "react-hot-toast";
import { addEdit } from "../../../../states/addEditState";
import { productToUpdate } from "../../../../states/productToUpdate";

const ProductItem: React.FC<{ product: IProductSpring }> = ({ product }) => {
	const [managedProducts, setManagedProducts] =
		useRecoilState(manageProductState);
	const [addEditVal, setAddEdit] = useRecoilState(addEdit);
	const [, setProdToUpdate] = useRecoilState(productToUpdate);

	const [globalUser] = useRecoilState(loginState);

	const handleDelete = async (newProduct: IProductSpring) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		const config = {
			headers: {
				Authorization: `Bearer ${globalUser.token}`,
			},
		};

		axios
			.delete(baseURL + "/api/v1/product/softDelete/" + newProduct.id, config)
			.then((response) => {
				if (response.data.data) {
					toast.success("Product deleted!", {
						position: "bottom-center",
					});
					setManagedProducts((prevProducts) =>
						prevProducts.filter((product) => product.id !== newProduct.id)
					);
				} else {
					toast.error("Error deleting the product!", {
						position: "bottom-center",
					});
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				// Handle errors here
				toast.error("Error deleting the product!", {
					position: "bottom-center",
				});
			});
	};
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
						<div className="flex gap-4">
							<button
								className="delete-btn"
								aria-label="Delete"
								onClick={() => {
									handleDelete(product);
								}}
							>
								<DeleteIcon />
							</button>

							<button
								className="delete-btn"
								aria-label="Delete"
								onClick={() => {
									setAddEdit(3);
									setProdToUpdate(product);
								}}
							>
								<EditIcon className="text-lg text-default-400 cursor-pointer active:opacity-50" />
							</button>
						</div>
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
						managedProducts.map((product: IProductSpring, i: number) => (
							<ProductItem key={i + "item"} product={product} />
						))}
				</>
			)}
		</div>
	);
};

export default ProductManagementTable;
