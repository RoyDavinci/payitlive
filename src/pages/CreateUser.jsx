import React, { useState } from "react";
import axios from "axios";
import { FaSave } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Assuming you're using react-toastify for notifications
import { baseUrl, devUrl } from "../utils/connect";
import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		roles: "admin", // Default to admin as in your example
		permissions: ["create_user"], // Default permission as per your example
		is_super_admin: false, // Default to false as in your example
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm({
			...form,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(form);

		const token = localStorage.getItem("payittoken");

		try {
			const { data } = await axios.post(
				"https://staging.payit.com.ng/administrator/user/create",
				form,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			console.log(data);
			toast.success("User created successfully");

			navigate("/staff");
		} catch (error) {
			console.log(error.response);
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
		}
	};

	return (
		<div className='p-4 lg:h-screen h-auto'>
			<h1 className='text-white mb-6'>Create User</h1>
			<form
				onSubmit={handleSubmit}
				className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4'
				autoComplete='false'
			>
				<div>
					<label className='text-white mb-4 block'>First Name</label>
					<input
						type='text'
						name='firstName'
						value={form.firstName}
						onChange={handleChange}
						placeholder='Enter First Name'
						className='w-full p-2 border rounded bg-[#1b1b1b] text-white'
						required
						autoComplete='off'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Last Name</label>
					<input
						type='text'
						name='lastName'
						value={form.lastName}
						onChange={handleChange}
						placeholder='Enter Last Name'
						className='w-full p-2 border rounded bg-[#1b1b1b] text-white'
						required
						autoComplete='off'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Email</label>
					<input
						type='email'
						name='email'
						value={form.email}
						onChange={handleChange}
						placeholder='Enter Email'
						className='w-full p-2 border rounded bg-[#1b1b1b] text-white'
						required
						autoComplete='off'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Password</label>
					<input
						type='password'
						name='password'
						value={form.password}
						onChange={handleChange}
						placeholder='Enter Password'
						className='w-full p-2 border rounded bg-[#1b1b1b] text-white'
						required
						autoComplete='off'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Role</label>
					<select
						name='role'
						value={form.roles}
						onChange={handleChange}
						className='w-full p-2 border rounded bg-[#1b1b1b] text-white'
						required
					>
						<option value='admin'>Admin</option>
						<option value='super_admin'>Super Admin</option>
					</select>
				</div>
				<div>
					<label className='text-white mb-4 block'>Permissions</label>
					<input
						type='text'
						name='permissions'
						value={form.permissions.join(", ")}
						onChange={handleChange}
						placeholder='Enter Permissions (comma separated)'
						className='w-full p-2 border rounded bg-[#1b1b1b] text-white'
						required
						autoComplete='off'
					/>
				</div>
				<div className='flex items-center'>
					<input
						type='checkbox'
						name='is_super_admin'
						checked={form.is_super_admin}
						onChange={handleChange}
						className='mr-2'
					/>
					<label className='text-white'>Is Super Admin</label>
				</div>
				<div>
					<button
						type='submit'
						className='w-full flex justify-center items-center p-2 gap-6 border rounded bg-[#868150] text-white'
					>
						<span>Create User</span>
						<FaSave className='text-white' size={20} />
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
};
