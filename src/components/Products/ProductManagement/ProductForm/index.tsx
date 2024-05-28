/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useRecoilState } from "recoil";
import { loginState } from "../../../../states/loginState";
import axios from "axios";
import { IProductSpring } from "../../../../models/IProduct";
import "./ProductForm.scss";
import { manageProductState } from "../../../../states/manageProductState";
import UploadWidget from "../../../UploadWidget";

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
	const [imageUrl, updateImageUrl] = useState();
	const [errorUploadImage, updateErrorUploadImage] = useState("");
	const [categories, setCategories] = useState<categoryResonse[]>([]);
	const [globalUser] = useRecoilState(loginState);
	const [active, setActive] = useState(false);
	const [featured, setFeatured] = useState(false);

	// const [errorSubmitForm, setErrorSubmitForm] = useState("");
	const [managedProducts, setManagedProducts] =
		useRecoilState<IProductSpring[]>(manageProductState);
	const resetFormData = () => {
		formik.resetForm();
		updateImageUrl("");
		// formik.values.category = "";
		setFeatured(false);
		setActive(false);
		formik.handleChange;
		setShouldReset(true);
	};

	const [shouldReset, setShouldReset] = useState(false);

	const submitFormData = async (newProduct: IProductSpring) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		const config = {
			headers: {
				Authorization: `Bearer ${globalUser.token}`,
			},
		};

		axios
			.post(baseURL + "/api/v1/product/create", newProduct, config)
			.then((response) => {
				console.log("Response:", response.data);
				const responseDate = response.data.data;
				setManagedProducts([...managedProducts, responseDate]);
				console.log("managedProducts", managedProducts);
			})
			.catch((error) => {
				console.error("Error:", error);
				// Handle errors here
			});
	};

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
			const newProducts: IProductSpring = {
				id: 0,
				name: values.title,
				description: values.description,
				category: values.category,
				featuredStatus: featured,
				stockQuantity: values.stock_amount,
				price: values.price,
				image: imageUrl,
				summary: values.abstract,
				activeStatus: active,
				deletedStatus: false,
			};
			// Handle form submission here
			console.log("newProducts", newProducts);
			if (imageUrl != "") {
				submitFormData(newProducts);
				resetFormData();
			}
		},
	});
	/**
	 * handleOnUpload
	 */
	function handleOnUpload(error, result, widget) {
		if (error) {
			updateErrorUploadImage(error);
			widget.close({
				quiet: true,
			});
			return;
		}
		updateImageUrl(result?.info?.secure_url);
		updateErrorUploadImage("");
	}

	const checkImage = () => {
		console.log("enter to validate");
		if (imageUrl == "") {
			updateErrorUploadImage("Image is required");
		} else {
			updateErrorUploadImage("");
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
					<CardBody className="gap-4">
						<p>Upload you product image</p>

						<UploadWidget onUpload={handleOnUpload} />

						{errorUploadImage != "" && (
							<p className="text-tiny text-danger">{errorUploadImage}</p>
						)}

						{imageUrl && (
							<>
								<div className="flex items-center upload-img">
									<img
										className="max-w-s"
										src={imageUrl}
										alt="Uploaded resource"
									/>
								</div>
							</>
						)}
					</CardBody>
				</Card>
				<Card className="w-full">
					<CardBody className="gap-4">
						<div className="flex gap-4">
							<Checkbox
								name="isActive"
								isSelected={active}
								onValueChange={setActive}
							>
								Active product
							</Checkbox>
							<Checkbox
								name="isFeatured"
								isSelected={featured}
								onValueChange={setFeatured}
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
						checkImage();
						formik.handleSubmit();
					}}
					radius="none"
					isDisabled={
						formik.errors.title ||
						formik.errors.description ||
						formik.errors.price ||
						formik.errors.stock_amount ||
						imageUrl == ""
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
