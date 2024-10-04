import React, { useState } from "react";
import {
	FaChevronDown,
	FaChevronUp,
	FaDownload,
	FaReply,
} from "react-icons/fa";
import { CSVLink } from "react-csv";

// Sample complaints data
const complaints = [
	// Your complaints data here
	// {
	// 	id: 1,
	// 	customerName: "John Doe",
	// 	email: "john.doe@example.com",
	// 	phone: "123-456-7890",
	// 	description: "Issue with billing where incorrect charges were applied.",
	// 	status: "Pending",
	// 	priority: "High",
	// 	dateRaised: "2024-09-01",
	// 	assignedTo: "Alice Smith",
	// 	resolutionDate: null,
	// 	notes: [
	// 		{ date: "2024-09-02", note: "Initial complaint received." },
	// 		{ date: "2024-09-03", note: "Pending review." },
	// 	],
	// },
	// {
	// 	id: 2,
	// 	customerName: "Jane Smith",
	// 	email: "jane.smith@example.com",
	// 	phone: "987-654-3210",
	// 	description: "Technical issue with the application crashing on login.",
	// 	status: "In Progress",
	// 	priority: "Medium",
	// 	dateRaised: "2024-09-02",
	// 	assignedTo: "Bob Johnson",
	// 	resolutionDate: null,
	// 	notes: [
	// 		{ date: "2024-09-03", note: "Technical team notified." },
	// 		{ date: "2024-09-04", note: "Issue being investigated." },
	// 	],
	// },
	// {
	// 	id: 3,
	// 	customerName: "Bob Johnson",
	// 	email: "bob.johnson@example.com",
	// 	phone: "555-123-4567",
	// 	description: "Request for refund due to double payment.",
	// 	status: "Resolved",
	// 	priority: "Low",
	// 	dateRaised: "2024-09-03",
	// 	assignedTo: "Carol White",
	// 	resolutionDate: "2024-09-05",
	// 	notes: [
	// 		{ date: "2024-09-03", note: "Refund requested." },
	// 		{ date: "2024-09-05", note: "Refund processed and completed." },
	// 	],
	// },
];

const ComplaintRow = ({ complaint }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpand = () => setExpanded(!expanded);

	return (
		<>
			<tr className='cursor-pointer hover:bg-gray-700' onClick={toggleExpand}>
				<td className='p-4 border-b border-gray-600'>{complaint.id}</td>
				<td className='p-4 border-b border-gray-600'>
					{complaint.customerName}
				</td>
				<td className='p-4 border-b border-gray-600'>{complaint.status}</td>
				<td className='p-4 border-b border-gray-600'>{complaint.priority}</td>
				<td className='p-4 border-b border-gray-600'>{complaint.dateRaised}</td>
				<td className='p-4 border-b border-gray-600'>
					{expanded ? <FaChevronUp /> : <FaChevronDown />}
				</td>
			</tr>
			{expanded && (
				<tr>
					<td colSpan='6' className='p-4 bg-gray-800'>
						<div className='text-sm'>
							<div>
								<strong>Email:</strong> {complaint.email}
							</div>
							<div>
								<strong>Phone:</strong> {complaint.phone}
							</div>
							<div>
								<strong>Description:</strong> {complaint.description}
							</div>
							<div>
								<strong>Assigned To:</strong> {complaint.assignedTo}
							</div>
							<div>
								<strong>Resolution Date:</strong>{" "}
								{complaint.resolutionDate || "Not resolved yet"}
							</div>
							<div>
								<strong>Notes:</strong>
							</div>
							<ul className='list-disc pl-4'>
								{complaint.notes.map((note, index) => (
									<li key={index}>
										<strong>{note.date}:</strong> {note.note}
									</li>
								))}
							</ul>
						</div>
					</td>
				</tr>
			)}
		</>
	);
};

const ComplaintsTable = () => {
	const [filterStatus, setFilterStatus] = useState("All");
	const [filterPriority, setFilterPriority] = useState("All");

	const filteredComplaints = complaints.filter((complaint) => {
		return (
			(filterStatus === "All" || complaint.status === filterStatus) &&
			(filterPriority === "All" || complaint.priority === filterPriority)
		);
	});

	return (
		<div className='flex flex-col h-screen bg-[#1B1B1B] text-[#FEF48B]'>
			<div className='p-6 bg-[#3F3F3F]'>
				<h1 className='text-2xl font-bold mb-4'>Complaints Management</h1>
				<div className='flex items-center justify-between'>
					<div className='flex items-center mb-4'>
						<button className='bg-[#9ED686] text-[#1B1B1B] p-2 rounded flex items-center mr-4'>
							<FaReply className='mr-2' />
							Respond to Complaints
						</button>
						<CSVLink
							data={complaints.map((c) => ({
								ID: c.id,
								CustomerName: c.customerName,
								Status: c.status,
								Priority: c.priority,
								DateRaised: c.dateRaised,
								AssignedTo: c.assignedTo,
								ResolutionDate: c.resolutionDate || "Not resolved yet",
								Description: c.description,
							}))}
							filename={"complaints.csv"}
							className='flex items-center bg-[#9ED686] text-[#1B1B1B] p-2 rounded'
						>
							<FaDownload className='mr-2' />
							Download CSV
						</CSVLink>
					</div>
					<div className='flex items-center mb-4'>
						<div className='mr-4'>
							<label className='mr-2'>Status:</label>
							<select
								className='bg-[#3F3F3F] text-[#FEF48B] border border-gray-600 p-2 rounded'
								value={filterStatus}
								onChange={(e) => setFilterStatus(e.target.value)}
							>
								<option value='All'>All</option>
								<option value='Pending'>Pending</option>
								<option value='In Progress'>In Progress</option>
								<option value='Resolved'>Resolved</option>
							</select>
						</div>
						<div>
							<label className='mr-2'>Priority:</label>
							<select
								className='bg-[#3F3F3F] text-[#FEF48B] border border-gray-600 p-2 rounded'
								value={filterPriority}
								onChange={(e) => setFilterPriority(e.target.value)}
							>
								<option value='All'>All</option>
								<option value='High'>High</option>
								<option value='Medium'>Medium</option>
								<option value='Low'>Low</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div className='flex-grow overflow-y-auto'>
				{filteredComplaints.length <= 0 && (
					<>
						<div className='flex justify-center text-white items-center text-center'>
							<h1>No Issues yet</h1>
						</div>
					</>
				)}
				{filteredComplaints.length > 0 && (
					<>
						<table className='w-full border-collapse bg-[#3F3F3F]'>
							<thead>
								<tr>
									<th className='p-4 border-b border-gray-600'>ID</th>
									<th className='p-4 border-b border-gray-600'>
										Customer Name
									</th>
									<th className='p-4 border-b border-gray-600'>Status</th>
									<th className='p-4 border-b border-gray-600'>Priority</th>
									<th className='p-4 border-b border-gray-600'>Date Raised</th>
									<th className='p-4 border-b border-gray-600'>Details</th>
								</tr>
							</thead>
							<tbody>
								{filteredComplaints.map((complaint) => (
									<ComplaintRow key={complaint.id} complaint={complaint} />
								))}
							</tbody>
						</table>
					</>
				)}
			</div>
		</div>
	);
};

export default ComplaintsTable;
