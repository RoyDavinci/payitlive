import React, { useState } from "react";
import { CSVLink } from "react-csv";

const TransactionHistory = () => {
	const [walletId, setWalletId] = useState("");
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [transactions, setTransactions] = useState([]);

	const handleFilter = () => {
		// Simulate fetching filtered transactions
		const filteredTransactions = [
			{
				id: 1,
				date: "2024-09-01",
				amount: 5000,
				type: "Debit",
				status: "Successful",
			},
			{
				id: 2,
				date: "2024-09-02",
				amount: 10000,
				type: "Credit",
				status: "Pending",
			},
			// Add more data for testing
		];
		setTransactions(filteredTransactions);
	};

	const headers = [
		{ label: "Transaction ID", key: "id" },
		{ label: "Date", key: "date" },
		{ label: "Amount", key: "amount" },
		{ label: "Type", key: "type" },
		{ label: "Status", key: "status" },
	];

	return (
		<div className='w-full h-screen bg-[#1B1B1B] text-[#FEF48B] p-4 flex flex-col'>
			<div className='text-2xl font-bold mb-4'>Transaction History</div>
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Wallet ID'
					value={walletId}
					onChange={(e) => setWalletId(e.target.value)}
					className='w-full p-2 mb-2 bg-[#3F3F3F] border border-[#666666] rounded-lg text-[#FEF48B]'
				/>
				<div className='flex space-x-4 mb-4'>
					<input
						type='date'
						value={fromDate}
						onChange={(e) => setFromDate(e.target.value)}
						className='w-full p-2 bg-[#3F3F3F] border border-[#666666] rounded-lg text-[#FEF48B]'
					/>
					<input
						type='date'
						value={toDate}
						onChange={(e) => setToDate(e.target.value)}
						className='w-full p-2 bg-[#3F3F3F] border border-[#666666] rounded-lg text-[#FEF48B]'
					/>
				</div>
				<div className='flex space-x-4'>
					<button
						className='p-2 bg-[#9ED686] text-[#1B1B1B] rounded-lg hover:bg-[#6C6C6C]'
						onClick={handleFilter}
					>
						Filter
					</button>
					<CSVLink
						data={transactions}
						headers={headers}
						filename='transaction_history.csv'
						className='p-2 bg-[#9ED686] text-[#1B1B1B] rounded-lg hover:bg-[#6C6C6C]'
					>
						Download
					</CSVLink>
				</div>
			</div>
			<div className='flex-1 overflow-auto'>
				<table className='w-full bg-[#3F3F3F] border border-[#666666]'>
					<thead>
						<tr className='border-b border-[#666666]'>
							<th className='p-2 text-left text-lg font-semibold'>
								Transaction ID
							</th>
							<th className='p-2 text-left text-lg font-semibold'>Date</th>
							<th className='p-2 text-left text-lg font-semibold'>Amount</th>
							<th className='p-2 text-left text-lg font-semibold'>Type</th>
							<th className='p-2 text-left text-lg font-semibold'>Status</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((txn) => (
							<tr key={txn.id} className='border-b border-[#666666]'>
								<td className='p-2'>{txn.id}</td>
								<td className='p-2'>{txn.date}</td>
								<td className='p-2'>${txn.amount.toLocaleString()}</td>
								<td className='p-2'>{txn.type}</td>
								<td className='p-2'>{txn.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TransactionHistory;
