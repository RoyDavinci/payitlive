import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

const DashboardCharts = ({ data }) => {
	const [transactions, setTransactions] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [statusesData, setStatusesData] = useState({
		successful: 0,
		pending: 0,
		failed: 0,
	});

	useEffect(() => {
		setTransactions(data);
	}, [data]);

	useEffect(() => {
		if (transactions.length > 0) {
			// Calculate total amount
			const total = transactions.reduce(
				(acc, transaction) => acc + transaction.amount,
				0
			);
			setTotalAmount(total);

			// Calculate statuses
			const statuses = {
				successful: 0,
				pending: 0,
				failed: 0,
			};

			transactions.forEach((transaction) => {
				if (transaction.status === "processed") {
					statuses.successful += 1;
				} else if (transaction.status === "pending") {
					statuses.pending += 1;
				} else if (transaction.status === "failed") {
					statuses.failed += 1;
				}
			});

			setStatusesData(statuses);
		}
	}, [transactions]);

	const transactionLabels = transactions.map(
		(transaction, index) => `Transaction ${index + 1}`
	);
	const transactionData = {
		labels: transactionLabels,
		datasets: [
			{
				label: "Transactions for Today",
				data: transactions.map((transaction) => transaction.amount),
				backgroundColor: "#888250",
				borderColor: "#888250",
				borderWidth: 1,
			},
		],
	};

	const statuses = {
		labels: ["Successful", "Pending", "Failed"],
		datasets: [
			{
				data: [
					statusesData.successful,
					statusesData.pending,
					statusesData.failed,
				],
				backgroundColor: ["#888250", "#fff", "red"],
				borderColor: ["#888250", "#fff", "red"],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className='p-6 flex flex-col lg:flex-row gap-6'>
			<div className='flex-1 bg-[#1B1B1B] shadow-md rounded-lg p-4'>
				<h2 className='text-[22px] font-normal mb-4 text-white'>
					Transactions for Today
				</h2>
				<div className='flex items-center mb-4 text-[#6D6D6D]'>
					<div className='text-2xl font-bold mr-4'>
						₦{totalAmount.toLocaleString()}
					</div>
				</div>
				<div className='h-[200px]'>
					<Bar
						data={transactionData}
						options={{
							responsive: true,
							plugins: {
								legend: {
									position: "top",
								},
								title: {
									display: true,
									text: "Transactions Over Time",
								},
							},
						}}
					/>
				</div>
			</div>
			<div className='flex-1 bg-[#1b1b1b] shadow-md rounded-lg p-4 w-full'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-[22px] font-normal text-white'>
						Transaction Statuses
					</h2>
					<div className='flex justify-between items-center px-4 py-2 bg-[#4A4A4A] rounded-xl text-white'>
						<FaFilter color='#FEF48B' />
						<p className='ml-4'>Filter</p>
					</div>
				</div>
				<div className='flex justify-between items-center'>
					<div className='flex flex-col justify-center space-y-2 w-full flex-1'>
						<div className='flex items-center space-x-2'>
							<div
								style={{ backgroundColor: "#888250" }}
								className='w-8 h-8 rounded-full'
							></div>
							<div>
								<p className='text-white'>
									Successful: {statusesData.successful}
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-2'>
							<div
								style={{ backgroundColor: "#fff" }}
								className='w-8 h-8 rounded-full'
							></div>
							<div>
								<p className='text-white'>Pending: {statusesData.pending}</p>
							</div>
						</div>
						<div className='flex items-center space-x-2'>
							<div
								style={{ backgroundColor: "red" }}
								className='w-8 h-8 rounded-full'
							></div>
							<div>
								<p className='text-white'>Failed: {statusesData.failed}</p>
							</div>
						</div>
					</div>
					<div className='h-[200px] w-full flex-1'>
						<Pie
							style={{ width: "50%", height: "250px" }}
							data={statuses}
							options={{
								responsive: true,
								plugins: {
									tooltip: {
										callbacks: {
											label: function (tooltipItem) {
												return tooltipItem.label + ": " + tooltipItem.raw;
											},
										},
									},
								},
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardCharts;
