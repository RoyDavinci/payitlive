import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const auditData = [
	// {
	// 	id: 1,
	// 	user: "John Doe",
	// 	action: "Login",
	// 	timestamp: "2024-08-17 09:45:00",
	// 	status: "Successful",
	// 	details: "User logged in from IP 192.168.1.1",
	// },
	// {
	// 	id: 2,
	// 	user: "Jane Smith",
	// 	action: "Transfer",
	// 	timestamp: "2024-08-17 10:00:00",
	// 	status: "Failed",
	// 	details: "Attempted transfer of $5000 to account 123456789 failed",
	// },
	// {
	// 	id: 3,
	// 	user: "Robert Brown",
	// 	action: "Logout",
	// 	timestamp: "2024-08-17 10:30:00",
	// 	status: "Successful",
	// 	details: "User logged out.",
	// },
	// Add more audit trail data as needed
];

const pageSize = 5; // Number of entries per page

const AuditTrail = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [sortConfig, setSortConfig] = useState({
		key: "timestamp",
		direction: "desc",
	});

	const filteredData = auditData
		.filter(
			(audit) =>
				audit.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
				audit.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
				audit.status.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => {
			if (sortConfig.direction === "asc") {
				return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
			}
			return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
		})
		.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	const totalPages = Math.ceil(auditData.length / pageSize);

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const handlePageChange = (direction) => {
		if (direction === "prev" && currentPage > 1) {
			setCurrentPage(currentPage - 1);
		} else if (direction === "next" && currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div className='bg-black h-screen text-gold p-6 rounded-lg shadow-lg'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-2xl font-bold'>Audit Trail</h2>
				<div className='flex items-center space-x-2'>
					<input
						type='text'
						className='px-4 text-white py-2 rounded-lg border border-gold bg-black text-gold'
						placeholder='Search...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<FiSearch className='text-gold' />
				</div>
			</div>
			<div className='bg-[#1b1b1b] p-4 rounded overflow-auto'>
				{filteredData.length <= 0 && (
					<>
						<div className='flex justify-center text-white items-center text-center'>
							<h1>No Audit Data yet</h1>
						</div>
					</>
				)}

				{filteredData.length > 0 && (
					<>
						<table className='min-w-full bg-[#1b1b1b] text-white table-auto'>
							<thead className='bg-[#222222]'>
								<tr>
									<th className='py-2 px-4 text-justify font-normal text-[14px]'>
										<button
											onClick={() => handleSort("user")}
											className='flex items-center space-x-2'
										>
											<span>User</span>
											{sortConfig.key === "user" &&
												(sortConfig.direction === "asc" ? (
													<AiOutlineSortAscending />
												) : (
													<AiOutlineSortDescending />
												))}
										</button>
									</th>
									<th className='py-2 px-4 text-justify font-normal text-[14px]'>
										<button
											onClick={() => handleSort("action")}
											className='flex items-center space-x-2'
										>
											<span>Action</span>
											{sortConfig.key === "action" &&
												(sortConfig.direction === "asc" ? (
													<AiOutlineSortAscending />
												) : (
													<AiOutlineSortDescending />
												))}
										</button>
									</th>
									<th className='py-2 px-4 text-justify font-normal text-[14px]'>
										<button
											onClick={() => handleSort("timestamp")}
											className='flex items-center space-x-2'
										>
											<span>Timestamp</span>
											{sortConfig.key === "timestamp" &&
												(sortConfig.direction === "asc" ? (
													<AiOutlineSortAscending />
												) : (
													<AiOutlineSortDescending />
												))}
										</button>
									</th>
									<th className='py-2 px-4 text-justify font-normal text-[14px]'>
										<button
											onClick={() => handleSort("status")}
											className='flex items-center space-x-2'
										>
											<span>Status</span>
											{sortConfig.key === "status" &&
												(sortConfig.direction === "asc" ? (
													<AiOutlineSortAscending />
												) : (
													<AiOutlineSortDescending />
												))}
										</button>
									</th>
									<th className='py-2 px-4 text-justify font-normal text-[14px]'>
										Details
									</th>
								</tr>
							</thead>
							<tbody className='border-separate border-spacing-2'>
								{filteredData.length > 0 &&
									filteredData.map((audit) => (
										<tr
											key={audit.id}
											className='hover:bg-gray-800 border-b border-[#2b2b2b] last:border-b-0'
										>
											<td className='py-2 px-4'>{audit.user}</td>
											<td className='py-2 px-4'>{audit.action}</td>
											<td className='py-2 px-4'>{audit.timestamp}</td>
											<td
												className={`py-2 px-4 my-2 text-center rounded-md ${
													audit.status === "Successful"
														? "text-[#ABEB90] bg-[#464D42] px-2 py-1"
														: "text-[#f69c14] bg-[#4B3819] px-2 py-1"
												} block`}
											>
												{audit.status}
											</td>
											<td className='py-2 px-4'>{audit.details}</td>
										</tr>
									))}
							</tbody>
						</table>
						<div className='flex justify-between items-center mt-4'>
							<button
								onClick={() => handlePageChange("prev")}
								disabled={currentPage === 1}
								className='px-4 text-white py-2 bg-[#FEF48B] rounded-lg disabled:opacity-50'
							>
								<BsChevronLeft />
							</button>
							<span className='text-gold'>
								Page {currentPage} of {totalPages}
							</span>
							<button
								onClick={() => handlePageChange("next")}
								disabled={currentPage === totalPages}
								className='px-4 text-white py-2 bg-[#FEF48B] rounded-lg disabled:opacity-50'
							>
								<BsChevronRight />
							</button>
						</div>
					</>
				)}
			</div>
			{/* <div className='overflow-x-auto'>
				<table className='min-w-full bg-black'>
					<thead>
						<tr>
							<th className='text-left py-3 px-4 text-white uppercase font-semibold text-sm text-gold'>
								<button
									onClick={() => handleSort("user")}
									className='flex items-center space-x-2'
								>
									<span>User</span>
									{sortConfig.key === "user" &&
										(sortConfig.direction === "asc" ? (
											<AiOutlineSortAscending />
										) : (
											<AiOutlineSortDescending />
										))}
								</button>
							</th>
							<th className='text-left py-3 px-4 text-white uppercase font-semibold text-sm text-gold'>
								<button
									onClick={() => handleSort("action")}
									className='flex items-center space-x-2'
								>
									<span>Action</span>
									{sortConfig.key === "action" &&
										(sortConfig.direction === "asc" ? (
											<AiOutlineSortAscending />
										) : (
											<AiOutlineSortDescending />
										))}
								</button>
							</th>
							<th className='text-left py-3 px-4 text-white uppercase font-semibold text-sm text-gold'>
								<button
									onClick={() => handleSort("timestamp")}
									className='flex items-center space-x-2'
								>
									<span>Timestamp</span>
									{sortConfig.key === "timestamp" &&
										(sortConfig.direction === "asc" ? (
											<AiOutlineSortAscending />
										) : (
											<AiOutlineSortDescending />
										))}
								</button>
							</th>
							<th className='text-left text-white py-3 px-4 uppercase font-semibold text-sm text-gold'>
								<button
									onClick={() => handleSort("status")}
									className='flex items-center space-x-2'
								>
									<span>Status</span>
									{sortConfig.key === "status" &&
										(sortConfig.direction === "asc" ? (
											<AiOutlineSortAscending />
										) : (
											<AiOutlineSortDescending />
										))}
								</button>
							</th>
							<th className='text-left text-white py-3 px-4 uppercase font-semibold text-sm text-gold'>
								Details
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((audit) => (
							<tr
								key={audit.id}
								className='border-b border-gold hover:bg-gold hover:text-black transition-colors'
							>
								<td className='py-3 px-4 text-white'>{audit.user}</td>
								<td className='py-3 px-4 text-white'>{audit.action}</td>
								<td className='py-3 px-4 text-white'>{audit.timestamp}</td>
								<td
									className={`py-3 px-4 text-white ${
										audit.status === "Successful"
											? "text-green-500"
											: "text-red-500"
									}`}
								>
									{audit.status}
								</td>
								<td className='py-3 px-4 text-white'>{audit.details}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='flex justify-between items-center mt-4'>
				<button
					onClick={() => handlePageChange("prev")}
					disabled={currentPage === 1}
					className='px-4 text-white py-2 bg-gold  rounded-lg disabled:opacity-50'
				>
					<BsChevronLeft />
				</button>
				<span className='text-gold'>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={() => handlePageChange("next")}
					disabled={currentPage === totalPages}
					className='px-4 text-white py-2 bg-gold rounded-lg disabled:opacity-50'
				>
					<BsChevronRight />
				</button>
			</div> */}
		</div>
	);
};

export default AuditTrail;
