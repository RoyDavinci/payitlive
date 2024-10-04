import React, { useState } from "react";
import { FaEye, FaFilter } from "react-icons/fa";

export const Traansactions = () => {
	const [form, setForm] = useState({
		userId: "",
		startDate: "",
		endDate: "",
		status: "",
		firstName: "",
		lastName: "",
		username: "",
		productName: "",
		email: "",
		transRef: "",
		destination: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const mockData = [
		{
			more: "",
			date: "2024-07-26",
			biller: "MTN",
			status: "Successful",
			name: "John Doe",
			username: "johndoe",
			userId: "W001",
			userType: "Regular",
			product: "Airtime",
			amount: 5000,
			channel: "Mobile",
			requestId: "T001",
			transRef: "TR001",
			destination: "12345",
		},
		{
			more: "",
			date: "2024-07-27",
			biller: "Airtel",
			status: "Pending",
			name: "Jane Smith",
			username: "janesmith",
			userId: "W002",
			userType: "Premium",
			product: "Data",
			amount: 2000,
			channel: "Web",
			requestId: "T002",
			transRef: "TR002",
			destination: "67890",
		},
		// Add more mock data as needed
	];
	return (
		<div className='p-4 lg:h-screen h-auto'>
			<h1 className='text-white mb-6'>Filter Transactions</h1>
			<form className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4'>
				<div>
					<label className='text-white mb-4 block'>User ID</label>
					<input
						type='text'
						name='userId'
						value={form.userId}
						onChange={handleChange}
						placeholder='Enter User Id'
						className='w-full p-2 border rounded'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Select Date</label>
					<input
						type='date'
						name='startDate'
						value={form.startDate}
						onChange={handleChange}
						placeholder='dd/mm/yyyy'
						className='w-full p-2 border rounded'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>To</label>
					<input
						type='date'
						name='endDate'
						value={form.endDate}
						onChange={handleChange}
						placeholder='dd/mm/yyyy'
						className='w-full p-2 border rounded'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Select Status</label>
					<select
						name='status'
						value={form.status}
						onChange={handleChange}
						className='w-full p-2 border rounded'
					>
						<option value=''>Select Status</option>
						<option value='successful'>Successful</option>
						<option value='pending'>Pending</option>
						<option value='failed'>Failed</option>
					</select>
				</div>
				<div>
					<label className='text-white mb-4 block'>First Name</label>
					<input
						type='text'
						name='firstName'
						value={form.firstName}
						onChange={handleChange}
						placeholder='Enter First Name'
						className='w-full p-2 border rounded'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Last Name</label>
					<input
						type='text'
						name='lastName'
						value={form.lastName}
						onChange={handleChange}
						placeholder='Enter Last Name'
						className='w-full p-2 border rounded'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Username</label>
					<input
						type='text'
						name='username'
						value={form.username}
						onChange={handleChange}
						placeholder='Enter Username'
						className='w-full p-2 border rounded'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Select Product Name</label>
					<input
						type='text'
						name='productName'
						value={form.productName}
						onChange={handleChange}
						placeholder='Enter Product Name'
						className='w-full p-2 border rounded'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Email</label>
					<input
						type='email'
						name='email'
						value={form.email}
						onChange={handleChange}
						placeholder='Enter Email'
						className='w-full p-2 border rounded'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Transction ID</label>
					<input
						type='text'
						name='transRef'
						value={form.transRef}
						onChange={handleChange}
						placeholder='Enter Transaction ID'
						className='w-full p-2 border rounded'
					/>
				</div>
				<div>
					<label className='text-white mb-4 block'>Destination</label>
					<input
						type='text'
						name='destination'
						value={form.destination}
						onChange={handleChange}
						placeholder='Enter Destination'
						className='w-full p-2 border rounded'
					/>
				</div>
				<div>
					{/* <label className='text-white mb-4  '>Destination</label> */}
					<FaFilter className='text-gray-600 mb-4' size={20} />
					<button className='w-full p-2  border rounded bg-[#868150] text-white'>
						Filter
					</button>
				</div>
			</form>

			<div className='overflow-auto'>
				<h2 className='text-white mb-6'>Tranaction Table</h2>
				<table className='min-w-full p-4 bg-[#1b1b1b] text-white border rounded-lg overflow-x-auto'>
					<thead>
						<tr>
							<th className='px-4 py-2'>More</th>
							<th className='px-4 py-2'>Date</th>
							<th className='px-4 py-2'>Biller</th>
							<th className='px-4 py-2'>Status</th>
							<th className='px-4 py-2'>Name</th>
							<th className='px-4 py-2'>Username</th>
							<th className='px-4 py-2'>Wallet ID</th>
							<th className='px-4 py-2'>User Type</th>
							<th className='px-4 py-2'>Product</th>
							<th className='px-4 py-2'>Amount</th>
							<th className='px-4 py-2'>Channel</th>
							<th className='px-4 py-2'>Request ID</th>
							<th className='px-4 py-2'>Trans Reference</th>
							<th className='px-4 py-2'>Destination</th>
						</tr>
					</thead>
					<tbody>
						{mockData.map((row, index) => (
							<tr key={index} className='border-b border-gray-700'>
								<td className='px-4 py-2'>
									<FaEye className='cursor-pointer' />
								</td>
								<td className='px-4 py-2'>{row.date}</td>
								<td className='px-4 py-2'>{row.biller}</td>
								<td className='px-4 py-2'>{row.status}</td>
								<td className='px-4 py-2'>{row.name}</td>
								<td className='px-4 py-2'>{row.username}</td>
								<td className='px-4 py-2'>{row.userId}</td>
								<td className='px-4 py-2'>{row.userType}</td>
								<td className='px-4 py-2'>{row.product}</td>
								<td className='px-4 py-2'>{row.amount}</td>
								<td className='px-4 py-2'>{row.channel}</td>
								<td className='px-4 py-2'>{row.requestId}</td>
								<td className='px-4 py-2'>{row.transRef}</td>
								<td className='px-4 py-2'>{row.destination}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
