import React, { useEffect, useState } from "react";

import ProducsTable from "../../components/Products/ProductsTable";
import { IProduct } from "../../models/IProduct";
import { getAllProducts } from "../../service/ProductListService";
import Pagination from "../../components/Pagination";
import { useRecoilState } from "recoil";
import {
	filteredProductsState,
	unMutableProductsState,
} from "../../states/filteredProductsState";
import FilterBy from "../../components/Products/ProductsTable/FilterBy";

const ProductList = () => {
	//this value can change, is the paginated list
	const [products, setProducts] = useRecoilState(filteredProductsState);
	//this list never changes, it can be access from anywhere
	const [, setUnmutableProducts] = useRecoilState(unMutableProductsState);

	useEffect(() => {
		getAllProducts().then((data) => {
			setUnmutableProducts([...data]);
			setProducts([...data]);
		});
	}, []);

	return (
		<>
			<Pagination items={products} itemsPerPage={10} component={ProducsTable} />
		</>
	);
};

export default ProductList;
