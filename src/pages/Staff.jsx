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
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "../components/Loading";

const UserManagement = () => {
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		userId: "",
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		status: "",
		userType: "", // Added for filtering by tier
	});
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const [users, setUsers] = useState([]);

	const navigate = useNavigate();

	const toggleStatus = async (userId, isActive) => {
		const token = localStorage.getItem("payittoken");

		if (!isActive) {
			toast.info("This user is already inactive.");
			return; // Stop execution if the user is inactive
		}

		try {
			const { data } = await axios.put(
				`https://staging.payit.com.ng/administrator/user/${userId}/disable`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			// setUsers(data.users); // Set the users data
			console.log(data);
			toast.success("Staffs retrieved successfully!");
			setLoading(false);
			window.location.reload();
		} catch (error) {
			if (!error.response) {
				toast.error("Network error: Unable to connect to the server.");
			} else if (error.response.status === 401) {
				toast.error("Unauthorized: Please login again.");
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
			setLoading(false); // Stop loading
		}
	};

	const getUsers = async () => {
		const token = localStorage.getItem("payittoken");
		setLoading(true); // Start loading

		try {
			const { data } = await axios.get(
				"https://staging.payit.com.ng/administrator/user/all",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setUsers(data.users); // Set the users data
			toast.success("Users retrieved successfully!");
			setLoading(false);
		} catch (error) {
			if (!error.response) {
				toast.error("Network error: Unable to connect to the server.");
			} else if (error.response.status === 401) {
				toast.error("Unauthorized: Please login again.");
				// localStorage.clear();
				// navigate("/login");
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
			setLoading(false); // Stop loading
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className='p-4 h-screen flex flex-col'>
					<div className='flex justify-between items-center my-4'>
						<h1 className='text-white'>Staffs</h1>
						<Link
							to='/create-user'
							className='bg-[#868150] text-white p-2 rounded'
						>
							Create New Admin
						</Link>
					</div>
					<div className='flex-1 overflow-auto'>
						<h2 className='text-white mb-6'>User Table</h2>
						<div className='bg-[#1b1b1b] text-white rounded-lg'>
							<table className='min-w-full bg-[#1b1b1b]'>
								<thead>
									<tr>
										<th className='px-4 py-2'>More</th>
										<th className='px-4 py-2'>User ID</th>
										<th className='px-4 py-2'>Full Name</th>
										<th className='px-4 py-2'>Email</th>
										<th className='px-4 py-2'>Status</th>
										<th className='px-4 py-2'>Toggle Status</th>
										<th className='px-4 py-2'>Registration Date</th>
									</tr>
								</thead>
								<tbody>
									{users.length > 0 &&
										users.map((row, index) => (
											<tr key={index} className='border-b border-gray-700'>
												<td className='px-4 py-2'>
													<FaEye className='cursor-pointer' />
												</td>
												<td className='px-4 py-2'>{row.id.slice(0, 6)}</td>
												<td className='px-4 py-2'>{row.fullName}</td>
												<td className='px-4 py-2'>{row.email}</td>
												<td className='px-4 py-2'>
													{row.isActive ? "Active" : "Inactive"}
												</td>
												<td className='px-4 py-2'>
													<button
														onClick={() => toggleStatus(row.id, row.isActive)}
														className='flex items-center'
													>
														{row.isActive ? (
															<FaToggleOn
																className='text-green-500'
																size={24}
															/>
														) : (
															<FaToggleOff className='text-red-500' size={24} />
														)}
													</button>
												</td>
												<td className='px-4 py-2'>{row.createdAt}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
			<ToastContainer />
		</>
	);
};

export default UserManagement;
