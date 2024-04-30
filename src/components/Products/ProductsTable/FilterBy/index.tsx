import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filteredProductsState } from "../../../../states/filteredProductsState";
import { IProduct } from "../../../../models/IProduct";
import {
	Card,
	CardBody,
	Checkbox,
	CheckboxGroup,
	Slider,
	Tab,
	Tabs,
} from "@nextui-org/react";

const FilterBy = ({ unmutableProdList }: { unmutableProdList: IProduct[] }) => {
	const [, setFilteredList] = useRecoilState(filteredProductsState);
	const [inputValue, setInputValue] = useState("");
	const [priceFilter, setPriceFilter] = useState(0);

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
			});

		if (categories.length === 5 && inputValue === "") {
			filteredData = unmutableProdList;
		}
		setFilteredList(filteredData);
	}, [categories, inputValue]);

	return (
		<div className="wrapper">
			<div>
				<p>Filter by:</p>
			</div>

			<div className="flex w-full flex-col">
				<Tabs aria-label="Options">
					<Tab key="Product" title="Product Name">
						<Card>
							<CardBody>
								<div>
									<input
										type="text"
										value={inputValue}
										onChange={handleInputChange}
										placeholder="Type something..."
									/>
									{/* Display the value */}
									<p>Input value: {inputValue}</p>
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
									label="Currency"
									showTooltip={true}
									formatOptions={{ style: "currency", currency: "USD" }}
									tooltipValueFormatOptions={{
										style: "currency",
										currency: "USD",
									}}
									defaultValue={10}
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
