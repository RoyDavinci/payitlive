import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		gender: "male",
		password: "",
		tokenId: "",
		code: "",
		testUser: true,
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Update form data state on input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		const { firstName, lastName, email, password, tokenId, code } = formData;
		if (!firstName || !lastName || !email || !password || !tokenId || !code) {
			toast.error("Please fill out all required fields.");
			return;
		}

		const token = localStorage.getItem("payittoken");
		if (!token) {
			toast.error("No authentication token found. Please login.");
			return;
		}

		try {
			setLoading(true);
			const { data } = await axios.post(
				"https://staging.payit.com.ng/platform/auth/create-account",
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (data.status === 200 || data.status === 201) {
				toast.success("Account created successfully!");
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					gender: "male",
					password: "",
					tokenId: "",
					code: "",
					testUser: true,
				}); // Reset form
			}
		} catch (error) {
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
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-center items-center min-h-screen bg-[#000]'>
			<form
				onSubmit={handleSubmit}
				className='bg-[#2f2f2f] p-8 rounded-lg overflow-auto shadow-lg w-full max-w-4xl grid gap-6 lg:grid-cols-3 sm:grid-cols-1'
			>
				<h2 className='text-3xl font-bold mb-8 text-center text-[#7CAB6A] lg:col-span-3'>
					Create New Account
				</h2>

				{/* First Name Input */}
				<div>
					<label className='block text-sm font-medium text-[#7CAB6A] mb-1'>
						First Name
					</label>
					<input
						type='text'
						name='firstName'
						className='w-full border border-[#6F6A43] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CAB6A]'
						value={formData.firstName}
						onChange={handleChange}
						placeholder='Enter your first name'
						required
					/>
				</div>

				{/* Last Name Input */}
				<div>
					<label className='block text-sm font-medium text-[#7CAB6A] mb-1'>
						Last Name
					</label>
					<input
						type='text'
						name='lastName'
						className='w-full border border-[#6F6A43] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CAB6A]'
						value={formData.lastName}
						onChange={handleChange}
						placeholder='Enter your last name'
						required
					/>
				</div>

				{/* Email Input */}
				<div>
					<label className='block text-sm font-medium text-[#7CAB6A] mb-1'>
						Email Address
					</label>
					<input
						type='email'
						name='email'
						className='w-full border border-[#6F6A43] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CAB6A]'
						value={formData.email}
						onChange={handleChange}
						placeholder='Enter your email'
						required
					/>
				</div>

				{/* Gender Dropdown */}
				<div>
					<label className='block text-sm font-medium text-[#7CAB6A] mb-1'>
						Gender
					</label>
					<select
						name='gender'
						className='w-full border border-[#6F6A43] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CAB6A]'
						value={formData.gender}
						onChange={handleChange}
					>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
				</div>

				{/* Password Input */}
				<div>
					<label className='block text-sm font-medium text-[#7CAB6A] mb-1'>
						Password
					</label>
					<input
						type='password'
						name='password'
						className='w-full border border-[#6F6A43] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CAB6A]'
						value={formData.password}
						onChange={handleChange}
						placeholder='Enter your password'
						required
					/>
				</div>

				{/* Token ID Input */}
				<div>
					<label className='block text-sm font-medium text-[#7CAB6A] mb-1'>
						Token ID
					</label>
					<input
						type='text'
						name='tokenId'
						className='w-full border border-[#6F6A43] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CAB6A]'
						value={formData.tokenId}
						onChange={handleChange}
						placeholder='Enter the token ID'
						required
					/>
				</div>

				{/* Code Input */}
				<div>
					<label className='block text-sm font-medium text-[#7CAB6A] mb-1'>
						Verification Code
					</label>
					<input
						type='text'
						name='code'
						className='w-full border border-[#6F6A43] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CAB6A]'
						value={formData.code}
						onChange={handleChange}
						placeholder='Enter the verification code'
						required
					/>
				</div>

				{/* Submit Button */}
				<div className='lg:col-span-3'>
					<button
						type='submit'
						className={`w-full bg-[#7CAB6A] text-[#000000] p-3 rounded-lg hover:bg-[#6F6A43] transition duration-300 ease-in-out ${
							loading && "cursor-not-allowed"
						}`}
						disabled={loading}
					>
						{loading ? "Creating Account..." : "Create Account"}
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
};

export default CreateAccountForm;
