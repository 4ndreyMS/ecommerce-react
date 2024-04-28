import React, { useState } from "react";
import { useFormik } from "formik";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import * as Yup from "yup";
import "./Login.scss";
import { auth, db } from "../../service/firebase";
import { loginState } from "../../states/loginState";
import { IUserCredentials } from "../../models/IUserCredentials";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRecoilState } from "recoil";

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
		const q = query(
			collection(db, "userList"),
			where("email", "==", user.email),
			where("password", "==", user.password)
		);

		const querySnapshot = await getDocs(q);
		console.log("data", querySnapshot);

		if (querySnapshot.size > 0) {
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
				setGlobalUser(doc.data());
				navigate("/", { replace: true });
			});
		} else {
			setError(
				"Invalid username or password. Please check your credentials and try again."
			);
		}
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
