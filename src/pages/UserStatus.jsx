import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import { Loading } from "../components/Loading";
import baseUrl from "../config/baseUrl";

const AdminUserStatus = () => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { id } = useParams(); // Get the user ID from the URL params

	useEffect(() => {
		if (!id) {
			toast.error("No user ID provided. Redirecting...");
			navigate("/users");
			return;
		}

		const fetchUserData = async () => {
			setLoading(true);
			const token = localStorage.getItem("payittoken");

			try {
				const { data } = await axios.get(
					`${baseUrl.staging}customer/${id}/customer`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				console.log(data);
				setUserData(data.customer); // Set the user data
				toast.success("User data retrieved successfully!");
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
				} else if (
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					toast.error(
						`Client Error: ${
							error.response.data.message || "An error occurred."
						}`
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

		fetchUserData();
	}, [id, navigate]);

	if (loading) return <Loading />;
	if (!userData)
		return <div className='text-center py-8'>No user data available.</div>;

	return (
		<div className='container mx-auto p-4 bg-[#000] min-h-screen mt-16'>
			{/* Back Button */}
			<button
				className='flex items-center text-[#868150] mb-4'
				onClick={() => navigate(-1)}
			>
				<FaArrowLeft className='mr-2' />
				Back
			</button>

			{/* Page Title */}
			<h1 className='text-3xl font-bold text-[#fff] mb-6'>User Status</h1>

			{/* User Info Section */}
			<div className='bg-[#FEF48B] p-4 rounded-lg shadow-md mb-6'>
				<h2 className='text-2xl font-semibold mb-4 text-[#1B1B1B]'>
					User Information
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<p className='text-lg mb-2'>
							<strong className='text-[#1B1B1B]'>Customer ID: </strong>{" "}
							{userData.customerId}
						</p>
						<p className='text-lg mb-2'>
							<strong className='text-[#1B1B1B]'>Full Name: </strong>{" "}
							{userData.fullName}
						</p>
						<p className='text-lg mb-2'>
							<strong className='text-[#1B1B1B]'>Email: </strong>{" "}
							{userData.email}
						</p>
						<p className='text-lg mb-2'>
							<strong className='text-[#1B1B1B]'>Phone: </strong>{" "}
							{userData.phone}
						</p>
						<p className='text-lg mb-2'>
							<strong className='text-[#1B1B1B]'>Utility Confirmed: </strong>{" "}
							{userData.utilityBillConfirmed ? "Yes" : "No"}
						</p>
					</div>
					<div>
						<p className='text-lg mb-2'>
							<strong className='text-[#1B1B1B]'>Address Verified: </strong>{" "}
							{userData.addressVerified ? "Yes" : "No"}
						</p>
						<p className='text-lg mb-2'>
							<strong className='text-[#1B1B1B]'>Email Confirmed: </strong>{" "}
							{userData.emailConfirmed ? "Yes" : "No"}
						</p>
						<p className='text-lg mb-2'>
							<strong className='text-[#1B1B1B]'>2FA Setup: </strong>{" "}
							{userData.hasSetup2fa ? "Yes" : "No"}
						</p>
						<p className='text-lg mb-2'>
							<strong className='text-[#1B1B1B]'>Phone Confirmed: </strong>{" "}
							{userData.phoneConfirmed ? "Yes" : "No"}
						</p>
						<p className='text-lg mb-2'>
							<strong className='text-[#1B1B1B]'>Access Pin Confirmed: </strong>{" "}
							{userData.hasAccessPin ? "Yes" : "No"}
						</p>
					</div>
				</div>
			</div>

			{/* Tier Information Section */}
			<div className='bg-[#868150] p-4 rounded-lg shadow-md mb-6 text-white'>
				<h2 className='text-2xl font-semibold mb-4'>Tier Information</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 w-full  gap-4'>
					<div>
						<div className='text-lg mb-2 flex  gap-4'>
							<p>
								<strong>Current Tier: </strong>
							</p>{" "}
							<p>₦{userData.currentTier?.displayName}</p>
						</div>
						<div className='text-lg mb-2 flex  gap-4'>
							<p>
								<strong>Daily Inbound Limit: </strong>
							</p>{" "}
							<p>₦{userData.currentTier?.dailyInboundLimit}</p>
						</div>
						<div className='text-lg mb-2 flex  gap-4'>
							<p>
								<strong>Daily Outbound Limit: </strong>
							</p>{" "}
							<p>₦{userData.currentTier?.dailyOutboundLimit}</p>
						</div>
					</div>
					<div>
						<div className='text-lg mb-2 flex  gap-4'>
							<p>
								<strong>Monthly Transaction Limit: </strong>
							</p>{" "}
							<p>₦{userData.currentTier?.monthlyTransactionLimit}</p>
						</div>
						<div className='text-lg mb-2 flex  gap-4'>
							<p>
								<strong>Maximum Account Balance: </strong>
							</p>{" "}
							<p>₦{userData.currentTier?.maximumAccountBalance}</p>
						</div>
						<div className='text-lg mb-2 flex  gap-4'>
							<p>
								<strong>Can Create Cards: </strong>
							</p>{" "}
							<p>{userData.currentTier?.canCreateCards ? "Yes" : "No"}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Upgrade Options Section */}
			<div className='bg-[#6E965D] p-4 rounded-lg shadow-md text-white mb-6'>
				<h2 className='text-2xl font-semibold mb-4'>Upgrade Requirements</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					<div>
						<p className='text-lg mb-2'>
							<strong>Tier 2:</strong> Requires Address Verification, Utility
							Bill.
						</p>
						<button className='bg-[#1B1B1B] text-white px-4 py-2 rounded-lg mt-2'>
							Upgrade to Tier 2
						</button>
					</div>
					<div>
						<p className='text-lg mb-2'>
							<strong>Tier 3:</strong> Requires Address Verification, Utility
							Bill, Government ID.
						</p>
						<button className='bg-[#1B1B1B] text-white px-4 py-2 rounded-lg mt-2'>
							Upgrade to Tier 3
						</button>
					</div>
				</div>
			</div>

			<ToastContainer />
		</div>
	);
};

export default AdminUserStatus;
