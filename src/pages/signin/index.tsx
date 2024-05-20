import "./Login.scss";
import UserAccessTemplate from "../../components/UserAccess/UserAccessTemplate";
import LoginForm from "../../components/UserAccess/LoginForm";
import { Link } from "react-router-dom";

//yup for form validations
const LoginPage = () => {
	return (
		<div>
			<UserAccessTemplate
				title="Welcome back"
				introMessage="Please enter your details"
			>
				<LoginForm />
				<div className="flex justify-center gap-1 pt-4">
					<p>Don't have an account?</p>{" "}
					<Link className="font-medium" to={"/signup"}>
						Sign Up
					</Link>
				</div>
			</UserAccessTemplate>
		</div>
	);
};

export default LoginPage;
