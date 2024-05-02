import React, { useState } from "react";
import { useFormik } from "formik";
import { Input, Button } from "@nextui-org/react";
import * as Yup from "yup";

const CardForm = () => {
	const [currentProvider, serCurrentProvider] = useState("");

	// Yup for form validations
	const CardSchema = Yup.object().shape({
		cardNumber: Yup.string()
			.length(16, "Card Number must be 16 digits")
			.required("Card Number is required"),
		cardHolderName: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Card Holder Name is required"),
		expirationDate: Yup.string()
			.required("Expiration Date is required")
			.matches(
				/^(0[1-9]|1[0-2])\/?([0-9]{4})$/,
				"Invalid date format. Must be MM/YYYY"
			)
			.test("expDate", "The card has expired", (value) => {
				if (!value) {
					return false;
				}
				const today = new Date();
				const monthToday = today.getMonth() + 1;
				const yearToday = today.getFullYear();

				const [month, year] = value.split("/");

				if (Number(year) < Number(yearToday)) {
					return false;
				} else if (
					Number(year) === Number(yearToday) &&
					Number(month) < Number(monthToday)
				) {
					return false;
				}

				return true;
			}),

		cvv: Yup.string()
			.test("cvv", "Invalid CVV", (value) => {
				if (!value) {
					return false;
				}

				if (currentProvider === "AMEX" && value.length !== 4) {
					return false;
				} else if (currentProvider !== "AMEX" && value.length !== 3) {
					return false;
				}

				return true;
			})
			.required("CVV is required"),
	});

	function getCardType(number) {
		// Visa
		let re = new RegExp("^4");
		if (number.match(re) != null) return "Visa";

		// Mastercard
		re = new RegExp("^5[1-5]");
		if (number.match(re) != null) return "Mastercard";

		// AMEX
		re = new RegExp("^3[47]");
		if (number.match(re) != null) return "AMEX";

		return "NA";
	}

	const formik = useFormik({
		initialValues: {
			cardNumber: "",
			cardHolderName: "",
			expirationDate: "",
			cvv: "",
		},
		validationSchema: CardSchema,
		onSubmit: (values) => {
			// Handle form submission
			console.log(values);
			alert(JSON.stringify(values, null, 2));
		},
	});
	const handleCardNumberChange = (event) => {
		formik.handleChange(event);
		const cardNumber = event.target.value;
		serCurrentProvider(getCardType(cardNumber));
		console.log(cardNumber);
	};

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="flex flex-col gap-4 card-form"
		>
			<Input
				radius="none"
				type="number"
				label="Card Number"
				name="cardNumber"
				value={formik.values.cardNumber}
				onChange={handleCardNumberChange}
				placeholder="Enter your card number"
				fullWidth
				variant="bordered"
				isInvalid={
					formik.errors.cardNumber || currentProvider === "NA" ? true : false
				}
				errorMessage={
					formik.errors.cardNumber
						? formik.errors.cardNumber
						: currentProvider === "NA" && "Provider not supported"
				}
				endContent={
					<div className="pointer-events-none flex items-center">
						<span className="text-default-400 text-small txt-color-brown">
							{currentProvider !== "NA" && currentProvider}
						</span>
					</div>
				}
			/>
			<Input
				radius="none"
				type="text"
				label="Card Holder Name"
				name="cardHolderName"
				value={formik.values.cardHolderName}
				onChange={formik.handleChange}
				placeholder="Enter your name"
				fullWidth
				variant="bordered"
				isInvalid={formik.errors.cardHolderName ? true : false}
				errorMessage={
					formik.errors.cardHolderName && formik.errors.cardHolderName
				}
			/>
			<Input
				radius="none"
				type="text"
				label="Expiration Date"
				name="expirationDate"
				value={formik.values.expirationDate}
				onChange={formik.handleChange}
				placeholder="MM/YYYY"
				fullWidth
				variant="bordered"
				isInvalid={formik.errors.expirationDate ? true : false}
				errorMessage={
					formik.errors.expirationDate && formik.errors.expirationDate
				}
			/>
			<Input
				radius="none"
				type="text"
				label="CVV"
				name="cvv"
				value={formik.values.cvv}
				onChange={formik.handleChange}
				placeholder="Enter your CVV"
				fullWidth
				variant="bordered"
				isInvalid={formik.errors.cvv ? true : false}
				errorMessage={formik.errors.cvv && formik.errors.cvv}
			/>
			<Button radius="none" className="bg-brown text-white" type="submit">
				Save
			</Button>
		</form>
	);
};

export default CardForm;
