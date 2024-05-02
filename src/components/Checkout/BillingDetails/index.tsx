import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";
import AddressForm from "../AddressForm";
import CardForm from "../CardForm";

const BillingDetails = () => {
	return (
		<div>
			<Accordion
				variant="bordered"
				defaultExpandedKeys={["1"]}
				className="border-brown rounded-none"
			>
				<AccordionItem
					key="1"
					aria-label="Shipping address info"
					title="Shipping address"
				>
					<AddressForm />
				</AccordionItem>

				<AccordionItem
					key="2"
					aria-label="Credit Card Info"
					title="Credit Card Info"
				>
					<CardForm />
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default BillingDetails;
