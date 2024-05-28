import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import ProductsBanner from "../../components/Banners/ProductsBanner";
import {
	BreadcrumbItem,
	Breadcrumbs,
	Button,
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
import OrderTable from "../../components/OrderTable";
import { orderDetailState } from "../../states/orderDetailState";
import { useUserDetails } from "../../service/hooks/useUserDetails";
import { cartProductsState } from "../../states/cartState";
import toast from "react-hot-toast";

const Dashboard = () => {
	const [selectedSection, setSelectedSection] = useState(new Set(["Profile"]));
	const [globalUser] = useRecoilState(loginState);
	const apiUrl = import.meta.env.VITE_BASE_API_URL + "/users/isAdmin";
	const [isAdmin, setIsAdmin] = useState(false);
	const [userData, setUserData] = useState({});
	const { getMyData } = useUserDetails();
	const [loggedUser, setLoggedUSer] = useRecoilState(loginState);
	const [, setCartItems] = useRecoilState(cartProductsState);
	const [, setOderDetails] = useRecoilState(orderDetailState);

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

		getMyData().then((data) => {
			setUserData(data);
		});
	}, [globalUser]);

	useEffect(() => {
		setOderDetails(null);
	}, []);

	return (
		<div className="dash-page min-h-[70vh]">
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
							<Card radius="none">
								<CardBody>
									<div className="flex flex-col gap-4">
										<p className="font-semibold text-xl">Profile info</p>
										<div className="flex flex-col gap-4">
											<div>
												<p className="text-sm">Email</p>
												<p className="font-medium">{userData.email}</p>
											</div>

											<div>
												<p className="text-sm">Name</p>
												<p className="font-medium">{userData.fullName}</p>
											</div>
										</div>
										<div>
											<Button
												radius="none"
												color="default"
												variant="flat"
												className="font-medium bg-brown text-white"
												aria-label="Logout"
												onClick={() => {
													setLoggedUSer({});
													setCartItems([]);
													toast.success("Logged out!", {
														position: "bottom-center",
													});
												}}
											>
												Logout
											</Button>
										</div>
									</div>
								</CardBody>
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
							<div>
								<OrderTable />
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
