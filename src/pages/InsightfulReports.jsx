import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { CSVLink } from "react-csv";
import { FaFilter, FaDownload } from "react-icons/fa";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const salesData = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			label: "Total Sales",
			data: [5000, 6000, 7000, 8000, 9000, 10000, 11000],
			backgroundColor: "#FEF48B",
			borderColor: "#FEF48B",
			borderWidth: 1,
		},
	],
};

const salesDistributionData = {
	labels: ["January", "February", "March", "April", "May"],
	datasets: [
		{
			label: "Sales Distribution",
			data: [2000, 2500, 3000, 3500, 4000],
			backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED", "#4BC0C0"],
		},
	],
};

const ViewInsightfulReports = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleFilter = () => {
		// Implement filtering logic here
		console.log("Filter by:", startDate, endDate);
	};

	return (
		<div className='h-screen bg-[#1B1B1B] text-white p-4'>
			<h1 className='text-2xl font-bold mb-4'>Insightful Reports</h1>

			<div className='mb-4 flex items-center justify-between'>
				<div className='flex items-center'>
					<span className='mr-2'>Start Date:</span>
					<input
						type='date'
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className='p-2 rounded-md bg-[#3F3F3F] border border-[#666666] text-white'
					/>
				</div>
				<div className='flex items-center ml-4'>
					<span className='mr-2'>End Date:</span>
					<input
						type='date'
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						className='p-2 rounded-md bg-[#3F3F3F] border border-[#666666] text-white'
					/>
				</div>
				<button
					onClick={handleFilter}
					className='ml-4 p-2 bg-[#FEF48B] text-black rounded-md flex items-center'
				>
					<FaFilter className='mr-2' /> Filter
				</button>
				<CSVLink
					data={[]} // Replace with actual data
					filename={"insightful-reports.csv"}
					className='ml-4 p-2 bg-[#FEF48B] text-black rounded-md flex items-center'
				>
					<FaDownload className='mr-2' /> Download
				</CSVLink>
			</div>

			<>
				<div className='flex justify-center text-white items-center text-center'>
					<h1>No Report Data yet</h1>
				</div>
			</>

			{/* <div className='bg-[#3F3F3F] p-4 rounded-md mb-4 overflow-auto'>
				<h2 className='text-xl font-bold mb-4'>Total Sales Over Time</h2>
				<div className='h-[200px]'>
					<Bar
						data={salesData}
						options={{
							maintainAspectRatio: false,
							responsive: true,
							scales: {
								x: {
									beginAtZero: true,
								},
								y: {
									beginAtZero: true,
								},
							},
							plugins: {
								legend: {
									display: true,
								},
								tooltip: {
									callbacks: {
										label: (tooltipItem) =>
											`${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`,
									},
								},
							},
						}}
					/>
				</div>
			</div>

			<div className='bg-[#3F3F3F] p-4 rounded-md overflow-auto'>
				<h2 className='text-xl font-bold mb-4'>Sales Distribution</h2>
				<div className='h-[200px]'>
					<Doughnut
						data={salesDistributionData}
						options={{
							maintainAspectRatio: false,
							responsive: true,
							plugins: {
								legend: {
									display: true,
								},
								tooltip: {
									callbacks: {
										label: (tooltipItem) =>
											`${tooltipItem.label}: ${tooltipItem.formattedValue}`,
									},
								},
							},
						}}
					/>
				</div>
			</div> */}
		</div>
	);
};

export default ViewInsightfulReports;
