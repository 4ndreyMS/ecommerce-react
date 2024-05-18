import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import * as Yup from "yup";
import "./Login.scss";
import { db } from "../../service/firebase";
import { loginState } from "../../states/loginState";
import { IUserCredentials } from "../../models/IUserCredentials";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRecoilState } from "recoil";
import axios from "axios";
import { IUserLogin } from "../../models/IUserLogin";

//yup for form validations
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
	const [error, setError] = useState("");
	// const navigate = useNavigate();

	const login = async (user: IUserCredentials) => {
		const baseURL = import.meta.env.VITE_BASE_API_URL;
		const userData: IUserLogin = {
			email: user.email,
			password: user.password,
		};
		axios
			.post(baseURL + "/auth/login", userData) // Cambia la URL a tu endpoint de autenticación
			.then((response) => {
				console.log("Respuesta del servidor:", response.data.data.token);
				const responseToken = response.data.data.token;
				if (responseToken != undefined) {
					setGlobalUser({ token: responseToken });
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
			const formUser: IUserCredentials = {
				email: values.email,
				password: values.password,
			};

			login(formUser);
		},
	});

	const introMessage = "Please enter your details";
	return (
		<div className="login">
			<div className="login-cont">
				<Card radius="sm" className="w-full max-w-[25rem] h-full max-h-[25rem]">
					<CardBody>
						<div className="login__intro-cont flex flex-col items-center">
							<h1>Welcome Back</h1>
							<p
								className={`w-full max-w-[20rem] ${
									error !== "" ? "text-danger" : ""
								}`}
							>
								{error ? error : introMessage}
							</p>
						</div>

						{/* {error !== "" && <Code>{error}</Code>} */}

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
						{/* </div> */}
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default LoginForm;
