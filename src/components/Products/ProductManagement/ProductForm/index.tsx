import { Button, Input, Select, Checkbox } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProductSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
	price: Yup.number().required("Price is required"),
	stock_amount: Yup.number().required("Stock amount is required"),
});

const ProductForm = () => {
	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			price: 0,
			stock_amount: 0,
			category: "",
			isFeatured: false,
			image: null,
		},
		validationSchema: ProductSchema,
		onSubmit: (values) => {
			// Handle form submission here
			console.log(values);
		},
	});

	return (
		<div className="flex items-center flex-col gap-4">
			{/* <p
				className={`text-center w-full max-w-[20rem] ${
					error !== "" ? "text-danger" : "hidden"
				}`}
			>
				{error && error}
			</p> */}

			<form
				className="product__form flex flex-col gap-4 items-center"
				onSubmit={formik.handleSubmit}
			>
				<Input
					radius="sm"
					label="Title"
					name="title"
					value={formik.values.title}
					onChange={formik.handleChange}
					placeholder="Enter product title"
					fullWidth
					variant="bordered"
					className="max-w-xs"
					isInvalid={formik.errors.title ? true : false}
					errorMessage={formik.errors.title && formik.errors.title}
				/>
				<Input
					radius="sm"
					label="Description"
					name="description"
					value={formik.values.description}
					onChange={formik.handleChange}
					placeholder="Enter product description"
					fullWidth
					variant="bordered"
					className="max-w-xs"
					isInvalid={formik.errors.description ? true : false}
					errorMessage={formik.errors.description && formik.errors.description}
				/>
				<Input
					radius="sm"
					label="Price"
					name="price"
					type="number"
					value={formik.values.price}
					onChange={formik.handleChange}
					placeholder="Enter product price"
					fullWidth
					variant="bordered"
					className="max-w-xs"
					isInvalid={formik.errors.price ? true : false}
					errorMessage={formik.errors.price && formik.errors.price}
				/>
				<Input
					radius="sm"
					label="Stock Amount"
					name="stock_amount"
					type="number"
					value={formik.values.stock_amount}
					onChange={formik.handleChange}
					placeholder="Enter stock amount"
					fullWidth
					variant="bordered"
					className="max-w-xs"
					isInvalid={formik.errors.stock_amount ? true : false}
					errorMessage={
						formik.errors.stock_amount && formik.errors.stock_amount
					}
				/>
				<Select
					label="Category"
					name="category"
					value={formik.values.category}
					onChange={formik.handleChange}
					options={[
						{ label: "Electronics", value: "electronics" },
						{ label: "Clothing", value: "clothing" },
						// Add more categories as needed
					]}
					fullWidth
					variant="bordered"
					className="max-w-xs"
				/>
				<Checkbox
					label="Featured"
					name="isFeatured"
					checked={formik.values.isFeatured}
					onChange={formik.handleChange}
				/>
				{/* Add image upload field here */}
				<Input type="file"></Input>
				<Button
					type="submit"
					radius="none"
					isDisabled={
						formik.errors.title ||
						formik.errors.description ||
						formik.errors.price ||
						formik.errors.stock_amount
					}
					className="product__form-btn btn-filled-transparent"
				>
					Create Product
				</Button>
			</form>
		</div>
	);
};

export default ProductForm;
