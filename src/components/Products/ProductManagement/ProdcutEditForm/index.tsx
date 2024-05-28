import {
	Button,
	Card,
	CardBody,
	Checkbox,
	Input,
	Select,
} from "@nextui-org/react";
import React, { useState } from "react";
import UploadWidget from "../../../UploadWidget";
import { IProductSpring } from "../../../../models/IProduct";
import { productToUpdate } from "../../../../states/productToUpdate";
import { useRecoilState } from "recoil";
import { loginState } from "../../../../states/loginState";
import axios from "axios";
import { manageProductState } from "../../../../states/manageProductState";
import toast from "react-hot-toast";

const ProductEditForm = () => {
	const [updProd, setUpdProd] = useRecoilState(productToUpdate);
	const [title, setTitle] = useState(updProd?.name);
	const [description, setDescription] = useState(updProd?.description);
	const [abstract, setAbstract] = useState(updProd?.summary);
	const [active, setActive] = useState(updProd?.activeStatus);
	const [featured, setFeatured] = useState(updProd?.featuredStatus);
	const [price, setPrice] = useState(updProd?.price);
	const [globalUser] = useRecoilState(loginState);
	const [managedProducts, setManagedProducts] =
		useRecoilState<IProductSpring[]>(manageProductState);

	const submitFormData = async (newProduct: IProductSpring) => {};
	const manageSubmit = () => {
		const updatedProduct: IProductSpring = {
			id: updProd?.id,
			activeStatus: active,
			description: description,
			featuredStatus: featured,
			deletedStatus: updProd?.deletedStatus,
			name: title,
			price: price,
			summary: abstract,
			image: updProd?.image,
			category: updProd?.category,
			stockQuantity: updProd?.stockQuantity,
		};

		console.log(updatedProduct);
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		const config = {
			headers: {
				Authorization: `Bearer ${globalUser.token}`,
			},
		};

		axios
			.post(baseURL + "/api/v1/product/update", updatedProduct, config)
			.then((response) => {
				console.log("Response:", response.data);
				const responseDate = response.data.data;
				if (response.data.data) {
					toast.success("Product info updated!", {
						position: "bottom-center",
					});
				} else {
					toast.error("Faild product update!", {
						position: "bottom-center",
					});
				}
				// setManagedProducts([...managedProducts, responseDate]);
			})
			.catch((error) => {
				toast.error("Faild product update!", {
					position: "bottom-center",
				});
			});
		// submitFormData(updatedProduct);
	};
	console.log(updProd);
	console.log(price);
	return (
		<div>
			<form
				className="product__form flex flex-col gap-4 items-center w-full"
				// onSubmit={formik.handleSubmit}
			>
				<Card className="w-full">
					<CardBody className="gap-4">
						<Input
							labelPlacement="inside"
							radius="none"
							label="Title"
							name="title"
							value={title}
							onChange={(values) => {
								setTitle(values.target.value);
							}}
							placeholder="Enter product title"
							fullWidth
							variant="bordered"
							isInvalid={title === "" ? true : false}
							errorMessage={title === "" && "Requeired field"}
						/>
						<Input
							labelPlacement="inside"
							radius="none"
							label="Description"
							name="description"
							value={description}
							onChange={(values) => {
								setDescription(values.target.value);
							}}
							placeholder="Enter product description"
							fullWidth
							variant="bordered"
							isInvalid={description === "" ? true : false}
							errorMessage={description === "" && "Requeired field"}
						/>
						<Input
							labelPlacement="inside"
							radius="none"
							label="Abstract"
							name="abstract"
							value={abstract}
							onChange={(values) => {
								setAbstract(values.target.value);
							}}
							placeholder="Enter product abstract"
							fullWidth
							variant="bordered"
							isInvalid={abstract === "" ? true : false}
							errorMessage={abstract === "" && "Requeired field"}
						/>

						{/* <Select
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
						</Select> */}
					</CardBody>
				</Card>

				{/* <Card className="w-full">
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
				</Card> */}
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
							value={price}
							onChange={(values) => {
								setPrice(values.target.value);
							}}
							placeholder="Enter product price"
							fullWidth
							variant="bordered"
							isInvalid={price === "" ? true : false}
							errorMessage={price === "" && "Requeired field"}
						/>
					</CardBody>
				</Card>

				{/* Add image upload field here */}
				<Button
					onClick={() => {
						// checkImage();
						manageSubmit();
					}}
					radius="none"
					className="product__form-btn btn-filled-transparent"
					isDisabled={!title || !description || !price ? true : false}
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export default ProductEditForm;
