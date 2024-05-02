import React from "react";
import BillingDetails from "../../components/Checkout/BillingDetails";
import CheckOutSummary from "../../components/Checkout/CheckOutSummary";
import "./CheckoutPage.scss";

const CheckOut = () => {
	return (
		<div className="wrapper checkout-page gap-4">
			<BillingDetails />
			<CheckOutSummary />
		</div>
	);
};

export default CheckOut;
