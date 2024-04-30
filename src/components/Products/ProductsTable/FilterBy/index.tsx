import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filteredProductsState } from "../../../../states/filteredProductsState";
import { IProduct } from "../../../../models/IProduct";
import {
	Card,
	CardBody,
	Checkbox,
	CheckboxGroup,
	Input,
	Slider,
	Tab,
	Tabs,
} from "@nextui-org/react";

const FilterBy = ({
	unmutableProdList,
	highestPrice = 0,
}: {
	unmutableProdList: IProduct[];
	highestPrice: number;
}) => {
	const [, setFilteredList] = useRecoilState(filteredProductsState);
	const [inputValue, setInputValue] = useState("");
	const [priceFilter, setPriceFilter] = useState(0);

	useEffect(() => {
		setPriceFilter(highestPrice);
	}, [highestPrice]);

	//handel the serch by name
	const handleInputChange = (event) => {
		//data from imput
		const newValue = event.target.value;
		setInputValue(newValue);
	};

	//list of categoires
	const categoriesCheck = [
		"Bedroom",
		"Living Room",
		"Kitchen",
		"Outdoor",
		"Bathroom",
	];
	//to lower the categories
	const lowerCaseCategories = categoriesCheck.map((category) =>
		category.toLowerCase()
	);

	const [categories, setCategories] = useState(lowerCaseCategories);

	//this apply the filters to the unmutable list
	useEffect(() => {
		let filteredData = unmutableProdList
			.filter((item: IProduct) => {
				return item.name.toLowerCase().includes(inputValue.toLowerCase());
			})
			.filter((product: IProduct) => {
				return categories.includes(product.category.toLowerCase());
			})
			.filter(
				(item) => Number(item.price) >= 0 && Number(item.price) <= priceFilter
			);

		if (
			categories.length === 5 &&
			inputValue === "" &&
			priceFilter === highestPrice
		) {
			filteredData = unmutableProdList;
		}
		setFilteredList(filteredData);

		console.log(filteredData);
	}, [categories, inputValue, priceFilter]);

	console.log(priceFilter);
	return (
		<div className="wrapper">
			<div>
				<p>Filter by:</p>
			</div>

			<div className="flex w-full flex-col">
				<Tabs aria-label="Options">
					<Tab key="Product" title="Product">
						<Card>
							<CardBody>
								<div>
									<Input
										type="text"
										// variant={variant}
										label="Product Name"
										onChange={handleInputChange}
										value={inputValue}
										placeholder="Enter your product name"
									/>
								</div>
							</CardBody>
						</Card>
					</Tab>
					<Tab key="Categories" title="Categories">
						<Card>
							<CardBody>
								<CheckboxGroup
									label="Select cities"
									orientation="horizontal"
									color="secondary"
									defaultValue={categories}
									onValueChange={setCategories}
								>
									{categoriesCheck.map((category) => {
										return (
											<Checkbox value={category.toLowerCase()}>
												{category}
											</Checkbox>
										);
									})}
								</CheckboxGroup>
							</CardBody>
						</Card>
					</Tab>
					<Tab key="Price" title="Price">
						<Card>
							<CardBody>
								<Slider
									step={50}
									maxValue={1500}
									minValue={0}
									label="Currency"
									showTooltip={true}
									formatOptions={{ style: "currency", currency: "USD" }}
									tooltipValueFormatOptions={{
										style: "currency",
										currency: "USD",
									}}
									defaultValue={priceFilter}
									className="max-w-md"
									// value={priceFilter}
									onChange={setPriceFilter}
								/>
								<p>{priceFilter}</p>
							</CardBody>
						</Card>
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};

export default FilterBy;
