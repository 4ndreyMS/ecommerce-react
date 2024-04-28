import React, { useState } from "react";
import { useFormik } from "formik";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import * as Yup from "yup";
import "./Login.scss";
import { auth } from "../../service/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRecoilState } from "recoil";
import { loginState } from "../../states/loginState";
import { IUserCredentials } from "../../models/IUserCredentials";

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
	const [, setUser] = useRecoilState(loginState);
	const [error, setError] = useState("");

	// this function do the login with firebase
	const login = (user: IUserCredentials) => {
		signInWithEmailAndPassword(auth, user.email, user.password)
			.then((userCredential) => {
				console.log(userCredential);
				setUser(userCredential);
				setError("");
			})
			.catch(() => {
				setError("Faild to login");
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
			const user: IUserCredentials = {
				email: values.email,
				password: values.password,
			};
			// execute the login
			login(user);
		},
	});

	const introMessage = "Please enter your details";
	return (
		<div className="login">
			<div className="login-cont">
				<Card radius="sm" className="w-full max-w-[25rem] h-full max-h-[25rem]">
					<CardBody>
						<div className="login__intro-cont">
							<h1>Welcome Back</h1>
							<p className={error !== "" ? "text-danger" : ""}>
								{error === "" ? introMessage : error}
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
								radius="sm"
								isDisabled={
									formik.errors.password || formik.errors.email ? true : false
								}
								className="login__form-btn"
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
