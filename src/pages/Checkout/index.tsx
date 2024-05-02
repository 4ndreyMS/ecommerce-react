import BillingDetails from "../../components/Checkout/BillingDetails";
import CheckOutSummary from "../../components/Checkout/CheckOutSummary";
import "./CheckoutPage.scss";
import ProductsBanner from "../../components/Banners/ProductsBanner";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link } from "react-router-dom";

const CheckOut = () => {
	return (
		<div>
			<ProductsBanner title="Checkout">
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
							to="/products"
							aria-label="Link to all products"
						>
							Checkout
						</Link>
					</BreadcrumbItem>
				</Breadcrumbs>
			</ProductsBanner>

			<div className="wrapper flex flex-col gap-4">
				<div className="">
					<h2>Billing Details</h2>
				</div>
				<div className=" checkout-page gap-4">
					<BillingDetails />
					<CheckOutSummary />
				</div>
			</div>
		</div>
	);
};

export default CheckOut;
