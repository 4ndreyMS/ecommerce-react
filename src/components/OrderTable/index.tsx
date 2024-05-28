import {
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useUserDetails } from "../../service/hooks/useUserDetails";
import { useOrderManage } from "../../service/hooks/useOrderManage";
import { IOrder } from "../../models/IOrder";
import { Key } from "@react-types/shared";

interface tableData {
	id: number;
	orderNum: number;
	total: string;
	items: number;
	status: string;
	action: string;
	purchaseDate: string;
	[key: string]: number | string;
}

const OrderTable = () => {
	const [detailOrder, setDetailOrder] = useState<tableData | null>(null);
	const { fetchIsAdmin } = useUserDetails();
	const { getUserOrders } = useOrderManage();
	const [orders, setOrders] = useState<tableData[]>([]);

	const fetchData = async () => {
		const isAdmin = await fetchIsAdmin();
		if (isAdmin) {
			// Make API request for admin
		} else {
			getUserOrders().then((data) => {
				const tempOrders: tableData[] = [];
				data.forEach((element: IOrder, i: number) => {
					tempOrders.push({
						id: i,
						orderNum: element.id,
						total: "$" + element.totalAmount,
						items: 0,
						status: element.orderStatus,
						action: "view",
						purchaseDate: element.creationDate,
					});
				});
				setOrders(tempOrders);
			});
			// Make API request for non-admin
		}
	};
	useEffect(() => {
		console.log("executed");
		fetchData();
	}, []);

	const columns = [
		{
			key: "orderNum",
			label: "Order #",
		},
		{
			key: "purchaseDate",
			label: "Purchase date",
		},
		{
			key: "total",
			label: "Total",
		},
		{
			key: "items",
			label: "Items",
		},
		{
			key: "status",
			label: "Status",
		},
		{
			key: "action",
			label: "Action",
		},
	];
	const statusColorMap = {
		CONFIRMED: "success",
		CANCELED: "danger",
		PENDING: "warning",
	};
	const renderCell = React.useCallback((data: tableData, columnKey: Key) => {
		console.log(data, columnKey);
		const cellValue = data[columnKey];
		console.log("cellValue", cellValue);

		switch (columnKey) {
			case "status":
				return (
					<Chip
						radius="none"
						className="text-[black]"
						color={statusColorMap[data.status]}
						size="sm"
						variant="flat"
					>
						{cellValue.toString().charAt(0).toUpperCase() +
							cellValue.toString().slice(1).toLowerCase()}
					</Chip>
				);

			case "action":
				return (
					<Button
						className="button-unfilled"
						radius="none"
						onClick={() => {
							setDetailOrder(data);
						}}
						size="sm"
					>
						view
					</Button>
				);

			default:
				return cellValue;
		}
	}, []);

	console.log(orders.length);

	return (
		<div>
			{null === detailOrder && (
				<Table aria-label="Orders table" radius="none">
					<TableHeader>
						{columns.map((column) => (
							<TableColumn key={column.key}>{column.label}</TableColumn>
						))}
					</TableHeader>

					{orders.length < 1 ? (
						<TableBody emptyContent={"No orders to display."}>{[]}</TableBody>
					) : (
						<TableBody items={orders}>
							{(item) => (
								<TableRow key={item.id}>
									{(columnKey) => (
										<TableCell>{renderCell(item, columnKey)}</TableCell>
									)}
								</TableRow>
							)}
						</TableBody>
					)}
				</Table>
			)}

			{null !== detailOrder && (
				<div>
					<Button
						size="sm"
						onClick={() => {
							setDetailOrder(null);
						}}
					>
						Back
					</Button>
					Selected item {detailOrder.id}
				</div>
			)}
		</div>
	);
};

export default OrderTable;
