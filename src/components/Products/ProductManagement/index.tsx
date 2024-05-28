import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductManagementTable from "./ProductManagementTable";
import useGetApi from "../../../service/useGetApi";
import { useRecoilState } from "recoil";
import { loginState } from "../../../states/loginState";
import { manageProductState } from "../../../states/manageProductState";
import { addEdit } from "../../../states/addEditState";
import ProductEditForm from "./ProdcutEditForm";
import { productToUpdate } from "../../../states/productToUpdate";

const ProductManagement = () => {
	const [addEditVal, setAddEdit] = useRecoilState(addEdit);

	const [globalUser] = useRecoilState(loginState);
	const [, setManagedProducts] = useRecoilState(manageProductState);
	const apiUrl = import.meta.env.VITE_BASE_API_URL + "/api/v1/product/getAll";
	const { responseData, loading, error } = useGetApi(apiUrl, globalUser.token);
	useEffect(() => {
		if (responseData != null) {
			// Check if data is available
			setManagedProducts(responseData.data);
		}
	}, [responseData]);

	return (
		<div className="">
			{addEditVal === 0 && (
				<div className="flex flex-col gap-4">
					<div className="flex gap-4 justify-between">
						{/* <Input
							className="max-w-xs"
							type="text"
							placeholder="Product name"
						/> */}
						<Button
							radius="none"
							className="font-medium bg-brown text-white"
							onClick={() => {
								setAddEdit(1);
							}}
						>
							Add
						</Button>
					</div>
					<ProductManagementTable />
				</div>
			)}
			{addEditVal === 1 && (
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-4">
						<Button
							radius="none"
							className="bg-brown text-white"
							size="sm"
							onClick={() => {
								setAddEdit(0);
							}}
						>
							Back
						</Button>
						<p>Add product</p>
					</div>
					<div>
						<ProductForm />
					</div>
				</div>
			)}

			{addEditVal === 3 && (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-4 w-full">
						<div>
							<Button
								radius="none"
								className="bg-brown text-white"
								size="sm"
								onClick={() => {
									setAddEdit(0);
								}}
							>
								Back
							</Button>
						</div>

						<ProductEditForm />
					</div>
					{/* <div>
						<ProductForm />
					</div> */}
				</div>
			)}

			<div></div>
		</div>
	);
};

export default ProductManagement;
