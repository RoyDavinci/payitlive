import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
	Grid,
	Box,
	Typography,
	MenuItem,
	Select,
	TextField,
	ListItemIcon,
	createTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { FaFilter } from "react-icons/fa";
import { ThemeProvider } from "styled-components";

// Mock data for transactions
const rows = [
	{
		id: 1,
		name: "John Doe",
		amount: 5000,
		type: "debit",
		transType: "airtime",
		recipient: "MTN",
		transactionId: "T001",
		status: "successful",
		date: "2024-07-26",
	},
	{
		id: 2,
		name: "Jane Smith",
		amount: 2000,
		type: "credit",
		transType: "data",
		recipient: "Airtel",
		transactionId: "T002",
		status: "pending",
		date: "2024-07-27",
	},
	{
		id: 3,
		name: "Michael Brown",
		amount: 3000,
		type: "debit",
		transType: "airtime",
		recipient: "Globacom",
		transactionId: "T003",
		status: "failed",
		date: "2024-07-28",
	},
	{
		id: 4,
		name: "Emily Davis",
		amount: 4500,
		type: "credit",
		transType: "data",
		recipient: "9mobile",
		transactionId: "T004",
		status: "successful",
		date: "2024-07-29",
	},
	// Add more mock data as needed
	{
		id: 5,
		name: "James Wilson",
		amount: 1200,
		type: "debit",
		transType: "airtime",
		recipient: "MTN",
		transactionId: "T005",
		status: "pending",
		date: "2024-07-30",
	},
	{
		id: 6,
		name: "Linda Moore",
		amount: 3300,
		type: "credit",
		transType: "data",
		recipient: "Airtel",
		transactionId: "T006",
		status: "failed",
		date: "2024-07-31",
	},
	{
		id: 7,
		name: "Robert Taylor",
		amount: 4000,
		type: "debit",
		transType: "airtime",
		recipient: "Globacom",
		transactionId: "T007",
		status: "successful",
		date: "2024-07-30",
	},
	{
		id: 8,
		name: "Sophia Johnson",
		amount: 2700,
		type: "credit",
		transType: "data",
		recipient: "9mobile",
		transactionId: "T008",
		status: "pending",
		date: "2024-07-31",
	},
];

const columns = [
	{ field: "name", headerName: "Name", width: 150 },
	{ field: "amount", headerName: "Amount", width: 130, type: "number" },
	{ field: "type", headerName: "Type", width: 120 },
	{ field: "transType", headerName: "Transaction Type", width: 150 },
	{ field: "recipient", headerName: "Recipient", width: 150 },
	{ field: "transactionId", headerName: "Transaction ID", width: 150 },
	{
		field: "status",
		headerName: "Status",
		width: 130,
		renderCell: (params) => (
			<Typography
				sx={{
					color:
						params.value === "successful"
							? "green"
							: params.value === "pending"
							? "orange"
							: "red",
					fontWeight: "bold",
				}}
			>
				{params.value.charAt(0).toUpperCase() + params.value.slice(1)}
			</Typography>
		),
	},
	{ field: "date", headerName: "Date", width: 150 },
];

const TransactionTable = () => {
	const [statusFilter, setStatusFilter] = React.useState("");
	const [typeFilter, setTypeFilter] = React.useState("");
	const [dateFilter, setDateFilter] = React.useState("");

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
			background: {
				default: "#1B1B1B",
			},
			text: {
				primary: "#ffffff",
			},
		},
		components: {
			MuiDataGrid: {
				styleOverrides: {
					root: {
						border: "none",
						backgroundColor: "#000000",
						color: "#ffffff",
					},
					columnHeaders: {
						backgroundColor: "#1a1a1a",
					},
					cell: {
						color: "#ffffff",
					},
					row: {
						"&.Mui-selected": {
							backgroundColor: "#333333",
						},
					},
				},
			},
		},
	});

	const handleStatusChange = (event) => {
		setStatusFilter(event.target.value);
	};

	const handleTypeChange = (event) => {
		setTypeFilter(event.target.value);
	};

	const handleDateChange = (event) => {
		setDateFilter(event.target.value);
	};

	const filteredRows = rows.filter((row) => {
		const matchesStatus = statusFilter ? row.status === statusFilter : true;
		const matchesType = typeFilter ? row.type === typeFilter : true;
		const matchesDate = dateFilter
			? dayjs(row.date).isSame(dayjs(dateFilter), "day")
			: true;

		return matchesStatus && matchesType && matchesDate;
	});

	return (
		<Box sx={{ width: "100%", backgroundColor: "#1B1B1B" }}>
			<div className='flex justify-between items-center p-4'>
				<div>
					<Typography variant='h6' gutterBottom sx={{ color: "#fff" }}>
						Recent Transactions
					</Typography>
					<p className='text-white'>See recent transactions done on payit</p>
				</div>
				<Box mb={2} display='flex' flexDirection='row' gap={2}>
					<Select
						value={statusFilter}
						onChange={handleStatusChange}
						displayEmpty
						inputProps={{ "aria-label": "Status" }}
						sx={{
							width: 150,
							height: 40,
							borderRadius: 2,
							backgroundColor: "#4A4A4A",
							color: "#ff",
							"& .MuiSelect-icon": {
								color: "#fff",
							},
						}}
					>
						<MenuItem value='' sx={{ color: "#ff" }}>
							<ListItemIcon>
								<FaFilter />
							</ListItemIcon>
							Filter
						</MenuItem>
						<MenuItem value='successful' sx={{ color: "#ff" }}>
							Successful
						</MenuItem>
						<MenuItem value='pending' sx={{ color: "#ff" }}>
							Pending
						</MenuItem>
						<MenuItem value='failed' sx={{ color: "#ff" }}>
							Failed
						</MenuItem>
					</Select>
					<div className='flex items-center justify-center bg-[#4A4A4A] text-white p-2 rounded-lg'>
						<button type='button'>Download</button>
					</div>
				</Box>
			</div>
			<DataGrid
				rows={filteredRows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5, 10, 20]}
				checkboxSelection
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
						backgroundColor: "#1B1B1B",
						color: "#fff",
						"--unstable_DataGrid-overlayBackground": "#1B1B1B !important",
					},
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor: "#1B1B1B",
						color: "#ffffff",
					},
					"& .MuiDataGrid-columnHeaderTitle": {
						color: "#ffffff",
					},
					"& .MuiDataGrid-cell": {
						backgroundColor: "#1B1B1B",
						color: "#ffffff",
						borderBottom: "none",
					},
					"& .MuiDataGrid-row": {
						backgroundColor: "#1B1B1B",
						"&:nth-of-type(even)": {
							backgroundColor: "#1a1a1a",
						},
						"&:hover": {
							backgroundColor: "#333333",
						},
					},
					"& .MuiCheckbox-root svg": {
						color: "#ffffff",
					},
				}}
				// style={{ backgroundColor: "#1B1B1B", color: "#fff" }}
				// sx={{ backgroundColor: "#ccc", border: "none", borderRadius: 10 }}
				// sx={{
				// 	backgroundColor: "#1B1B1B",
				// 	color: "#ffffff",
				// 	"& .MuiDataGrid-columnHeaders": {
				// 		backgroundColor: "#1B1B1B",
				// 		color: "#ffffff",
				// 	},
				// 	"& .MuiDataGrid-columnHeaderTitle": {
				// 		color: "#ffffff",
				// 	},
				// 	"& .MuiDataGrid-cell": {
				// 		color: "#ffffff",
				// 	},
				// 	"& .MuiDataGrid-row": {
				// 		"&.Mui-selected": {
				// 			backgroundColor: "#333333",
				// 		},
				// 		"&:hover": {
				// 			backgroundColor: "#1a1a1a",
				// 		},
				// 	},
				// 	"& .MuiCheckbox-root svg": {
				// 		color: "#ffffff",
				// 	},
				// }}
			/>
		</Box>
	);
};

export default TransactionTable;
