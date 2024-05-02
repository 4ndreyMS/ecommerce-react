import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";
import AddressForm from "../AddressForm";

const BillingDetails = () => {
	const defaultContent =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

	return (
		<div>
			<Accordion
				variant="bordered"
				// variant="light"
				className="border-brown rounded-none"
			>
				<AccordionItem
					key="1"
					aria-label="Shipping address info"
					title="Shipping address"
				>
					<AddressForm />
				</AccordionItem>

				<AccordionItem key="3" aria-label="Accordion 2" title="Accordion 2">
					{defaultContent}
				</AccordionItem>
				<AccordionItem key="4" aria-label="Accordion 2" title="Accordion 2">
					{defaultContent}
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default BillingDetails;
