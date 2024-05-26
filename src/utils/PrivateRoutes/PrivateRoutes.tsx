import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../states/loginState";
import { isEmptyObject } from "../objectValidations";
import { cartProductsState } from "../../states/cartState";

const PrivateRoutes = () => {
	const [loggedUser] = useRecoilState(loginState);
	const [cart] = useRecoilState(cartProductsState);

	if (isEmptyObject(loggedUser)) {
		return <Navigate to="/signin" />;
	} else {
		return <Outlet />;
	}
};

export default PrivateRoutes;
