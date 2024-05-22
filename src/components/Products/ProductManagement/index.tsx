import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProducsTable from "../ProductsTable";
import ProductManagementTable from "./ProductManagementTable";

const ProductManagement = () => {
	const [addEdit, setAddEdit] = useState(false);
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
				<div>
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
