import React from "react";
import { useRecoilState } from "recoil";
import { filteredProductsState } from "../../../../states/filteredProductsState";
import { IProduct } from "../../../../models/IProduct";

const FilterBy = ({ unmutableProdList }: { unmutableProdList: IProduct[] }) => {
	const [arraya, setFilteredList] = useRecoilState(filteredProductsState);

	//this function receives a category and filter the array
	const filterByCategory = ({ category }: { category: string }) => {
		if (category !== "All") {
			const newArray: IProduct[] = unmutableProdList.filter(
				(item: IProduct) => item.category === category
			);
			setFilteredList(newArray);
		} else {
			setFilteredList(unmutableProdList);
		}
	};

	const categories = ["All", "Bedroom", "Living Room", "Kitchen", "Outdoor"];
	return (
		<div className="wrapper preview-products__filter-by-cont">
			<div>
				<p>Filter by:</p>
			</div>
			<div className="preview-products__filters-cont">
				{categories.map((categoryItem) => {
					return (
						<button
							type="button"
							className="button-unfilled "
							onClick={() => {
								filterByCategory({ category: categoryItem });
							}}
						>
							{categoryItem}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default FilterBy;
