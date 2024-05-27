import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../states/loginState";
import { isEmptyObject } from "../objectValidations";
import { cartProductsState } from "../../states/cartState";
import { useLocation } from "react-router-dom";
const PrivateRoutes = () => {
	const [loggedUser] = useRecoilState(loginState);
	const [cart] = useRecoilState(cartProductsState);
	const location = useLocation();

	if (isEmptyObject(loggedUser)) {
		return <Navigate to="/signin" />;
	} else if (
		location.pathname.includes("checkout") &&
		(cart == undefined || cart.length < 1)
	) {
		return <Navigate to="/products" />;
	} else {
		return <Outlet />;
	}
};

export default PrivateRoutes;
