import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IProductSpring } from "../../models/IProduct";
import "./Pagination.scss";

interface PaginationProps {
	itemsPerPage: number; //the amount of items per page
	items: IProductSpring[]; //the data
	//the child to render and the proprs to assign
	component: React.ComponentType<{
		paginatedItems: IProductSpring[];
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

	useEffect(() => {
		setCurrentPage(0);
		setItemOffset(0);
	}, [items]);
	//last item
	const endOffset = itemOffset + itemsPerPage;
	//spread the array of objects
	const currentItems = items.slice(itemOffset, endOffset);
	//counts the amount of pages
	const pageCount = Math.ceil(items.length / itemsPerPage);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const selectedPage = event.selected;
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setCurrentPage(selectedPage);

		setItemOffset(newOffset);
	};

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
