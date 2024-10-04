import React, { useState } from "react";
import { CSVLink } from "react-csv";

const transactionsByPartner = {
	// "Partner A": [
	// 	{
	// 		id: 1,
	// 		transactionId: "TXN001",
	// 		date: "2024-09-01",
	// 		type: "Debit",
	// 		amount: 5000,
	// 		status: "Successful",
	// 	},
	// 	{
	// 		id: 2,
	// 		transactionId: "TXN004",
	// 		date: "2024-09-01",
	// 		type: "Credit",
	// 		amount: 2000,
	// 		status: "Pending",
	// 	},
	// 	// More transactions...
	// ],
	// "Partner B": [
	// 	{
	// 		id: 3,
	// 		transactionId: "TXN005",
	// 		date: "2024-09-02",
	// 		type: "Debit",
	// 		amount: 10000,
	// 		status: "Successful",
	// 	},
	// 	{
	// 		id: 4,
	// 		transactionId: "TXN006",
	// 		date: "2024-09-02",
	// 		type: "Credit",
	// 		amount: 5000,
	// 		status: "Failed",
	// 	},
	// More transactions...
	// ],
	// More partners...
};

const TransactionMonitoring = () => {
	const [selectedPartner, setSelectedPartner] = useState("Partner A");
	const [filteredTransactions, setFilteredTransactions] = useState(
		transactionsByPartner["Partner A"]
	);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handlePartnerChange = (e) => {
		const partner = e.target.value;
		setSelectedPartner(partner);
		setFilteredTransactions(transactionsByPartner[partner]);
	};

	const filterTransactions = () => {
		const filtered = transactionsByPartner[selectedPartner].filter((txn) => {
			const txnDate = new Date(txn.date);
			return txnDate >= new Date(startDate) && txnDate <= new Date(endDate);
		});
		setFilteredTransactions(filtered);
	};

	return (
		<div className='h-screen bg-[#1B1B1B] text-white p-6 flex flex-col space-y-6'>
			<h1 className='text-2xl font-bold'>Transaction Monitoring</h1>

			{/* Partner Selector */}
			{Object.keys(transactionsByPartner).length <= 0 && (
				<>
					<div className='flex justify-center flex-col bg-[#3F3F3F] mt-20 h-screen text-white items-center text-center'>
						<h1 className='text-2xl font-bold mb-4 '>Manage Transactions</h1>
						<h1>No Transactions to Manage yet</h1>
					</div>
				</>
			)}
			{Object.keys(transactionsByPartner).length > 0 && (
				<>
					{" "}
					<div className='bg-[#3F3F3F] p-4 rounded-lg'>
						<h2 className='text-xl font-semibold'>Select Partner</h2>
						<select
							value={selectedPartner}
							onChange={handlePartnerChange}
							className='bg-[#666666] text-white p-2 rounded'
						>
							{Object.keys(transactionsByPartner).map((partner) => (
								<option key={partner} value={partner}>
									{partner}
								</option>
							))}
						</select>
					</div>
					{/* Date Filter Form */}
					<div className='bg-[#3F3F3F] p-4 rounded-lg'>
						<h2 className='text-xl font-semibold'>
							Filter Transactions by Date
						</h2>
						<div className='flex space-x-4'>
							<div>
								<label className='text-[#FEF48B]'>Start Date</label>
								<input
									type='date'
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									className='bg-[#666666] text-white p-2 rounded'
								/>
							</div>
							<div>
								<label className='text-[#FEF48B]'>End Date</label>
								<input
									type='date'
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									className='bg-[#666666] text-white p-2 rounded'
								/>
							</div>
							<button
								onClick={filterTransactions}
								className='bg-[#9ED686] text-[#1B1B1B] font-bold py-2 px-4 rounded'
							>
								Filter
							</button>
						</div>
					</div>
					{/* Transactions Table */}
					<div className='flex-1 overflow-auto bg-[#3F3F3F] p-6 rounded-lg'>
						<table className='w-full text-left'>
							<thead>
								<tr className='bg-[#6C6C6C]'>
									<th className='p-2'>Transaction ID</th>
									<th className='p-2'>Date</th>
									<th className='p-2'>Type</th>
									<th className='p-2'>Amount</th>
									<th className='p-2'>Status</th>
								</tr>
							</thead>
							<tbody>
								{filteredTransactions.map((txn) => (
									<tr key={txn.id} className='border-t border-[#6C6C6C]'>
										<td className='p-2'>{txn.transactionId}</td>
										<td className='p-2'>{txn.date}</td>
										<td className='p-2'>{txn.type}</td>
										<td className='p-2'>₦{txn.amount.toLocaleString()}</td>
										<td
											className={`p-2 ${
												txn.status === "Successful"
													? "text-green-300"
													: txn.status === "Pending"
													? "text-yellow-300"
													: "text-red-300"
											}`}
										>
											{txn.status}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{/* Download Button */}
					<div className='flex justify-end'>
						<CSVLink
							data={filteredTransactions}
							filename={`transaction_history_${selectedPartner}_${startDate}_${endDate}.csv`}
							className='bg-[#9ED686] text-[#1B1B1B] font-bold py-2 px-4 rounded'
						>
							Download CSV
						</CSVLink>
					</div>
				</>
			)}
		</div>
	);
};

export default TransactionMonitoring;
