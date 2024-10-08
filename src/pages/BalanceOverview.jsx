import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import baseUrl from "../config/baseUrl";

const partnerBalances = [
	// { id: 1, partnerName: "Partner A", product: "Airtime", balance: 50000 },
	// { id: 2, partnerName: "Partner B", product: "Data", balance: 10000 },
	// { id: 3, partnerName: "Partner C", product: "Bill Payment", balance: 300000 },
	// { id: 4, partnerName: "Partner D", product: "Transfers", balance: 1500 },
	// { id: 5, partnerName: "Partner E", product: "Savings", balance: 80000 },
];

// Function to determine if the balance is low
const isLowBalance = (balance) => balance < 10000;

const BalanceOverview = () => {
	const [partners, setPArtners] = useState([]);
	const navigate = useNavigate();

	const getBalances = async () => {
		try {
			const token = localStorage.getItem("payittoken");
			if (!token) {
				return navigate("/login");
			}
			const { data } = await axios.get(
				`${baseUrl.staging}product/products/all`,
				{ headers: { Authorization: `bearer ${token}` } }
			);
			console.log(data.products);
			setPArtners(data.products);
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
		}
	};

	// console.log(partners.products);

	useEffect(() => {
		getBalances();
	}, []);

	return (
		<div className='h-screen bg-[#1B1B1B] text-white p-6 flex flex-col space-y-6'>
			<h1 className='text-2xl font-bold'>Partner Balance Overview</h1>

			{/* Scrollable grid container */}
			{partners.length <= 0 && (
				<>
					<div className='flex justify-center flex-col bg-[#3F3F3F] mt-20 h-screen text-white items-center text-center'>
						<h1 className='text-2xl font-bold mb-4 '>Manage Balances</h1>
						<h1>No Balances to Manage yet</h1>
					</div>
				</>
			)}
			{partners.length > 0 && (
				<>
					<div className='flex-1 overflow-auto bg-[#3F3F3F] p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{partners.map((partner) => (
							<div
								key={partner.productId}
								className={`p-4 rounded-lg space-y-2 shadow-lg ${
									isLowBalance(partner.balance) ? "bg-red-500" : "bg-[#666666]"
								}`}
							>
								<h2 className='text-xl font-semibold'>{partner.partnerName}</h2>
								{/* <p className='text-sm text-[#FEF48B]'>
									Product: {partner.product}
								</p> */}
								<p className='text-lg'>
									Balance:{" "}
									<span
										className={`font-bold ${
											isLowBalance(partner.balance)
												? "text-red-200"
												: "text-green-300"
										}`}
									>
										₦{partner.balance.toLocaleString()}
									</span>
								</p>
								{isLowBalance(partner.balance) && (
									<p className='text-xs text-red-100'>
										Balance Low! Consider funding.
									</p>
								)}
							</div>
						))}
					</div>
				</>
			)}
			<ToastContainer />
		</div>
	);
};

export default BalanceOverview;
