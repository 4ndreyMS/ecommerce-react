import React from "react";
import "./navbar.scss";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Button,
	Avatar,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../../states/loginState";
import { isEmptyObject } from "../../../utils/objectValidations";
import CartIBadge from "../../Cart/CartIBadge";
import axios from "axios";
import { cartProductsState } from "../../../states/cartState";

const Nav = () => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [loggedUser, setLoggedUSer] = useRecoilState(loginState);
	const [, setCartItems] = useRecoilState(cartProductsState);

	return (
		<Navbar className="nav" onMenuOpenChange={setIsMenuOpen}>
			<NavbarMenuToggle
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				className="sm:hidden"
			/>
			<NavbarBrand>
				<Link aria-label="Redirection to home" color="foreground" to="/">
					<img
						className="nav__logo-img"
						alt="Logo"
						src="/images/logoCafe.png"
					/>
				</Link>
			</NavbarBrand>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link
						className="font-medium"
						aria-label="Redirection to home"
						color="foreground"
						to="/"
					>
						Home
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						className="font-medium"
						aria-label="Redirection to about"
						color="foreground"
						to="/#about"
					>
						About
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						className="font-medium"
						aria-label="Redirection to product list"
						color="foreground"
						to="/products"
					>
						Products
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem>
					<Link
						color={"foreground"}
						className="w-full font-medium flex align-center"
						to="/cart"
						aria-label="Link to all products"
					>
						<CartIBadge />
					</Link>
				</NavbarItem>

				{!isEmptyObject(loggedUser) ? (
					<>
						<NavbarItem>
							<Link to="/profile">
								<Avatar
									className="text-medium bg-brown text-white"
									size="sm"
									name={
										loggedUser.fullName != undefined
											? loggedUser.fullName[0]
											: "U"
									}
								/>
							</Link>
						</NavbarItem>
						{/* <NavbarItem>
							<Button
								color="default"
								variant="flat"
								className="font-medium"
								aria-label="Logout"
								onClick={() => {
									setLoggedUSer({});
									setCartItems([]);
								}}
							>
								Logout
							</Button>
						</NavbarItem> */}
					</>
				) : (
					<>
						<NavbarItem>
							<Button
								as={Link}
								color="default"
								to="signin"
								variant="flat"
								className="font-medium"
							>
								Login
							</Button>
						</NavbarItem>
						<NavbarItem>
							<Link
								color={"foreground"}
								className="hidden lg:flex w-full font-medium"
								to="/signup"
								aria-label="Link to Sign up"
							>
								Sign up
							</Link>
						</NavbarItem>
					</>
				)}
			</NavbarContent>

			{/* The mobile menu starts here */}
			<NavbarMenu>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full font-medium"
						to="/"
						aria-label="Redirection to home"
						// size="lg"
					>
						Home
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full font-medium"
						to="signin"
						// size="lg"
						aria-label="Redirection to login"
					>
						Login
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full font-medium"
						to="about"
						aria-label="Redirection to about"
						// size="lg"
					>
						About
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full font-medium"
						to="products"
						aria-label="Redirection to product list"
						// size="lg"
					>
						Products
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full font-medium"
						to="/"
						aria-label="Logout"
					>
						Logout
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
};

export default Nav;
