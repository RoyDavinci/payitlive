import React, { useState } from "react";
import { FaEye, FaSearch, FaDownload, FaPlus } from "react-icons/fa";
import Modal from "../components/Modal"; // Adjust the path if necessary

const ViewCustomers = () => {
	const [customers] = useState([
		{
			customerId: "C001",
			name: "Alice Johnson",
			email: "alice.johnson@example.com",
			phone: "+123456789",
			address: "123 Main St, Anytown, USA",
			status: "Active",
			registrationDate: "2024-02-10",
		},
		{
			customerId: "C002",
			name: "Bob Smith",
			email: "bob.smith@example.com",
			phone: "+987654321",
			address: "456 Elm St, Anytown, USA",
			status: "Inactive",
			registrationDate: "2024-03-15",
		},
		{
			customerId: "C003",
			name: "Charlie Davis",
			email: "charlie.davis@example.com",
			phone: "+456789123",
			address: "789 Oak St, Anytown, USA",
			status: "Active",
			registrationDate: "2024-04-20",
		},
		{
			customerId: "C004",
			name: "Diana Green",
			email: "diana.green@example.com",
			phone: "+321654987",
			address: "101 Pine St, Anytown, USA",
			status: "Active",
			registrationDate: "2024-05-25",
		},
		{
			customerId: "C005",
			name: "Edward Black",
			email: "edward.black@example.com",
			phone: "+654321789",
			address: "202 Maple St, Anytown, USA",
			status: "Inactive",
			registrationDate: "2024-06-30",
		},
		{
			customerId: "C006",
			name: "Fiona White",
			email: "fiona.white@example.com",
			phone: "+789123456",
			address: "303 Cedar St, Anytown, USA",
			status: "Active",
			registrationDate: "2024-07-15",
		},
		{
			customerId: "C007",
			name: "George Brown",
			email: "george.brown@example.com",
			phone: "+123789456",
			address: "404 Birch St, Anytown, USA",
			status: "Active",
			registrationDate: "2024-08-10",
		},
		{
			customerId: "C008",
			name: "Hannah Blue",
			email: "hannah.blue@example.com",
			phone: "+987321654",
			address: "505 Spruce St, Anytown, USA",
			status: "Inactive",
			registrationDate: "2024-09-20",
		},
		{
			customerId: "C009",
			name: "Ian Gray",
			email: "ian.gray@example.com",
			phone: "+456123789",
			address: "606 Fir St, Anytown, USA",
			status: "Active",
			registrationDate: "2024-10-05",
		},
		{
			customerId: "C010",
			name: "Judy Gold",
			email: "judy.gold@example.com",
			phone: "+321987654",
			address: "707 Willow St, Anytown, USA",
			status: "Inactive",
			registrationDate: "2024-11-12",
		},
	]);

	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = (customer) => {
		setSelectedCustomer(customer);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedCustomer(null);
	};

	return (
		<div className='p-4 h-screen bg-[#1B1B1B]'>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-[#FEF48B] text-2xl font-bold'>Customers</h1>
				<div className='flex space-x-2'>
					<button className='bg-[#FEF48B] text-[#1B1B1B] px-4 py-2 rounded-lg flex items-center hover:bg-[#FDE583] transition'>
						<FaPlus className='mr-2' /> Add Customer
					</button>
					<button className='bg-[#9ED686] text-[#1B1B1B] px-4 py-2 rounded-lg flex items-center hover:bg-[#8DC65C] transition'>
						<FaDownload className='mr-2' /> Export
					</button>
				</div>
			</div>
			<div className='mb-4 flex'>
				<input
					type='text'
					placeholder='Search...'
					className='p-2 border border-[#666666] rounded-lg text-white bg-[#3F3F3F] placeholder-gray-400 w-60' // Adjust width here
				/>
				<button className='bg-[#FEF48B] text-[#1B1B1B] px-4 py-2 rounded-lg ml-2 hover:bg-[#FDE583] transition'>
					<FaSearch />
				</button>
			</div>
			<div className='overflow-auto h-[calc(100vh-200px)]'>
				{" "}
				{/* Adjust height here */}
				<table className='min-w-full bg-[#1b1b1b] text-white border border-[#333437] rounded-lg'>
					<thead>
						<tr>
							<th className='px-4 py-2 text-sm'>Customer ID</th>
							<th className='px-4 py-2 text-sm'>Name</th>
							<th className='px-4 py-2 text-sm'>Email</th>
							<th className='px-4 py-2 text-sm'>Phone</th>
							<th className='px-4 py-2 text-sm'>Address</th>
							<th className='px-4 py-2 text-sm'>Status</th>
							<th className='px-4 py-2 text-sm'>Registration Date</th>
							<th className='px-4 py-2 text-sm'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{customers.map((customer, index) => (
							<tr key={index} className='border-b border-gray-700'>
								<td className='px-4 py-2 text-sm'>{customer.customerId}</td>
								<td className='px-4 py-2 text-sm'>{customer.name}</td>
								<td className='px-4 py-2 text-sm'>{customer.email}</td>
								<td className='px-4 py-2 text-sm'>{customer.phone}</td>
								<td className='px-4 py-2 text-sm'>{customer.address}</td>
								<td className='px-4 py-2 text-sm'>{customer.status}</td>
								<td className='px-4 py-2 text-sm'>
									{customer.registrationDate}
								</td>
								<td className='px-4 py-2 text-sm'>
									<button
										className='text-[#FEF48B] hover:text-[#FDE583]'
										onClick={() => handleOpenModal(customer)}
									>
										<FaEye />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{selectedCustomer && (
				<Modal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					customer={selectedCustomer}
				/>
			)}
		</div>
	);
};

export default ViewCustomers;
