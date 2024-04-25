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
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<Link color="foreground" to="/">
						<Image className="nav__logo-img" src="/images/logoCafe.png" />
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" to="/">
						Home
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" to="/about">
						About
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" to="/products-list">
						Products
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Link color="foreground" to="signin">
						Login
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" to="signup" variant="flat">
						Sign Up
					</Button>
				</NavbarItem>
			</NavbarContent>

			{/* The mobile menu starts here */}
			<NavbarMenu>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full"
						to="/"
						// size="lg"
					>
						Home
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full"
						to="signin"
						// size="lg"
					>
						Login
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full"
						to="signup"
						// size="lg"
					>
						Sign Up
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full"
						to="about"
						// size="lg"
					>
						About
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full"
						to="products"
						// size="lg"
					>
						Products
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						color={"foreground"}
						className="w-full"
						to="/"
						// size="lg"
					>
						Logout
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
};

export default Nav;
