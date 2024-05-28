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
import OrderDetails from "../OrderDetails";
import { orderDetailState } from "../../states/orderDetailState";
import { useRecoilState } from "recoil";

export interface tableData {
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
	// const [detailOrder, setDetailOrder] = useState<tableData | null>(null);
	const [detailOrder, setDetailOrder] = useRecoilState(orderDetailState);
	const { fetchIsAdmin } = useUserDetails();
	const { getUserOrders, getAllOrders } = useOrderManage();
	const [orders, setOrders] = useState<tableData[]>([]);

	const fetchData = async () => {
		const isAdmin = await fetchIsAdmin();
		if (isAdmin) {
			// Make API request for admin
			getAllOrders().then((data) => {
				const tempOrders: tableData[] = [];
				data.forEach((element: IOrder, i: number) => {
					tempOrders.push({
						id: i,
						orderNum: element.id,
						total: "$" + element.totalAmount,
						items: element.totalItemsAmount,
						status: element.orderStatus,
						action: "view",
						purchaseDate: element.creationDate,
					});
				});
				setOrders(tempOrders);
			});
		} else {
			getUserOrders().then((data) => {
				const tempOrders: tableData[] = [];
				data.forEach((element: IOrder, i: number) => {
					tempOrders.push({
						id: i,
						orderNum: element.id,
						total: "$" + element.totalAmount,
						items: element.totalItemsAmount,
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
		fetchData();
	}, [[], detailOrder]);

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
		const cellValue = data[columnKey];

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
						More details
					</Button>
				);

			default:
				return cellValue;
		}
	}, []);

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

			{null !== detailOrder && <OrderDetails />}
		</div>
	);
};

export default OrderTable;
