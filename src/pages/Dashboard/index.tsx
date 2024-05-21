import React, { useState } from "react";
import "./Dashboard.scss";
import NavDashboard from "../../components/NavDashboard";
import ProductsBanner from "../../components/Banners/ProductsBanner";
import {
	BreadcrumbItem,
	Breadcrumbs,
	Card,
	CardBody,
	Tab,
	Tabs,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { DashboardSectionsEnum } from "./DashboardSectionsEnum";
import ProductManagement from "../../components/Products/ProductManagement";

const Dashboard = () => {
	const [selectedSection, setSelectedSection] = useState(new Set(["Profile"]));
	return (
		<div className="dash-page">
			<ProductsBanner title="Profile">
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
							to="/profile"
							aria-label="Link to profile"
						>
							Profile
						</Link>
					</BreadcrumbItem>
				</Breadcrumbs>
			</ProductsBanner>
			<div className="dash-page">
				<div className="wrapper flex gap-4 dash-page__cont">
					{/* <NavDashboard
						selectedSection={selectedSection}
						setSelectedSection={setSelectedSection}
					/>
					{selectedSection.has(DashboardSectionsEnum.PRODUCTS.toString()) && (
						<ProductManagement />
					)} */}

					<Tabs className="bg-white" aria-label="Options" isVertical={true}>
						<Tab
							className="w-full"
							key={DashboardSectionsEnum.PROFILE}
							title={DashboardSectionsEnum.PROFILE}
						>
							<Card>
								<CardBody>Profile info</CardBody>
							</Card>
						</Tab>
						<Tab
							className="w-full"
							key={DashboardSectionsEnum.PRODUCTS}
							title={DashboardSectionsEnum.PRODUCTS}
						>
							<div className="bg-white">
								<ProductManagement />
							</div>
						</Tab>
						<Tab
							className="w-full"
							key={DashboardSectionsEnum.ORDERS}
							title={DashboardSectionsEnum.ORDERS}
						>
							<Card>
								<CardBody>Orders</CardBody>
							</Card>
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
