// import { Box, ListItemIcon, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
	FaEye,
	FaFilter,
	FaToggleOn,
	FaToggleOff,
	FaArrowUp,
	FaArrowDown,
} from "react-icons/fa";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const BootstrapTable = ({ transactions }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const [statusFilter, setStatusFilter] = React.useState("");
	const [typeFilter, setTypeFilter] = React.useState("");
	const [dateFilter, setDateFilter] = React.useState("");
	const pageSize = 10;
	const startIndex = (currentPage - 1) * pageSize;

	// const [selectedData, setSelectedData] = useState(
	// 	data.slice(startIndex, startIndex + pageSize)
	// );

	const [datum, setDatum] = useState(transactions);
	const [showTransactionModal, setShowTransactionModal] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState(null);

	const handleViewTransactionDetails = (transaction) => {
		setSelectedTransaction(transaction);
		setShowTransactionModal(true);
	};

	const handleCloseTransactionModal = () => {
		setShowTransactionModal(false);
		setSelectedTransaction(null);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	// console.log("datum", datum);

	// const selectedData = ;

	const totalPages = Math.ceil(datum.length / pageSize);
	const columns = [
		"Date Initiated",
		"Date Completed",
		"TransType",
		"Type",
		"Customer Name",
		"Amount",
		"Status",
		"Provider",
		"Reference",
		"View More",
	];
	// const handleStatusChange = (event) => {
	// 	const { name, value } = event.target;
	// 	console.log(value);
	// 	if (value.length > 1 || value != "") {
	// 		const items = data.filter((item) => item.status === value);
	// 		setSelectedData(items.slice(startIndex, startIndex + pageSize));
	// 	} else {
	// 		setSelectedData(data.slice(startIndex, startIndex + pageSize));
	// 	}
	// };

	const handleDateTime = (dateTimeString) => {
		const dateTime = new Date(dateTimeString);

		// Format the date as 'YYYY-MM-DD'
		const date = dateTime.toISOString().split("T")[0];

		// Format the time as 'HH:MM:SS'
		const time = dateTime.toISOString().split("T")[1].split(".")[0];

		// Combine date and time
		const formattedDateTime = `${date} ${time}`;
		return formattedDateTime;
	};

	const handleTypeChange = (event) => {
		setTypeFilter(event.target.value);
	};

	const handleDateChange = (event) => {
		setDateFilter(event.target.value);
	};

	// const filteredRows = data.filter((row) => {});

	// useEffect(() => {handleSe}, [])

	useEffect(() => {
		// setDatum(transactions.slice(startIndex, startIndex + pageSize));
		const paginatedData = transactions.slice(startIndex, startIndex + pageSize);
		setDatum(paginatedData);
		// setDatum(transactions);
	}, [startIndex, pageSize, transactions]);
	return (
		<div className='table-container bg-[#1b1b1b] p-4 rounded-[30px] overflow-auto'>
			<div className='flex lg:justify-between flex-col lg:flex-row items-center p-4'>
				<div className='mb-4 lg:mb-0'>
					<Typography
						variant='h6'
						gutterBottom
						sx={{ color: "#fff", fontSize: "16px" }}
					>
						Recent Transactions
					</Typography>
					<p className='text-[#6C6C6C]'>
						See recent transactions done on payit
					</p>
				</div>
				<Box mb={2} display='flex' flexDirection='row' gap={2}>
					<div className='flex justify-between items-center px-4 py-2 bg-[#4A4A4A] rounded-xl text-white'>
						<FaFilter color='#FEF48B' />
						<p className='ml-4 text-sm'>Filter</p>
					</div>
					<div className='flex items-center justify-center bg-[#4A4A4A] text-sm text-white py-2 px-4 rounded-xl'>
						<button type='button'>Download</button>
					</div>
				</Box>
			</div>
			<div className='flex-1 overflow-auto no-scrollbar'>
				<table className='table-auto bg-[#1b1b1b] text-white w-full'>
					<thead className='bg-[#222222]'>
						<tr>
							{columns.map((column) => (
								<th
									key={column}
									className='py-2 px-4 text-center font-normal text-[14px] whitespace-nowrap'
								>
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{transactions
							.sort((a, b) => {
								const dateA = new Date(a.dateInitiated);
								const dateB = new Date(b.dateInitiated);
								return dateB - dateA;
							})
							.map((row, index) => (
								<tr
									key={index}
									className='hover:bg-gray-800 border-b border-[#2b2b2b] last:border-b-0'
								>
									<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
										{handleDateTime(row.dateInitiated)}
									</td>
									<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
										{handleDateTime(row.dateCompleted)}
									</td>

									<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
										{row.transactionType}
									</td>
									<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
										{row.type}
									</td>
									<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
										George
									</td>
									<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
										{row.amount}
									</td>
									<td
										className={`${
											row.status === "processed"
												? "text-[#A8E78E] rounded-lg p-2 flex justify-center items-center bg-[#464D42]"
												: row.status === "failed"
												? "text-red-300 bg-red-900 p-2 flex justify-center items-center rounded-lg"
												: row.status === "pending"
												? "text-gray-300 bg-gray-900 p-2 flex justify-center items-center rounded-lg"
												: "text-gray-300 bg-gray-900 p-2 flex justify-center items-center rounded-lg"
										} whitespace-nowrap`}
									>
										{row.status === "processed" ? "successful" : row.status}{" "}
									</td>
									<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
										{row.transactionType === "funding_wallet"
											? "PayIT Account"
											: row.provider.providerName}
									</td>

									<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
										{row.transactionId}
									</td>

									<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
										<div className='text-center justify-center items-center flex'>
											<FaEye
												className='cursor-pointer '
												onClick={() => handleViewTransactionDetails(row)}
											/>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			<div className='flex justify-center mt-4'>
				{[...Array(totalPages).keys()].map((page) => (
					<button
						key={page + 1}
						className={`px-3 py-1 mx-1 rounded ${
							page + 1 === currentPage
								? "bg-[#FEF48B] text-[#666666]"
								: "bg-[#666666] text-white"
						}`}
						onClick={() => handlePageChange(page + 1)}
					>
						{page + 1}
					</button>
				))}
			</div>
			<Dialog
				open={showTransactionModal}
				onClose={handleCloseTransactionModal}
				maxWidth='sm'
				fullWidth
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: "#fff", // Set background to white
						color: "#000", // Set text color to black
					},
				}}
			>
				<DialogTitle
					sx={{
						bgcolor: "#f0f0f0", // Adjust this to match your company's secondary color
						color: "#000",
						fontWeight: "bold",
						fontSize: "1.25rem",
					}}
				>
					Transaction Details
					<IconButton
						aria-label='close'
						onClick={handleCloseTransactionModal}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers sx={{ padding: "16px" }}>
					{selectedTransaction ? (
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>
											<Typography variant='h6'>Field</Typography>
										</TableCell>
										<TableCell>
											<Typography variant='h6'>Value</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>Transaction ID</TableCell>
										<TableCell>{selectedTransaction.transactionId}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Reference</TableCell>
										<TableCell>{selectedTransaction.reference}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Amount</TableCell>
										<TableCell>
											₦{" "}
											{Intl.NumberFormat().format(
												Number(selectedTransaction.amount)
											)}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Status</TableCell>
										<TableCell>{selectedTransaction.status}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Type</TableCell>
										<TableCell>{selectedTransaction.type}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Date Initiated</TableCell>
										<TableCell>
											{new Date(
												selectedTransaction.dateInitiated
											).toLocaleString()}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Date Completed</TableCell>
										<TableCell>
											{new Date(
												selectedTransaction.dateCompleted
											).toLocaleString()}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Description</TableCell>
										<TableCell>{selectedTransaction.description}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Provider</TableCell>
										<TableCell>
											{selectedTransaction.provider &&
											selectedTransaction.provider.providerName &&
											selectedTransaction.transactionType !==
												"funding_wallet" ? (
												<div className='flex items-center gap-4'>
													<p>{selectedTransaction.provider.providerName}</p>
													<img
														src={selectedTransaction.provider.providerPhotoUrl}
														alt={selectedTransaction.provider.providerName}
														className='w-16 h-16'
													/>
												</div>
											) : (
												"PayIT Settlement Account"
											)}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					) : (
						<Typography variant='body2'>No Transaction Selected</Typography>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};
