import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	FaEye,
	FaFilter,
	FaToggleOn,
	FaToggleOff,
	FaArrowUp,
	FaArrowDown,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Loading } from "./Loading";
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
import CloseIcon from "@mui/icons-material/Close";
import baseUrl from "../config/baseUrl";

export const Users = () => {
	const [form, setForm] = useState({
		userId: "",
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		status: "",
		userType: "",
	});

	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);

	const [users, setUsers] = useState([]);
	const [tempUsers, setTempUsers] = useState([]);

	const [showModal, setShowModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user

	const handleViewDetails = (user) => {
		setSelectedUser(user); // Set the selected user
		setShowModal(true); // Show the modal
	};
	const handleClose = () => {
		setShowModal(false); // Close the modal
		setSelectedUser(null); // Clear the selected user
	};

	const toggleStatus = (userId) => {
		setUsers((prevUsers) =>
			prevUsers.map((user) =>
				user.userId === userId
					? {
							...user,
							status: user.status === "Active" ? "Inactive" : "Active",
					  }
					: user
			)
		);
	};

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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });

		if (name === "username") {
			// Filter users based on the username
			const filteredUsers = tempUsers.filter((user) =>
				user?.fullName.toLowerCase().includes(value.toLowerCase())
			);
			setUsers(filteredUsers);
		}
	};
	const getUsers = async () => {
		setLoading(true);
		const token = localStorage.getItem("payittoken");

		try {
			// Step 1: Fetch all users
			const { data } = await axios.get(`${baseUrl.staging}customer/all`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const customers = data.customers;
			// setUsers(customers); // Set users data

			// Step 2: Fetch account data for each user using their customerId
			const userAccounts = await Promise.all(
				customers.map(async (user) => {
					const accountData = await getUserAccounts(user.customerId, token);
					return {
						...user,
						accounts: accountData,
					};
				})
			);

			setUsers(userAccounts); // Set the users data along with accounts
			setTempUsers(userAccounts);
			toast.success("Users and account data retrieved successfully!");
			setLoading(false);
		} catch (error) {
			handleErrors(error);
		} finally {
			setLoading(false);
		}
	};

	// Function to fetch user account data by customerId
	const getUserAccounts = async (customerId, token) => {
		try {
			const { data } = await axios.get(
				`${baseUrl.staging}customer/${customerId}/accounts`,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			return data; // Returns account array
		} catch (error) {
			console.error(
				`Failed to fetch accounts for customerId: ${customerId}`,
				error
			);
			return []; // Return an empty array if there's an error
		}
	};

	const getPrimaryWallet = (data) => {
		const account = data.find((item) => item.isPrimary === true);

		return account.balance;
	};

	const handleErrors = (error) => {
		if (!error.response) {
			toast.error("Network error: Unable to connect to the server.");
		} else if (error.response.status === 401) {
			toast.error("Unauthorized: Please login again.");
			localStorage.clear();
			navigate("/login");
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
	};

	console.log(users);

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className='p-4 h-screen flex flex-col'>
					<div className='flex justify-end my-4'>
						<Link
							to='/create-user'
							className='bg-[#868150] text-white p-2 rounded'
						>
							Create New Admin
						</Link>
					</div>
					<h1 className='text-white mb-6'>Filter Users</h1>
					<form className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4'>
						{/* Username Filter */}
						<div>
							<label className='text-white mb-4 block'>Username</label>
							<input
								type='text'
								name='username'
								value={form.username}
								onChange={handleChange}
								placeholder='Enter username'
								className='w-full p-2 border rounded'
							/>
						</div>

						{/* Other filters remain unchanged */}
						<div>
							<label className='text-white mb-4 block'>User Type</label>
							<select
								name='userType'
								value={form.userType}
								onChange={handleChange}
								className='w-full p-2 border rounded'
							>
								<option value=''>Select User Type</option>
								<option value='Regular'>Regular</option>
								<option value='Premium'>Premium</option>
								<option value='VIP'>VIP</option>
							</select>
						</div>

						<div>
							<FaFilter className='text-gray-600 mb-4' size={20} />
							<button className='w-full p-2 border rounded bg-[#868150] text-white'>
								Filter
							</button>
						</div>
					</form>

					{users.length > 0 ? (
						<div className='flex-1 overflow-auto no-scrollbar'>
							<h2 className='text-white mb-6'>User Table</h2>
							<div className='bg-[#1b1b1b] text-white rounded-lg'>
								<div className='overflow-y-auto max-h-96 no-scrollbar'>
									{" "}
									{/* Set max height for scrolling */}
									<table className='min-w-full bg-[#1b1b1b] no-scrollbar'>
										<thead className='sticky top-0 bg-[#222222] z-10 no-scrollbar'>
											<tr>
												<th className='py-2 px-4 text-center font-normal text-[14px] whitespace-nowrap'>
													Registration Date
												</th>
												<th className='py-2 px-4 text-center font-normal text-[14px] whitespace-nowrap'>
													First Name
												</th>
												<th className='py-2 px-4 text-center font-normal text-[14px] whitespace-nowrap'>
													Last Name
												</th>
												<th className='py-2 px-4 text-center font-normal text-[14px] whitespace-nowrap'>
													Email
												</th>
												<th className='py-2 px-4 text-center font-normal text-[14px] whitespace-nowrap'>
													Phone
												</th>
												<th className='py-2 px-4 text-center font-normal text-[14px] whitespace-nowrap'>
													Balance
												</th>
												<th className='py-2 px-4 text-center font-normal text-[14px] whitespace-nowrap'>
													User Tier
												</th>
												<th className='py-2 px-4 text-center font-normal text-[14px] whitespace-nowrap'>
													More
												</th>
												<th className='py-2 px-4 text-center font-normal text-[14px] whitespace-nowrap'>
													Action
												</th>
											</tr>
										</thead>
										<tbody className='no-scrollbar'>
											{users.map((row, index) => {
												const balance = getPrimaryWallet(row.accounts);
												return (
													<tr
														key={index}
														className='hover:bg-gray-800 border-b border-[#2b2b2b]'
													>
														<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
															{handleDateTime(row.createdAt)}
														</td>
														<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
															{row?.firstName}
														</td>
														<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
															{row?.lastName}
														</td>
														<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
															{row?.email}
														</td>
														<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
															{row?.phone}
														</td>
														<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
															₦ {Intl.NumberFormat().format(Number(balance))}
														</td>
														<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
															{row?.currentTier?.name}
														</td>
														<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
															<FaEye
																className='cursor-pointer'
																onClick={() => handleViewDetails(row)}
															/>
														</td>
														<td className='py-4 px-4 text-center text-[#6C6C6C] whitespace-nowrap'>
															<div className='flex justify-center'>
																<button className='bg-[#868150] text-white px-4 py-2 rounded-lg'>
																	<Link to={`/user-status/${row.customerId}`}>
																		Manage Account
																	</Link>
																</button>
															</div>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					) : (
						<>
							<div className='flex justify-center items-center h-screen'>
								<h1 className='font-bold text-2xl flex justify-center items-center text-center text-white'>
									No Customers at this point
								</h1>
							</div>
						</>
					)}
					{/* Dialog for User Details */}
					<Dialog
						open={showModal}
						onClose={handleClose}
						maxWidth='sm'
						fullWidth
						sx={{
							"& .MuiDialog-paper": {
								backgroundColor: "#1b1b1b", // Adjust this to match your company's background color
								color: "#fff", // Text color
							},
						}}
					>
						<DialogTitle
							sx={{
								bgcolor: "#333", // Adjust this to match your company's secondary color
								color: "#fff",
								fontWeight: "bold",
								fontSize: "1.25rem",
							}}
						>
							User Details
							<IconButton
								aria-label='close'
								onClick={handleClose}
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
						<DialogContent
							dividers
							sx={{
								backgroundColor: "#1b1b1b", // Match this with the dialog background
								padding: "16px",
							}}
						>
							{selectedUser ? (
								<div>
									<TableContainer component={Paper}>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>
														<Typography variant='h6'>Name</Typography>
													</TableCell>
													<TableCell>
														<Typography variant='h6'>Balance</Typography>
													</TableCell>
													<TableCell>
														<Typography variant='h6'>Ledger Balance</Typography>
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{selectedUser.accounts.map((row, index) => (
													<TableRow key={index}>
														<TableCell>
															<Typography variant='body1'>{row.tag}</Typography>
														</TableCell>
														<TableCell>
															<Typography variant='body1'>
																₦{" "}
																{Intl.NumberFormat().format(
																	Number(row.balance)
																)}
															</Typography>
														</TableCell>
														<TableCell>
															<Typography variant='body1'>
																₦{" "}
																{Intl.NumberFormat().format(row.ledgerBalance)}
															</Typography>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								</div>
							) : (
								<Typography variant='body2'>No User Selected</Typography>
							)}
						</DialogContent>
					</Dialog>
					<ToastContainer />
				</div>
			)}
		</>
	);
};
