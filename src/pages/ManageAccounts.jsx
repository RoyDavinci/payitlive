import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
// import { saveAs } from "file-saver";
import { CSVLink } from "react-csv";
import DatePicker from "react-datepicker"; // Assuming you're using react-datepicker
import "react-datepicker/dist/react-datepicker.css";

const ManageAccounts = () => {
	const [data] = useState({
		totalSales: {
			successful: 100000,
			pending: 20000,
			failed: 5000,
		},
		products: [
			// {
			// 	name: "Airtime",
			// 	users: [
			// 		{ name: "User 1", amount: 20000 },
			// 		{ name: "User 2", amount: 30000 },
			// 	],
			// },
			// {
			// 	name: "Data",
			// 	users: [
			// 		{ name: "User 3", amount: 15000 },
			// 		{ name: "User 4", amount: 25000 },
			// 	],
			// },
			// {
			// 	name: "Bill Payment",
			// 	users: [
			// 		{ name: "User 5", amount: 12000 },
			// 		{ name: "User 6", amount: 18000 },
			// 	],
			// },
		],
	});

	const [selectedProduct, setSelectedProduct] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const salesChartData = {
		labels: ["Successful", "Pending", "Failed"],
		datasets: [
			{
				label: "Sales",
				data: [
					data.totalSales.successful,
					data.totalSales.pending,
					data.totalSales.failed,
				],
				backgroundColor: ["#9ED686", "#FEF48B", "#FF6384"],
			},
		],
	};

	const filteredProducts = data.products.filter((product) => {
		if (selectedProduct === "All") return true;
		return product.name === selectedProduct;
	});

	const handleCSVDownload = () => {
		const csvData = filteredProducts
			.map((product) => {
				return product.users.map((user) => ({
					Product: product.name,
					User: user.name,
					Amount: user.amount,
				}));
			})
			.flat();
		return csvData;
	};

	return (
		<div className='h-screen bg-[#1B1B1B] text-white p-6 flex flex-col space-y-6'>
			<h1 className='text-2xl font-bold'>Manage Partner Accounts</h1>

			{/* Filter Section */}
			{data.products.length <= 0 && (
				<>
					<div className='flex justify-center flex-col bg-[#3F3F3F] mt-20 h-screen text-white items-center text-center'>
						<h1 className='text-2xl font-bold mb-4 '>Manage Accounts</h1>
						<h1>No Accounts to Manage yet</h1>
					</div>
				</>
			)}
			{data.products.length > 0 && (
				<>
					<div className='overflow-auto'>
						<div className='bg-[#3F3F3F] p-4 rounded-lg my-6 overflow-x-auto shadow-lg space-y-4'>
							<h2 className='text-lg font-semibold'>Filters</h2>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div>
									<label>Product:</label>
									<select
										value={selectedProduct}
										onChange={(e) => setSelectedProduct(e.target.value)}
										className='w-full p-2 bg-[#666666] text-white rounded-lg'
									>
										<option value='All'>All</option>
										<option value='Airtime'>Airtime</option>
										<option value='Data'>Data</option>
										<option value='Bill Payment'>Bill Payment</option>
									</select>
								</div>
								<div>
									<label>Status:</label>
									<select
										value={selectedStatus}
										onChange={(e) => setSelectedStatus(e.target.value)}
										className='w-full p-2 bg-[#666666] text-white rounded-lg'
									>
										<option value='All'>All</option>
										<option value='Successful'>Successful</option>
										<option value='Pending'>Pending</option>
										<option value='Failed'>Failed</option>
									</select>
								</div>
								<div>
									<label>Date Range:</label>
									<div className='flex space-x-2'>
										<DatePicker
											selected={startDate}
											onChange={(date) => setStartDate(date)}
											className='p-2 bg-[#666666] text-white rounded-lg'
										/>
										<DatePicker
											selected={endDate}
											onChange={(date) => setEndDate(date)}
											className='p-2 bg-[#666666] text-white rounded-lg'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-3 my-6 gap-4'>
							<div className='bg-[#3F3F3F] p-4 rounded-lg shadow-lg max-h-[350px] overflow-auto'>
								<h2 className='text-lg font-semibold'>Total Sales</h2>
								<Bar data={salesChartData} />
							</div>

							<div className='bg-[#3F3F3F] p-4 rounded-lg shadow-lg max-h-[350px] overflow-auto'>
								<h2 className='text-lg font-semibold'>Sales Breakdown</h2>
								<ul className='space-y-2'>
									<li>
										Successful:{" "}
										<span className='text-[#9ED686]'>
											${data.totalSales.successful}
										</span>
									</li>
									<li>
										Pending:{" "}
										<span className='text-[#FEF48B]'>
											${data.totalSales.pending}
										</span>
									</li>
									<li>
										Failed:{" "}
										<span className='text-red-600'>
											${data.totalSales.failed}
										</span>
									</li>
								</ul>
							</div>

							<div className='bg-[#3F3F3F] p-4 rounded-lg shadow-lg max-h-[350px] overflow-auto'>
								<h2 className='text-lg font-semibold'>Overall Performance</h2>
								<Doughnut data={salesChartData} />
							</div>
						</div>
						<div className='bg-[#3F3F3F] py-8 my-6  px-4 rounded-lg shadow-lg overflow-auto flex-1'>
							<h2 className='text-xl font-bold mb-4'>Product Breakdown</h2>
							{filteredProducts.map((product, index) => (
								<div key={index} className='mb-6 max-h-[200px] overflow-auto'>
									<h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
									<table className='w-full bg-[#3F3F3F] rounded-lg shadow-lg'>
										<thead>
											<tr className='bg-[#666666]'>
												<th className='p-2 text-left'>User</th>
												<th className='p-2 text-left'>Amount</th>
											</tr>
										</thead>
										<tbody>
											{product.users.map((user, userIndex) => (
												<tr key={userIndex}>
													<td className='p-2'>{user.name}</td>
													<td className='p-2'>${user.amount}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							))}
						</div>
						<div className='flex justify-end'>
							<CSVLink
								data={handleCSVDownload()}
								filename='partner-accounts.csv'
								className='p-2 bg-[#FEF48B] text-black rounded-lg'
							>
								Download CSV
							</CSVLink>
						</div>
					</div>
				</>
			)}

			{/* Sales Summary Section */}

			{/* Product Breakdown */}

			{/* CSV Download Button */}
		</div>
	);
};

export default ManageAccounts;
