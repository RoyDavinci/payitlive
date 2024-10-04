import React, { useState } from "react";
import { FaFilter, FaDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";

const transactionTypes = ["All", "Sales", "Refunds", "Transfers"];
const userSegments = ["All", "New Users", "Returning Users", "Premium Users"];

const CustomReportForm = () => {
	const [transactionType, setTransactionType] = useState("All");
	const [userSegment, setUserSegment] = useState("All");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [reportData, setReportData] = useState([]); // For storing the generated report data

	const handleGenerateReport = () => {
		// Implement report generation logic here
		console.log("Generating report with:", {
			transactionType,
			userSegment,
			startDate,
			endDate,
		});
		// For demo purposes, we are just setting dummy data
		setReportData([
			{ id: 1, type: "Sale", amount: 1000, date: "2024-08-01" },
			{ id: 2, type: "Refund", amount: -200, date: "2024-08-02" },
		]);
	};

	return (
		<div className='p-6 bg-[#1B1B1B] text-white h-screen rounded-lg shadow-lg'>
			<h1 className='text-3xl font-bold mb-6'>Custom Report Generator</h1>
			<div className='space-y-4'>
				<div className='flex flex-col md:flex-row md:space-x-4'>
					<div className='flex flex-col mb-4 md:mb-0'>
						<label className='text-lg font-medium mb-2'>Transaction Type</label>
						<select
							value={transactionType}
							onChange={(e) => setTransactionType(e.target.value)}
							className='p-3 rounded-md bg-[#3F3F3F] border border-[#666666] text-white focus:outline-none focus:ring-2 focus:ring-[#FEF48B]'
						>
							{transactionTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>

					<div className='flex flex-col mb-4 md:mb-0'>
						<label className='text-lg font-medium mb-2'>User Segment</label>
						<select
							value={userSegment}
							onChange={(e) => setUserSegment(e.target.value)}
							className='p-3 rounded-md bg-[#3F3F3F] border border-[#666666] text-white focus:outline-none focus:ring-2 focus:ring-[#FEF48B]'
						>
							{userSegments.map((segment) => (
								<option key={segment} value={segment}>
									{segment}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className='flex flex-col md:flex-row md:space-x-4'>
					<div className='flex flex-col mb-4 md:mb-0'>
						<label className='text-lg font-medium mb-2'>Start Date</label>
						<input
							type='date'
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className='p-3 rounded-md bg-[#3F3F3F] border border-[#666666] text-white focus:outline-none focus:ring-2 focus:ring-[#FEF48B]'
						/>
					</div>

					<div className='flex flex-col'>
						<label className='text-lg font-medium mb-2'>End Date</label>
						<input
							type='date'
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className='p-3 rounded-md bg-[#3F3F3F] border border-[#666666] text-white focus:outline-none focus:ring-2 focus:ring-[#FEF48B]'
						/>
					</div>
				</div>

				<button
					onClick={handleGenerateReport}
					className='flex items-center p-3 bg-[#FEF48B] text-[#1B1B1B] rounded-md hover:bg-[#9ED686] transition duration-300'
				>
					<FaFilter className='mr-2' /> Generate Report
				</button>
			</div>

			{reportData.length > 0 && (
				<div className='mt-6'>
					<h2 className='text-2xl font-semibold mb-4'>Generated Report</h2>
					<CSVLink
						data={reportData}
						filename={"custom-report.csv"}
						className='flex items-center p-3 bg-[#FEF48B] text-[#1B1B1B] rounded-md hover:bg-[#9ED686] transition duration-300'
					>
						<FaDownload className='mr-2' /> Download Report
					</CSVLink>
				</div>
			)}
		</div>
	);
};

export default CustomReportForm;
