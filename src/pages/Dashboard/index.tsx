import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
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
import { loginState } from "../../states/loginState";
import { useRecoilState } from "recoil";
import axios from "axios";

const Dashboard = () => {
	const [selectedSection, setSelectedSection] = useState(new Set(["Profile"]));
	const [globalUser] = useRecoilState(loginState);
	const apiUrl = import.meta.env.VITE_BASE_API_URL + "/users/isAdmin";
	const [isAdmin, setIsAdmin] = useState(false);

	const fetchIsAdmin = async () => {
		try {
			const response = await axios.get(apiUrl, {
				headers: {
					Authorization: `Bearer ${globalUser.token}`,
				},
			});
			setIsAdmin(response.data.data);
		} catch (err) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchIsAdmin();
	}, [[], globalUser]);

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
					<Tabs
						className="bg-white tabs-cont"
						aria-label="Options"
						isVertical={true}
					>
						<Tab
							className="w-full"
							key={DashboardSectionsEnum.PROFILE}
							title={DashboardSectionsEnum.PROFILE}
						>
							<Card>
								<CardBody>Profile info</CardBody>
							</Card>
						</Tab>
						{isAdmin && (
							<Tab
								className="w-full"
								key={DashboardSectionsEnum.PRODUCTS}
								title={DashboardSectionsEnum.PRODUCTS}
							>
								<div className="bg-white">
									<ProductManagement />
								</div>
							</Tab>
						)}
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
