import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { IProduct } from "../../models/IProduct";

interface PaginationProps {
	itemsPerPage: number; //the amount of items per page
	items: IProduct[]; //the data
	//the child to render and the proprs to assign
	component: React.ComponentType<{
		paginatedItems: IProduct[];
	}>;
}

//this component do the pagination an receive three params
const Pagination: React.FC<PaginationProps> = ({
	itemsPerPage,
	items,
	component: InnerComponent,
}) => {
	const [itemOffset, setItemOffset] = useState(0);

	//last item
	const endOffset = itemOffset + itemsPerPage;
	//spread the array of objects
	const currentItems = items.slice(itemOffset, endOffset);
	//counts the amount of pages
	const pageCount = Math.ceil(items.length / itemsPerPage);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

	return (
		<>
			<InnerComponent paginatedItems={currentItems} />
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
			/>
		</>
	);
};

export default Pagination;
