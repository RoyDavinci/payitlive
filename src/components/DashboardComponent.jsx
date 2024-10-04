import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import DashboardGrid from "./DashboardGrid";
import DashboardCharts from "./Chart";
import TransactionTable from "./Table";
import { BootstrapTable } from "./BootstrapTable";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import baseUrl from "../config/baseUrl";

export const DashboardComponent = () => {
	const [showDateInput, setShowDateInput] = useState(false);
	const [userId, setUserId] = useState(""); // For user ID input
	const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
	const [transactions, setTransactions] = useState([]); // For transaction data
	const [loading, setLoading] = useState(false); // Loading state
	const navigate = useNavigate(); // Initialize navigate
	const [from, setFrom] = useState(""); // For start date
	const [to, setTo] = useState(""); // For end date
	const [users, setUsers] = useState([]);

	const handleToggleDateInput = () => {
		setShowDateInput(!showDateInput);
	};

	const fetchUsersAndTransactions = async () => {
		setLoading(true);
		const token = localStorage.getItem("payittoken");

		const usersUrl = `${baseUrl.staging}customer/all`;
		const transactionsUrl = `${baseUrl.staging}customer/customers/all-transactions?startDate=${date}&endDate=${date}`;

		try {
			// Make both API calls simultaneously
			const [usersResponse, transactionsResponse] = await Promise.all([
				axios.get(usersUrl, {
					headers: { Authorization: `Bearer ${token}` },
				}),
				axios.get(transactionsUrl, {
					headers: { Authorization: `Bearer ${token}` },
				}),
			]);

			// Set users and transactions state from the responses
			const customers = usersResponse.data.customers;
			const transactions = transactionsResponse.data.transactions;

			setUsers(customers);
			setTransactions(transactions);

			toast.success("Users and transactions retrieved successfully!");
		} catch (error) {
			// Handle errors
			if (!error.response) {
				toast.error("Network error: Unable to connect to the server.");
			} else if (error.response.status === 401) {
				toast.error("Unauthorized: Please login again.");
				localStorage.clear();
				navigate("/login"); // Redirect to login
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
	console.log(users);

	useEffect(() => {
		fetchUsersAndTransactions();
	}, []);
	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<>
					<div className='flex lg:justify-between md:flex-col lg:flex-row items-center mt-8 bg-[#000] p-4'>
						<div className='mb-4 lg:mb-0'>
							<h3 className='mb-1 text-white font-normal text-[25px]'>
								Good morning, George
							</h3>
							<p className='text-[#6C6C6C]'>
								Here is a summary of your transactions
							</p>
						</div>
						<div>
							<div className='flex items-center space-x-2 py-3 px-6 border border-[#FEF48B] rounded-md bg-[#000] shadow'>
								{/* <div className='flex justify-between items-center px-4 py-2 rounded-md text-white'> */}
								<FaFilter color='#FEF48B' />
								<p className='ml-6 text-white'>Filter By Date</p>
							</div>
						</div>
					</div>
					<DashboardGrid users={users} transactions={transactions} />
					<DashboardCharts data={transactions} />
					{/* <TransactionTable /> */}
					<BootstrapTable transactions={transactions} />
				</>
			)}
		</div>
	);
};
