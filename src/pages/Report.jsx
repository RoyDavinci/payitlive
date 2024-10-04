import React, { useState } from "react";
import {
	TextField,
	Button,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
} from "@mui/material";
import dayjs from "dayjs";

// Mock data
const walletData = [
	{
		id: 1,
		date: "2024-08-01",
		amount: 1000,
		currency: "USD",
		walletCode: "WC001",
		balanceAfter: 1500,
		commission: 50,
		requestId: "REQ001",
	},
	{
		id: 2,
		date: "2024-08-02",
		amount: 1200,
		currency: "USD",
		walletCode: "WC002",
		balanceAfter: 1800,
		commission: 60,
		requestId: "REQ002",
	},
	{
		id: 3,
		date: "2024-08-03",
		amount: 800,
		currency: "USD",
		walletCode: "WC003",
		balanceAfter: 1300,
		commission: 40,
		requestId: "REQ003",
	},
	{
		id: 4,
		date: "2024-08-04",
		amount: 1500,
		currency: "USD",
		walletCode: "WC004",
		balanceAfter: 2000,
		commission: 75,
		requestId: "REQ004",
	},
	{
		id: 5,
		date: "2024-08-05",
		amount: 2000,
		currency: "USD",
		walletCode: "WC005",
		balanceAfter: 2500,
		commission: 100,
		requestId: "REQ005",
	},
	{
		id: 6,
		date: "2024-08-06",
		amount: 500,
		currency: "USD",
		walletCode: "WC006",
		balanceAfter: 1000,
		commission: 25,
		requestId: "REQ006",
	},
	{
		id: 7,
		date: "2024-08-07",
		amount: 600,
		currency: "USD",
		walletCode: "WC007",
		balanceAfter: 1200,
		commission: 30,
		requestId: "REQ007",
	},
	{
		id: 8,
		date: "2024-08-08",
		amount: 1100,
		currency: "USD",
		walletCode: "WC008",
		balanceAfter: 1600,
		commission: 55,
		requestId: "REQ008",
	},
	{
		id: 9,
		date: "2024-08-09",
		amount: 1300,
		currency: "USD",
		walletCode: "WC009",
		balanceAfter: 1700,
		commission: 65,
		requestId: "REQ009",
	},
	{
		id: 10,
		date: "2024-08-10",
		amount: 1400,
		currency: "USD",
		walletCode: "WC010",
		balanceAfter: 1900,
		commission: 70,
		requestId: "REQ010",
	},
];

const transactionData = [
	{
		id: 1,
		date: "2024-08-01",
		transactionRef: "TXN001",
		amount: 250,
		walletId: "WC001",
		production: "ProdA",
	},
	{
		id: 2,
		date: "2024-08-02",
		transactionRef: "TXN002",
		amount: 500,
		walletId: "WC002",
		production: "ProdB",
	},
	{
		id: 3,
		date: "2024-08-03",
		transactionRef: "TXN003",
		amount: 100,
		walletId: "WC003",
		production: "ProdC",
	},
	{
		id: 4,
		date: "2024-08-04",
		transactionRef: "TXN004",
		amount: 750,
		walletId: "WC004",
		production: "ProdD",
	},
	{
		id: 5,
		date: "2024-08-05",
		transactionRef: "TXN005",
		amount: 400,
		walletId: "WC005",
		production: "ProdE",
	},
	{
		id: 6,
		date: "2024-08-06",
		transactionRef: "TXN006",
		amount: 300,
		walletId: "WC006",
		production: "ProdF",
	},
	{
		id: 7,
		date: "2024-08-07",
		transactionRef: "TXN007",
		amount: 650,
		walletId: "WC007",
		production: "ProdG",
	},
	{
		id: 8,
		date: "2024-08-08",
		transactionRef: "TXN008",
		amount: 850,
		walletId: "WC008",
		production: "ProdH",
	},
	{
		id: 9,
		date: "2024-08-09",
		transactionRef: "TXN009",
		amount: 1200,
		walletId: "WC009",
		production: "ProdI",
	},
	{
		id: 10,
		date: "2024-08-10",
		transactionRef: "TXN010",
		amount: 900,
		walletId: "WC010",
		production: "ProdJ",
	},
];

const ReportComponent = () => {
	const [reportType, setReportType] = useState("wallet");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	const handleFilter = () => {
		let data = reportType === "wallet" ? walletData : transactionData;
		if (startDate && endDate) {
			data = data.filter((item) =>
				dayjs(item.date).isBetween(startDate, endDate, null, "[]")
			);
		}
		setFilteredData(data);
	};

	return (
		<div className='h-screen overflow-auto p-4 bg-gray-900'>
			<FormControl fullWidth className='mb-4'>
				<InputLabel sx={{ color: "#fff" }} className='text-white'>
					Report Type
				</InputLabel>
				<Select
					value={reportType}
					onChange={(e) => setReportType(e.target.value)}
					className='bg-gray-800 text-white'
				>
					<MenuItem sx={{ color: "#fff" }} value='wallet'>
						Wallet Report
					</MenuItem>
					<MenuItem sx={{ color: "#fff" }} value='transaction'>
						Transaction Report
					</MenuItem>
				</Select>
			</FormControl>

			<div className='flex items-center mb-4'>
				<TextField
					type='date'
					label='Start Date'
					InputLabelProps={{ shrink: true }}
					className='mr-4'
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
				<TextField
					type='date'
					label='End Date'
					InputLabelProps={{ shrink: true }}
					className='mr-4'
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>
				<Button variant='contained' onClick={handleFilter}>
					Filter
				</Button>
			</div>

			{filteredData.length > 0 && (
				<div className='bg-gray-800 p-4 rounded overflow-auto'>
					<table className='w-full text-white'>
						<thead>
							<tr>
								{reportType === "wallet" ? (
									<>
										<th>ID</th>
										<th>Date</th>
										<th>Amount</th>
										<th>Currency</th>
										<th>Wallet Code</th>
										<th>Balance After</th>
										<th>Commission</th>
										<th>Request ID</th>
									</>
								) : (
									<>
										<th>ID</th>
										<th>Date</th>
										<th>Transaction Ref</th>
										<th>Amount</th>
										<th>Wallet ID</th>
										<th>Production</th>
									</>
								)}
							</tr>
						</thead>
						<tbody>
							{filteredData.map((item) => (
								<tr key={item.id}>
									{reportType === "wallet" ? (
										<>
											<td>{item.id}</td>
											<td>{item.date}</td>
											<td>{item.amount}</td>
											<td>{item.currency}</td>
											<td>{item.walletCode}</td>
											<td>{item.balanceAfter}</td>
											<td>{item.commission}</td>
											<td>{item.requestId}</td>
										</>
									) : (
										<>
											<td>{item.id}</td>
											<td>{item.date}</td>
											<td>{item.transactionRef}</td>
											<td>{item.amount}</td>
											<td>{item.walletId}</td>
											<td>{item.production}</td>
										</>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default ReportComponent;
