import React from "react";
import { useFormik } from "formik";
import { Input, Button } from "@nextui-org/react";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters long")
		.required("Password is required"),
});

const LoginForm = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			// Handle form submission logic (e.g., send login request to server)
			alert(values); // For demonstration purposes
		},
	});

	return (
		<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
			{formik.touched.email && formik.errors.email && (
				<p color="error" css={{ mt: "$1" }}>
					{formik.errors.email}
				</p>
			)}
			<Input
				type="email"
				label="Email"
				name="email"
				value={formik.values.email}
				onChange={formik.handleChange}
				fullWidth
				variant="bordered"
				className="max-w-xs"
			/>
			{/* "flat", "bordered", "underlined", "faded"] */}
			<Input
				label="Password"
				name="password"
				value={formik.values.password}
				onChange={formik.handleChange}
				fullWidth
				type="password"
				variant="bordered"
				isInvalid={formik.errors.password ? true : true}
				errorMessage={formik.errors.password && formik.errors.password}
				color="default"
				className="max-w-xs error"
			/>
			<Button type="submit" css={{ mt: "$2" }}>
				Login
			</Button>
			{formik.touched.password && formik.errors.password && (
				<p color="error" css={{ mt: "$1" }}>
					{formik.errors.password}
				</p>
			)}
		</form>
	);
};

export default LoginForm;
