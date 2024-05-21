import { Card, CardBody, Listbox, ListboxItem } from "@nextui-org/react";
import React, { useState } from "react";
import { DashboardSectionsEnum } from "../../pages/Dashboard/DashboardSectionsEnum";

interface NavDashProps {
	setSelectedSection: (val: Set<string>) => void;
	selectedSection: Set<string>;
}

const NavDashboard: React.FC<NavDashProps> = ({
	setSelectedSection,
	selectedSection,
}) => {
	const sections = Object.values(DashboardSectionsEnum).map(
		(element) => element
	);

	return (
		<>
			<Card radius="none" className="w-fit">
				<CardBody>
					<div className="min-w-[13rem] px-1 py-2 ">
						<Listbox
							aria-label="Single selection example"
							variant="flat"
							disallowEmptySelection
							selectionMode="single"
							selectedKeys={selectedSection}
							onSelectionChange={setSelectedSection}
						>
							{sections.map((item) => (
								<ListboxItem key={item}>{item}</ListboxItem>
							))}
						</Listbox>
					</div>
				</CardBody>
			</Card>
		</>
	);
};

export default NavDashboard;
