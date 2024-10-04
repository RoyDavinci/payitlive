import React, { useState } from "react";

const UserFundRequests = () => {
	const [fundRequests, setFundRequests] = useState([
		// {
		// 	id: 1,
		// 	date: "2024-09-01",
		// 	userId: "User001",
		// 	paymentName: "Manual Deposit",
		// 	amount: 5000,
		// 	status: "Pending",
		// },
		// {
		// 	id: 2,
		// 	date: "2024-09-02",
		// 	userId: "User002",
		// 	paymentName: "Manual Transfer",
		// 	amount: 10000,
		// 	status: "Pending",
		// },
		// {
		// 	id: 3,
		// 	date: "2024-09-03",
		// 	userId: "User003",
		// 	paymentName: "Manual Deposit",
		// 	amount: 15000,
		// 	status: "Pending",
		// },
	]);

	const handleApprove = (id) => {
		setFundRequests(
			fundRequests.map((request) =>
				request.id === id ? { ...request, status: "Approved" } : request
			)
		);
	};

	const handleReject = (id) => {
		setFundRequests(
			fundRequests.map((request) =>
				request.id === id ? { ...request, status: "Rejected" } : request
			)
		);
	};

	return (
		<div className='w-full h-screen bg-[#1B1B1B] text-[#FEF48B] p-4 flex flex-col'>
			<div className='text-2xl font-bold mb-4'>User Fund Requests</div>
			{fundRequests.length <= 0 && (
				<>
					<div className='flex justify-center flex-col bg-[#3F3F3F] mt-20 h-screen text-white items-center text-center'>
						<h1 className='text-2xl font-bold mb-4 '>Wallet Requests</h1>
						<h1>No Wallet Funding request from customers yet</h1>
					</div>
				</>
			)}
			{fundRequests.length > 0 && (
				<>
					<div className='flex-1 overflow-auto'>
						<table className='w-full bg-[#3F3F3F] border border-[#666666]'>
							<thead>
								<tr className='border-b border-[#666666]'>
									<th className='p-2 text-left text-lg font-semibold'>Date</th>
									<th className='p-2 text-left text-lg font-semibold'>
										User ID
									</th>
									<th className='p-2 text-left text-lg font-semibold'>
										Payment Name
									</th>
									<th className='p-2 text-left text-lg font-semibold'>
										Amount
									</th>
									<th className='p-2 text-left text-lg font-semibold'>
										Status
									</th>
									<th className='p-2 text-left text-lg font-semibold'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{fundRequests.map((request) => (
									<tr key={request.id} className='border-b border-[#666666]'>
										<td className='p-2'>{request.date}</td>
										<td className='p-2'>{request.userId}</td>
										<td className='p-2'>{request.paymentName}</td>
										<td className='p-2'>${request.amount.toLocaleString()}</td>
										<td className='p-2'>{request.status}</td>
										<td className='p-2'>
											{request.status === "Pending" && (
												<div className='flex space-x-2'>
													<button
														className='p-2 bg-[#9ED686] text-[#1B1B1B] rounded-lg hover:bg-[#6C6C6C]'
														onClick={() => handleApprove(request.id)}
													>
														Approve
													</button>
													<button
														className='p-2 bg-red-600 text-white rounded-lg hover:bg-red-800'
														onClick={() => handleReject(request.id)}
													>
														Reject
													</button>
												</div>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	);
};

export default UserFundRequests;
