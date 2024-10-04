import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const InitiateNewAccountForm = () => {
	const [email, setEmail] = useState(""); // State for the email input
	const [loading, setLoading] = useState(false); // State for loading status
	const navigate = useNavigate();

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		// Validate email format
		if (!email) {
			toast.error("Please enter a valid email address.");
			return;
		}

		const token = localStorage.getItem("payittoken"); // Retrieve token from local storage

		// Check if token is available
		if (!token) {
			toast.error("No authentication token found. Please login.");
			return;
		}

		// Initialize navigate

		// Define the payload as per the given format
		const payload = {
			identifier: email,
			purpose: "initiate_new_account",
		};

		try {
			setLoading(true); // Set loading to true

			// Send POST request with payload
			const { data } = await axios.post(
				"https://staging.payit.com.ng/platform/app-token/initiate",
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`, // Include token in the Authorization header
						"Content-Type": "application/json", // Set content type as JSON
					},
				}
			);

			console.log(data);

			// Handle success response
			if (data.status === 200 || data.status === 201 || data.tokenId) {
				toast.success("Request sent successfully!");
				setEmail(""); // Reset email input
				return;
			}
		} catch (error) {
			// Handle error response
			if (!error.response) {
				toast.error("Network error: Unable to connect to the server.");
				return;
			} else if (error.response.status === 401) {
				toast.error("Unauthorized: Please login again.");
				localStorage.clear();
				navigate("/login");
				return;
			} else if (error.response.status === 403) {
				toast.error(
					"Forbidden: You do not have permission to access this resource."
				);
				return;
			} else if (error.response.status >= 400 && error.response.status < 500) {
				toast.error(
					`Client Error: ${error.response.data.message || "An error occurred."}`
				);
				return;
			} else if (error.response.status >= 500) {
				toast.error(
					"Server Error: Something went wrong. Please try again later."
				);
				return;
			} else {
				toast.error("An unexpected error occurred. Please try again.");
			}
		} finally {
			setLoading(false); // Set loading to false
		}
	};

	return (
		<div className='flex justify-center items-center h-screen bg-black'>
			<form
				onSubmit={handleSubmit}
				className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'
			>
				<h2 className='text-2xl font-bold mb-6 text-center'>
					Initiate New Account
				</h2>

				{/* Email Input Field */}
				<div className='mb-4'>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Email Address
					</label>
					<input
						type='email'
						className='w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#868150]'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter your email'
						required
					/>
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					className='w-full bg-[#868150] text-white p-3 rounded-lg hover:bg-[#6f6a43] transition duration-300 ease-in-out'
					disabled={loading}
				>
					{loading ? "Sending..." : "Send Request"}
				</button>
			</form>
			<ToastContainer />
		</div>
	);
};

export default InitiateNewAccountForm;
