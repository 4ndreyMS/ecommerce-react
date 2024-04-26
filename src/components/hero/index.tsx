import React from "react";
import "./hero.scss";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
const Hero = () => {
	return (
		<div id="about" className="hero">
			<div className="hero__container-bg">
				<div className="hero__banner-container wrapper">
					<div className="hero__banner wrapper">
						<h1 className="hero__banner-header font-medium">
							Discover our collections
						</h1>
						<div className="flex flex-col gap-4">
							<p>
								Welcome to our online store, showcasing our latest furniture
								collection. Our hero section presents high-quality images of our
								new arrivals. Each piece is crafted with care, offering style
								and comfort for every home. Explore our collection and find the
								perfect piece to transform your space.
							</p>
							<div>
								<Button
									as={Link}
									aria-label="View collections"
									className="semi-bold btn-filled-transparent"
									to="/products"
									// variant="flat"
									radius="none"
								>
									See all collections
								</Button>
							</div>
						</div>

						{/* <Link
							aria-label="View collections"
							className="button-filled semi-bold"
							to="/products"
						>
							See all collections
						</Link> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
