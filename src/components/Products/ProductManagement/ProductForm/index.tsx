import {
	Button,
	Input,
	Select,
	Checkbox,
	Card,
	CardBody,
	SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadWidget from "../../../UploadWidget";
import { useRecoilState } from "recoil";
import { loginState } from "../../../../states/loginState";
import axios from "axios";
import { IProduct } from "../../../../models/IProduct";

const ProductSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
	abstract: Yup.string().required("Abstract is required"),
	price: Yup.number().required("Price is required"),
	stock_amount: Yup.number().required("Stock amount is required"),
	category: Yup.string().required("Category is required"),
});

interface categoryResonse {
	categoryName: string;
	categoryEnum: string;
}

const ProductForm = () => {
	const [url, updateUrl] = useState("");
	const [error, updateError] = useState("");
	const [categories, setCategories] = useState<categoryResonse[]>([]);
	const [globalUser] = useRecoilState(loginState);

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			price: 0,
			stock_amount: 0,
			category: "",
			isFeatured: false,
			isActive: true,
			abstract: "",
		},
		validationSchema: ProductSchema,
		onSubmit: (values) => {
			const newProducts: IProduct = {
				id: "",
				name: values.title,
				description: values.description,
				category: values.category,
				isFeatured: values.isFeatured,
				itemAmount: values.stock_amount,
				price: values.price.toString(),
				image: url,
				abstract: values.abstract,
				isActive: values.isActive,
			};
			// Handle form submission here
			console.log(newProducts);
		},
	});
	/**
	 * handleOnUpload
	 */
	function handleOnUpload(error, result, widget) {
		if (error) {
			updateError(error);
			widget.close({
				quiet: true,
			});
			return;
		}
		updateUrl(result?.info?.secure_url);
		updateError("");
	}

	const checkImage = () => {
		console.log("enter to validate");
		if (url == "") {
			updateError("Image is required");
		} else {
			updateError("");
		}
	};

	const requestCategories = async () => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		await axios
			.get(baseURL + "/api/v1/category/getAll", {
				headers: {
					Authorization: `Bearer ${globalUser.token}`,
				},
			})
			.then((response) => {
				setCategories(response.data.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error.message);
			});
	};

	useEffect(() => {
		requestCategories();
	}, []);
	// Create a new image object:

	return (
		<div className="flex items-center flex-col gap-4">
			<form
				className="product__form flex flex-col gap-4 items-center w-full"
				onSubmit={formik.handleSubmit}
			>
				<Card className="w-full">
					<CardBody className="gap-4">
						<Input
							labelPlacement="inside"
							radius="none"
							label="Title"
							name="title"
							value={formik.values.title}
							onChange={formik.handleChange}
							placeholder="Enter product title"
							fullWidth
							variant="bordered"
							isInvalid={formik.errors.title ? true : false}
							errorMessage={formik.errors.title && formik.errors.title}
						/>
						<Input
							labelPlacement="inside"
							radius="none"
							label="Description"
							name="description"
							value={formik.values.description}
							onChange={formik.handleChange}
							placeholder="Enter product description"
							fullWidth
							variant="bordered"
							isInvalid={formik.errors.description ? true : false}
							errorMessage={
								formik.errors.description && formik.errors.description
							}
						/>
						<Input
							labelPlacement="inside"
							radius="none"
							label="Abstract"
							name="abstract"
							value={formik.values.abstract}
							onChange={formik.handleChange}
							placeholder="Enter product abstract"
							fullWidth
							variant="bordered"
							isInvalid={formik.errors.abstract ? true : false}
							errorMessage={formik.errors.abstract && formik.errors.abstract}
						/>

						<Select
							label="Category"
							name="category"
							value={formik.values.category}
							onChange={formik.handleChange}
							fullWidth
							variant="bordered"
							radius="none"
							isInvalid={formik.errors.category ? true : false}
							errorMessage={formik.errors.category && formik.errors.category}
						>
							{categories?.map((cat: categoryResonse) => (
								<SelectItem key={cat.categoryEnum} value={cat.categoryEnum}>
									{cat.categoryName}
								</SelectItem>
							))}
						</Select>
					</CardBody>
				</Card>

				<Card className="w-full">
					<CardBody className="gap-1">
						<p>Upload you product image</p>

						<UploadWidget onUpload={handleOnUpload} />

						{error != "" && <p className="text-tiny text-danger">{error}</p>}

						{url && (
							<>
								<div>
									<img src={url} alt="Uploaded resource" />
								</div>
								<p>{url}</p>
							</>
						)}
					</CardBody>
				</Card>
				<Card className="w-full">
					<CardBody className="gap-4">
						<div className="flex gap-4">
							<Checkbox
								name="isFeatured"
								checked={formik.values.isActive}
								onChange={formik.handleChange}
								defaultSelected
							>
								Active product
							</Checkbox>
							<Checkbox
								name="isFeatured"
								checked={formik.values.isFeatured}
								onChange={formik.handleChange}
							>
								Featured product
							</Checkbox>
						</div>
						<Input
							labelPlacement="inside"
							radius="none"
							label="Price"
							name="price"
							type="number"
							value={formik.values.price}
							onChange={formik.handleChange}
							placeholder="Enter product price"
							fullWidth
							variant="bordered"
							isInvalid={formik.errors.price ? true : false}
							errorMessage={formik.errors.price && formik.errors.price}
						/>
						<Input
							labelPlacement="inside"
							radius="none"
							label="Stock Amount"
							name="stock_amount"
							type="number"
							value={formik.values.stock_amount}
							onChange={formik.handleChange}
							placeholder="Enter stock amount"
							fullWidth
							variant="bordered"
							isInvalid={formik.errors.stock_amount ? true : false}
							errorMessage={
								formik.errors.stock_amount && formik.errors.stock_amount
							}
						/>
					</CardBody>
				</Card>

				{/* Add image upload field here */}
				<Button
					onClick={() => {
						formik.handleSubmit();
						checkImage();
					}}
					type="submit"
					radius="none"
					isDisabled={
						formik.errors.title ||
						formik.errors.description ||
						formik.errors.price ||
						formik.errors.stock_amount ||
						url == ""
							? true
							: false
					}
					className="product__form-btn btn-filled-transparent"
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export default ProductForm;
