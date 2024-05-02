import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import * as Yup from "yup";
import axios from "axios";
import { useRecoilState } from "recoil";
import { checkOutState } from "../../../states/checkOutState";

// Yup for form validations
const AddressSchema = Yup.object().shape({
	// country: Yup.string().required("Province is required"),
	address1: Yup.string().required("Address 1 is required"),
	address2: Yup.string(),
	city: Yup.string().required("City is required"),
	province: Yup.string().required("Province is required"),
	zipCode: Yup.string()
		.required("Zip Code is required")
		.test("isValidZipCode", "Invalid Zip Code", (zipCode) => {
			return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
		}),
});

const options = {
	method: "GET",
	url: "https://us-states.p.rapidapi.com/basic",
	headers: {
		"X-RapidAPI-Key": "580d9de661mshd63804fbf968368p189c2bjsna11325c4fdbb",
		"X-RapidAPI-Host": "us-states.p.rapidapi.com",
	},
};

interface IProvince {
	name: string;
}

const AddressForm = () => {
	const [checkOutdata, setCheckOutData] = useRecoilState(checkOutState);
	const [provinceList, setProvinceList] = useState([]);

	const formik = useFormik({
		initialValues: {
			address1: "",
			address2: "",
			city: "",
			province: "",
			zipCode: "",
			// country: "",
		},
		validationSchema: AddressSchema,
		onSubmit: (values) => {
			setCheckOutData(values);
			// Handle form submission
			console.log(values);
			alert(values);
		},
	});

	const runFunction = async () => {
		if (provinceList.length === 0) {
			try {
				const response = axios.request(options);
				setProvinceList((await response).data);
				// console.log((await response).data);
			} catch (error) {
				console.error(error);
			}
		}
	};

	function isValidZipCode(zipCode) {
		const data = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
		return data;
	}

	useEffect(() => {
		runFunction();
	}, []);

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="flex flex-col gap-4 address-form"
		>
			<Input
				radius="none"
				type="text"
				className="border-brown"
				label="Address 1"
				name="address1"
				value={formik.values.address1}
				onChange={formik.handleChange}
				placeholder="Enter your address"
				fullWidth
				variant="bordered"
				isInvalid={formik.errors.address1 ? true : false}
				errorMessage={formik.errors.address1 && formik.errors.address1}
			/>
			<Input
				type="text"
				radius="none"
				label="Address 2"
				className="border-brown"
				name="address2"
				value={formik.values.address2}
				onChange={formik.handleChange}
				placeholder="Enter your address (optional)"
				fullWidth
				variant="bordered"
			/>
			<Input
				type="text"
				className="border-brown"
				label="City"
				name="city"
				radius="none"
				value={formik.values.city}
				onChange={formik.handleChange}
				placeholder="Enter your city"
				fullWidth
				variant="bordered"
				isInvalid={formik.errors.city ? true : false}
				errorMessage={formik.errors.city && formik.errors.city}
			/>
			<Select
				className="border-brown"
				radius="none"
				label="Province"
				name="province"
				value={formik.values.province}
				onChange={formik.handleChange}
				placeholder="Select your province / state"
				fullWidth
				variant="bordered"
				isInvalid={formik.errors.province ? true : false}
				errorMessage={formik.errors.province && formik.errors.province}
			>
				{/* Replace with your actual options */}
				{provinceList.map((province: IProvince) => {
					return (
						<SelectItem key={province.name} value={province.name}>
							{province.name}
						</SelectItem>
					);
				})}
			</Select>
			<Input
				className="border-brown"
				radius="none"
				type="text"
				label="Zip Code"
				name="zipCode"
				value={formik.values.zipCode}
				onChange={formik.handleChange}
				placeholder="Enter your zip code"
				fullWidth
				variant="bordered"
				isInvalid={formik.errors.zipCode ? true : false}
				errorMessage={formik.errors.zipCode && formik.errors.zipCode}
			/>
			<Button radius="none" className="bg-brown text-white" type="submit">
				Save
			</Button>
		</form>
	);
};

export default AddressForm;
