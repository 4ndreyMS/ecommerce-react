import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUserCredentials } from "../../../models/IUserCredentials";
import "./SignUpForm.scss";

const SignupSchema = Yup.object().shape({
	fullName: Yup.string().required("Full name is required"),
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters long")
		.matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
		.matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
		.matches(/^(?=.*[0-9])/, "Must contain at least one number")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm password is required"),
});

const SignupForm = () => {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const baseURL = import.meta.env.VITE_BASE_API_URL;

	const signup = async (user: IUserCredentials) => {
		axios
			.post(baseURL + "/auth/signup", user) // Cambia la URL a tu endpoint de autenticación
			.then((response) => {
				const responseStatus = response.data.success;
				if (responseStatus != undefined && responseStatus) {
					navigate("/signin", { replace: false });
				} else {
					setError(
						"Invalid username or password. Please check your credentials and try again."
					);
				}
			})
			.catch((error) => {
				let errorMessage = "";

				if (
					error.response &&
					error.response.data &&
					error.response.data.errors
				) {
					// If there are specific error messages in the response
					errorMessage = error.response.data.errors
						.map((err: { message: string }) => err.message)
						.join("\n"); // Join error messages with line breaks
				} else {
					// If no specific error messages, use the general error message
					errorMessage = error.message;
				}

				setError(errorMessage);
			});
	};

	const formik = useFormik({
		initialValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			// Get user credentials
			const formUser: IUserCredentials = {
				email: values.email,
				password: values.password,
				fullName: values.fullName,
			};

			signup(formUser);
		},
	});

	return (
		<div className="flex items-center flex-col gap-4">
			{/* Display error message */}
			<p
				className={`text-center w-full max-w-[20rem] ${
					error ? "text-danger" : "hidden"
				}`}
			>
				{error && error}
			</p>

			<form
				className="signup__form flex flex-col gap-4 items-center w-full"
				onSubmit={formik.handleSubmit}
			>
				<Input
					className="max-w-xs"
					radius="sm"
					label="Full Name"
					name="fullName"
					value={formik.values.fullName}
					onChange={formik.handleChange}
					placeholder="Enter your full name"
					fullWidth
					variant="bordered"
					isInvalid={formik.errors.fullName ? true : false}
					errorMessage={formik.errors.fullName && formik.errors.fullName}
				/>
				<Input
					className="max-w-xs"
					radius="sm"
					type="email"
					label="Email"
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					placeholder="Enter your email"
					fullWidth
					variant="bordered"
					isInvalid={formik.errors.email ? true : false}
					errorMessage={formik.errors.email && formik.errors.email}
				/>
				<Input
					className="max-w-xs"
					radius="sm"
					label="Password"
					name="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					placeholder="Enter your password"
					fullWidth
					type="password"
					variant="bordered"
					isInvalid={formik.errors.password ? true : false}
					errorMessage={formik.errors.password && formik.errors.password}
				/>
				<Input
					className="max-w-xs"
					radius="sm"
					label="Confirm Password"
					name="confirmPassword"
					value={formik.values.confirmPassword}
					onChange={formik.handleChange}
					placeholder="Confirm your password"
					fullWidth
					type="password"
					variant="bordered"
					isInvalid={formik.errors.confirmPassword ? true : false}
					errorMessage={
						formik.errors.confirmPassword && formik.errors.confirmPassword
					}
				/>

				<Button
					type="submit"
					radius="none"
					isDisabled={
						formik.errors.password ||
						formik.errors.email ||
						formik.errors.confirmPassword
							? true
							: false
					}
					className="w-full max-w-xs signup__form-btn btn-filled-transparent"
				>
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default SignupForm;
