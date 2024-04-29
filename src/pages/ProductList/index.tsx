import React, { useEffect, useState } from "react";

import ProducsTable from "../../components/Products/ProductsTable";
import { IProduct } from "../../models/IProduct";
import { getAllProducts } from "../../service/ProductListService";
import Pagination from "../../components/Pagination";

const ProductList = () => {
	const [productList, setProductList] = useState<IProduct[]>([]);
	useEffect(() => {
		getAllProducts().then((data) => setProductList(data));
	}, []);

	return (
		<Pagination
			items={productList}
			itemsPerPage={16}
			component={ProducsTable}
		/>
	);
};

export default ProductList;
