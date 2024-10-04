import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// Import a loading spinner component
import { Loading } from "../components/Loading";
import baseUrl from "../config/baseUrl";
import CloseIcon from "@mui/icons-material/Close";
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
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

const UserTransaction = () => {
	const [userId, setUserId] = useState(""); // For user ID input
	const [transactions, setTransactions] = useState([]); // For transaction data
	const [loading, setLoading] = useState(false); // Loading state
	const navigate = useNavigate(); // Initialize navigate
	const [from, setFrom] = useState(""); // For start date
	const [to, setTo] = useState(""); // For end date
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

	// Function to fetch transactions based on user ID
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
	const getTransactions = async () => {
		if (!userId) {
			toast.error("Please enter a valid user ID.");
			return;
		}
		if (from && to && new Date(from) > new Date(to)) {
			toast.error("The start date cannot be later than the end date.");
			return;
		}

		setLoading(true);
		const token = localStorage.getItem("payittoken");

		let url = "";
		if (from && to) {
			// Build URL with from and to date filters
			url = `https://staging.payit.com.ng/administrator/transactions?from=${from}&to=${to}`;
		} else if (userId) {
			// Build URL with userId filter
			url = `https://staging.payit.com.ng/customer/customers/all-transactions?startDate=${from}&endDate=${to}`;
		} else {
			// If no filters are provided, show an error
			toast.error("Please provide a User ID or a date range.");
			setLoading(false);
			return;
		}
		const id = userId.trim();
		try {
			const { data } = await axios.get(
				`${baseUrl.staging}customer/${id}/transactions`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			console.log(data);
			setTransactions(data.transactions); // Set transaction data in state
			toast.success("Transactions retrieved successfully!");
		} catch (error) {
			if (!error.response) {
				toast.error("Network error: Unable to connect to the server.");
			} else if (error.response.status === 401) {
				toast.error("Unauthorized: Please login again.");
				localStorage.clear();
				navigate("/login"); // Use navigate to redirect to the login page
			} else if (error.response.status === 403) {
				toast.error(
					"Forbidden: You do not have permission to access this resource."
				);
			} else if (error.response.status >= 400 && error.response.status < 500) {
				toast.error(
					`Client Error: ${error.response.data.message || "An error occurred."}`
				);
			} else if (error.response.status >= 500) {
				toast.error(
					"Server Error: Something went wrong. Please try again later."
				);
			} else {
				toast.error("An unexpected error occurred. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='p-4 h-screen flex flex-col'>
			{/* Input Form */}
			<div className='flex  flex-col justify-center items-center mt-16'>
				<h2 className='text-xl font-bold mb-4'>Fetch User Transactions</h2>
				<div className='flex justify-between items-center gap-4'>
					<input
						type='text'
						placeholder='Enter User ID'
						className='border p-2 rounded w-full '
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
					/>
					<input
						type='date'
						value={from}
						className='border p-2 rounded'
						onChange={(e) => setFrom(e.target.value)}
						placeholder='YYYY-MM-DD'
					/>
					<input
						type='date'
						value={to}
						className='border p-2 rounded'
						onChange={(e) => setTo(e.target.value)}
						placeholder='YYYY-MM-DD'
					/>
				</div>
				<button
					className='bg-[#868150] text-white px-4 py-2 rounded my-8 hover:bg-[#868150]'
					onClick={getTransactions}
					disabled={loading}
				>
					{loading ? "Loading..." : "Get Transactions"}
				</button>
			</div>

			{/* Loading Component */}
			{loading && (
				<div className='flex justify-center items-center w-full'>
					<Loading /> {/* Show the loading spinner while fetching data */}
				</div>
			)}

			{/* Display Transactions in a Table */}
			{!loading && transactions.length > 0 ? (
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
							{transactions.map((row, index) => (
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
										{row.status === "processed" ? "successful" : row.status}
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
			) : (
				!loading && (
					<div className='mt-8 text-gray-500 flex justify-center items-center'>
						No transactions found kindly insert a User ID and filter
					</div>
				)
			)}
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

export default UserTransaction;
