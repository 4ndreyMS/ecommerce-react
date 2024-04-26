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
	Image,
} from "@nextui-org/react";
import HomePage from "../../pages/home";
import { Link } from "react-router-dom";

const Nav = () => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
						to="/about"
					>
						About
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						className="font-medium"
						aria-label="Redirection to product list"
						color="foreground"
						to="/products-list"
					>
						Products
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
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
				<NavbarItem className="hidden lg:flex">
					<Link
						aria-label="Redirection to sign up"
						color="primary"
						to="signup"
						className="font-medium"
					>
						Sign Up
					</Link>
				</NavbarItem>
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
						to="signup"
						// size="lg"
						aria-label="Redirection to sign up"
					>
						Sign Up
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
