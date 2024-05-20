import { Link } from "react-router-dom";
import SignUpForm from "../../components/UserAccess/SignUpForm";
import UserAccessTemplate from "../../components/UserAccess/UserAccessTemplate";

const SignUpPage = () => {
	return (
		<div>
			<UserAccessTemplate
				title="Create Account"
				introMessage="Please enter your details"
			>
				<SignUpForm />
				<div className="flex justify-center gap-1 pt-4">
					<p>Already have a account?</p>{" "}
					<Link className="font-medium" to={"/signup"}>
						Sign in
					</Link>
				</div>
			</UserAccessTemplate>
		</div>
	);
};

export default SignUpPage;
