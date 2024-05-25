import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductManagementTable from "./ProductManagementTable";
import useGetApi from "../../../service/useGetApi";
import { useRecoilState } from "recoil";
import { loginState } from "../../../states/loginState";
import { manageProductState } from "../../../states/manageProductState";

const ProductManagement = () => {
	const [addEdit, setAddEdit] = useState(false);
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
			{!addEdit && (
				<div className="flex flex-col gap-4">
					<div className="flex gap-4 justify-between">
						<Input
							className="max-w-xs"
							type="text"
							placeholder="Product name"
						/>
						<Button
							onClick={() => {
								setAddEdit(true);
							}}
						>
							Add
						</Button>
					</div>
					<ProductManagementTable />
				</div>
			)}
			{addEdit && (
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-4">
						<Button
							radius="none"
							size="sm"
							onClick={() => {
								setAddEdit(false);
							}}
						>
							{"<-"}
						</Button>
						<p>Add product</p>
					</div>
					<div>
						<ProductForm />
					</div>
				</div>
			)}

			<div></div>
		</div>
	);
};

export default ProductManagement;
