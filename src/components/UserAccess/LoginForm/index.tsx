import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../../states/loginState";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUserLogin } from "../../../models/IUserLogin";

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters long")
		.required("Password is required"),
});

const LoginForm = () => {
	const navigate = useNavigate();
	const [, setGlobalUser] = useRecoilState(loginState);
	// const navigate = useNavigate();
	const [error, setError] = useState("");

	const login = async (user: IUserLogin) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		const userData: IUserLogin = {
			email: user.email,
			password: user.password,
		};
		axios
			.post(baseURL + "/auth/login", userData) // Cambia la URL a tu endpoint de autenticación
			.then((response) => {
				console.log("Respuesta del servidor:", response);
				const responseToken = response.data.data.token;
				const responseFullName = response.data.data.fullName;
				if (responseToken != undefined) {
					setGlobalUser({ token: responseToken, fullName: responseFullName });
					navigate("/", { replace: true });
				} else {
					setError(
						"Invalid username or password. Please check your credentials and try again."
					);
				}
			})
			.catch(() => {
				setError(
					"Invalid username or password. Please check your credentials and try again."
				);
			});
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			//get user credentials
			const formUser: IUserLogin = {
				email: values.email,
				password: values.password,
			};

			login(formUser);
		},
	});

	return (
		<div className="flex items-center flex-col gap-4">
			<p
				className={`text-center w-full max-w-[20rem] ${
					error !== "" ? "text-danger" : "hidden"
				}`}
			>
				{error && error}
			</p>

			<form
				className="login__form flex flex-col gap-4 items-center"
				onSubmit={formik.handleSubmit}
			>
				<Input
					radius="sm"
					type="email"
					label="Email"
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					placeholder="Enter your email"
					fullWidth
					variant="bordered"
					className="max-w-xs"
					isInvalid={formik.errors.email ? true : false}
					errorMessage={formik.errors.email && formik.errors.email}
				/>
				{/* "flat", "bordered", "underlined", "faded"] */}
				<Input
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
					color="default"
					className="max-w-xs"
				/>
				<Button
					type="submit"
					radius="none"
					isDisabled={
						formik.errors.password || formik.errors.email ? true : false
					}
					className="login__form-btn btn-filled-transparent"
				>
					Login
				</Button>
			</form>
		</div>
	);
};

export default LoginForm;
