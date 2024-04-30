import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { IProduct } from "../../models/IProduct";
import "./Pagination.scss";

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
	itemsPerPage, //amount of item per page
	items, //data to paginate
	component: InnerComponent, //component to render
}) => {
	const [itemOffset, setItemOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	//last item
	const endOffset = itemOffset + itemsPerPage;
	//spread the array of objects
	const currentItems = items.slice(itemOffset, endOffset);
	//counts the amount of pages
	const pageCount = Math.ceil(items.length / itemsPerPage);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		console.log("clicked");
		const selectedPage = event.selected;
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setCurrentPage(selectedPage);
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

	console.log("rerender tbl", itemOffset);

	return (
		<>
			<InnerComponent paginatedItems={currentItems} />

			<ReactPaginate
				className="pagination-container"
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
				pageLinkClassName={"button-filled-beige"}
				previousLinkClassName={"button-filled-beige"}
				nextLinkClassName={"button-filled-beige"}
				forcePage={currentPage}
				// activeClassName={"active-btn"}
			/>
		</>
	);
};

export default Pagination;
