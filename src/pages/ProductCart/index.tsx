import React, { useEffect } from "react";
import ProductsBanner from "../../components/Banners/ProductsBanner";
import { BreadcrumbItem, Breadcrumbs, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";
import CartTable from "../../components/Cart/CartTable";
import { useRecoilState } from "recoil";
import { cartProductsState } from "../../states/cartState";
import CartSummary from "../../components/Cart/CartSummary";
import axios from "axios";
import { loginState } from "../../states/loginState";
import { useCartManage } from "../../service/hooks/useCartManage";

const ProductCart = () => {
	const [globalUser] = useRecoilState(loginState);
	const { getProductsCart } = useCartManage();

	useEffect(() => {
		globalUser != undefined && getProductsCart();
	}, []);

	return (
		<div>
			<ProductsBanner title="Cart">
				<Breadcrumbs size="lg">
					<BreadcrumbItem>
						<Link
							color={"foreground"}
							className="w-full font-normal"
							to="/"
							aria-label="Link to home"
						>
							Home
						</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link
							color={"foreground"}
							className="w-full font-medium"
							to="/cart"
							aria-label="Link to cart"
						>
							Cart
						</Link>
					</BreadcrumbItem>
				</Breadcrumbs>
			</ProductsBanner>
			<main className="wrapper flex flex-col gap-4">
				<CartTable />
				<CartSummary />
			</main>
		</div>
	);
};

export default ProductCart;
