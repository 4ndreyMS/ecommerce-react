import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../service/ProductListService";
import { IProduct, IProductSpring } from "../../models/IProduct";
import "./product-details.scss";
import ProductDetail from "../../components/Products/ProductDetail/ProductDetail";
import axios from "axios";

const ProductDetails = () => {
	const [product, setProduct] = useState<IProductSpring | null>(null);
	const [searchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const productId = searchParams.get("id");

	const fetchIsAdmin = async () => {
		const apiUrl =
			import.meta.env.VITE_BASE_API_URL +
			"/api/v1/product/getById/" +
			productId;

		axios
			.get(apiUrl)
			.then((response) => {
				console.log(response.data.data);
				setProduct(response.data.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setIsLoading(false);

				// Handle errors here
			});
	};

	useEffect(() => {
		setIsLoading(true);
		fetchIsAdmin();
	}, []);

	return (
		<div>
			{isLoading && (product === null || product === undefined) && (
				<h2>Loading...</h2>
			)}

			{!isLoading && (product === null || product === undefined) && (
				<h1>No products found</h1>
			)}

			{!isLoading && product !== null && product !== undefined && (
				<ProductDetail product={product} />
			)}
		</div>
	);
};

export default ProductDetails;

// {!isLoading && product === null && product !== undefined ? (
// 	<ProductDetail product={product} />
// ) : (
// 	<h1>No products found</h1>
// )}
