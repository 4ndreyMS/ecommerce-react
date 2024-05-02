import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../service/ProductListService";
import { IProduct } from "../../models/IProduct";
import "./product-details.scss";
import ProductDetail from "../../components/Products/ProductDetail/ProductDetail";

const ProductDetails = () => {
	const [product, setProduct] = useState<IProduct | null>(null);
	const [searchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const productId = searchParams.get("id");
	useEffect(() => {
		getAllProducts().then((data: IProduct[]) => {
			setIsLoading(true);
			const filteredProduct = data.filter((product: IProduct) => {
				return product.id === productId;
			});
			setProduct(filteredProduct[0]);
			setIsLoading(false);
		});
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
