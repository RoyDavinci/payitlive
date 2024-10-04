import React, { useState } from "react";
import { FaDownload, FaFilter, FaEdit } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";

const mockCustomers = [
	{
		customerId: "C001",
		name: "Alice Johnson",
		email: "alice.johnson@example.com",
		phone: "+123456789",
		registrationDate: "2024-02-10",
		address: "123 Elm Street, Springfield",
		status: "Active",
		transactions: 32,
	},
	{
		customerId: "C002",
		name: "Bob Smith",
		email: "bob.smith@example.com",
		phone: "+987654321",
		registrationDate: "2024-03-15",
		address: "456 Oak Avenue, Metropolis",
		status: "Inactive",
		transactions: 18,
	},
	{
		customerId: "C003",
		name: "Charlie Davis",
		email: "charlie.davis@example.com",
		phone: "+456789123",
		registrationDate: "2024-04-20",
		address: "789 Pine Road, Gotham",
		status: "Active",
		transactions: 25,
	},
	{
		customerId: "C004",
		name: "Diana Prince",
		email: "diana.prince@example.com",
		phone: "+321654987",
		registrationDate: "2024-05-25",
		address: "101 Maple Street, Smallville",
		status: "Active",
		transactions: 40,
	},
	{
		customerId: "C005",
		name: "Ethan Hunt",
		email: "ethan.hunt@example.com",
		phone: "+654321789",
		registrationDate: "2024-06-30",
		address: "202 Birch Lane, Star City",
		status: "Inactive",
		transactions: 7,
	},
	{
		customerId: "C006",
		name: "Fiona Apple",
		email: "fiona.apple@example.com",
		phone: "+789123456",
		registrationDate: "2024-07-10",
		address: "303 Cedar Drive, Central City",
		status: "Active",
		transactions: 12,
	},
	{
		customerId: "C007",
		name: "George Costanza",
		email: "george.costanza@example.com",
		phone: "+890123456",
		registrationDate: "2024-08-15",
		address: "404 Spruce Avenue, Pine Valley",
		status: "Active",
		transactions: 22,
	},
	{
		customerId: "C008",
		name: "Hannah Montana",
		email: "hannah.montana@example.com",
		phone: "+901234567",
		registrationDate: "2024-09-05",
		address: "505 Elm Street, Riverdale",
		status: "Inactive",
		transactions: 9,
	},
	{
		customerId: "C009",
		name: "Isaac Newton",
		email: "isaac.newton@example.com",
		phone: "+567890123",
		registrationDate: "2024-10-10",
		address: "606 Oak Road, Atlantis",
		status: "Active",
		transactions: 30,
	},
	{
		customerId: "C010",
		name: "Jenna Marbles",
		email: "jenna.marbles@example.com",
		phone: "+678901234",
		registrationDate: "2024-11-20",
		address: "707 Pine Lane, Avalon",
		status: "Active",
		transactions: 14,
	},
];

const AccountOverview = () => {
	const [filter, setFilter] = useState("");
	const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);
	const navigate = useNavigate();

	const handleFilterChange = (e) => {
		const value = e.target.value;
		setFilter(value);

		if (value) {
			setFilteredCustomers(
				mockCustomers.filter((customer) =>
					Object.values(customer).some((val) =>
						val.toString().toLowerCase().includes(value.toLowerCase())
					)
				)
			);
		} else {
			setFilteredCustomers(mockCustomers);
		}
	};

	const handleEditClick = (customer) => {
		navigate("/account-management", { state: { customer } });
	};

	return (
		<div className='p-4 h-screen bg-[#1B1B1B]'>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-[#FEF48B] text-2xl font-bold'>Account Overview</h1>
				<div className='flex space-x-2'>
					<CSVLink
						data={filteredCustomers}
						filename={"customers.csv"}
						className='bg-[#9ED686] text-[#1B1B1B] px-4 py-2 rounded-lg flex items-center hover:bg-[#8DC65C] transition'
					>
						<FaDownload className='mr-2' /> Export
					</CSVLink>
					<button className='bg-[#FEF48B] text-[#1B1B1B] px-4 py-2 rounded-lg flex items-center hover:bg-[#FDE583] transition'>
						<FaFilter className='mr-2' /> Filter
					</button>
				</div>
			</div>
			<div className='mb-4 flex'>
				<input
					type='text'
					placeholder='Search...'
					value={filter}
					onChange={handleFilterChange}
					className='p-2 border border-[#666666] rounded-lg text-white bg-[#3F3F3F] placeholder-gray-400 w-60' // Adjust width here
				/>
			</div>
			<div className='overflow-auto h-[calc(100vh-200px)]'>
				<table className='min-w-full bg-[#1B1B1B] text-white border border-[#666666] rounded-lg'>
					<thead>
						<tr>
							<th className='px-4 py-2 text-sm'>Customer ID</th>
							<th className='px-4 py-2 text-sm'>Name</th>
							<th className='px-4 py-2 text-sm'>Email</th>
							<th className='px-4 py-2 text-sm'>Phone</th>
							<th className='px-4 py-2 text-sm'>Address</th>
							<th className='px-4 py-2 text-sm'>Status</th>
							<th className='px-4 py-2 text-sm'>Transactions</th>
							<th className='px-4 py-2 text-sm'>Manage</th>
						</tr>
					</thead>
					<tbody>
						{filteredCustomers.map((customer, index) => (
							<tr key={index} className='border-b border-[#666666]'>
								<td className='px-4 py-2 text-sm'>{customer.customerId}</td>
								<td className='px-4 py-2 text-sm'>{customer.name}</td>
								<td className='px-4 py-2 text-sm'>{customer.email}</td>
								<td className='px-4 py-2 text-sm'>{customer.phone}</td>
								<td className='px-4 py-2 text-sm'>{customer.address}</td>
								<td
									className={`px-4 py-2 text-sm ${
										customer.status === "Active"
											? "text-[#9ED686]"
											: "text-[#6C6C6C]"
									}`}
								>
									{customer.status}
								</td>
								<td className='px-4 py-2 text-sm'>{customer.transactions}</td>
								<td className='px-4 py-2 text-sm'>
									<button
										className='bg-[#FEF48B] text-[#1B1B1B] text-sm p-2 rounded-lg flex items-center hover:bg-[#FDE583] transition'
										onClick={() => handleEditClick(customer)}
									>
										<FaEdit className='mr-2 text-sm' />{" "}
										<span>Manage Account</span>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AccountOverview;
