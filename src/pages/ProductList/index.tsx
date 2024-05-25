import React, { useEffect, useState } from "react";

import ProducsTable from "../../components/Products/ProductsTable";
import { IProduct } from "../../models/IProduct";
import { getAllProducts, getAllStates } from "../../service/ProductListService";
import Pagination from "../../components/Pagination";
import { useRecoilState } from "recoil";
import {
	filteredProductsState,
	unMutableProductsState,
} from "../../states/filteredProductsState";
import FilterBy from "../../components/Products/ProductsTable/FilterBy";
import ProductsBanner from "../../components/Banners/ProductsBanner";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { loginState } from "../../states/loginState";
import axios from "axios";

const ProductList = () => {
	//this value can change, is the paginated list
	const [products] = useRecoilState(filteredProductsState);
	//this list never changes, it can be access from anywhere
	const [globalUser] = useRecoilState(loginState);
	const [, setUnmutableProducts] = useRecoilState(unMutableProductsState);

	const fetchIsAdmin = async () => {
		const apiUrl = import.meta.env.VITE_BASE_API_URL + "/api/v1/product/getAll";

		axios
			.get(apiUrl)
			.then((response) => {
				console.log(response.data.data);
				setUnmutableProducts(response.data.data);
			})
			.catch((error) => {
				console.error("Error:", error);
				// Handle errors here
			});
	};

	useEffect(() => {
		fetchIsAdmin();
	}, []);

	return (
		<>
			<ProductsBanner title="All products">
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
							to="/products"
							aria-label="Link to all products"
						>
							All Products
						</Link>
					</BreadcrumbItem>
				</Breadcrumbs>
			</ProductsBanner>
			<Pagination items={products} itemsPerPage={10} component={ProducsTable} />
		</>
	);
};

export default ProductList;
