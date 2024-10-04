import React, { useState, useEffect } from "react";
import { FaChevronRight, FaReply } from "react-icons/fa";

// Sample array of complaints with feedback
const complaintsData = [
	// {
	// 	id: 1,
	// 	customerName: "John Doe",
	// 	email: "john.doe@example.com",
	// 	phone: "123-456-7890",
	// 	description: "Issue with incorrect billing.",
	// 	status: "Resolved",
	// 	feedback: [
	// 		{
	// 			id: 1,
	// 			message: "The issue was resolved quickly. Thanks!",
	// 			date: "2024-09-04",
	// 		},
	// 	],
	// },
	// {
	// 	id: 2,
	// 	customerName: "Jane Smith",
	// 	email: "jane.smith@example.com",
	// 	phone: "987-654-3210",
	// 	description: "The app crashes on login.",
	// 	status: "In Progress",
	// 	feedback: [
	// 		{
	// 			id: 1,
	// 			message: "Still having trouble logging in.",
	// 			date: "2024-09-03",
	// 		},
	// 	],
	// },
	// {
	// 	id: 3,
	// 	customerName: "Bob Johnson",
	// 	email: "bob.johnson@example.com",
	// 	phone: "555-123-4567",
	// 	description: "I was charged twice for the same service.",
	// 	status: "Pending",
	// 	feedback: [],
	// },
];

const FeedbackComponent = () => {
	const [complaint, setComplaint] = useState(null);
	const [newFeedback, setNewFeedback] = useState("");

	// Pick a random complaint when the component mounts
	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * complaintsData.length);
		setComplaint(complaintsData[randomIndex]);
	}, []);

	// Handle new feedback submission
	const handleFeedbackSubmit = (e) => {
		e.preventDefault();

		if (newFeedback.trim()) {
			const updatedFeedback = [
				...complaint.feedback,
				{
					id: complaint.feedback.length + 1,
					message: newFeedback,
					date: new Date().toLocaleDateString(),
				},
			];

			setComplaint((prevComplaint) => ({
				...prevComplaint,
				feedback: updatedFeedback,
			}));
			setNewFeedback(""); // Reset feedback input
		}
	};

	// if (!complaint) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<div className='flex flex-col h-screen p-6 bg-[#1B1B1B] text-[#FEF48B]'>
			{complaintsData.length <= 0 && (
				<>
					<div className='flex justify-center flex-col bg-[#3F3F3F] mt-20 h-screen text-white items-center text-center'>
						<h1 className='text-2xl font-bold mb-4 '>Complaint Feedback</h1>
						<h1>No Feedback from complaints yet</h1>
					</div>
				</>
			)}
			{complaintsData.length > 0 && (
				<>
					<div className='flex flex-col bg-[#3F3F3F] p-6 rounded-lg mb-6 shadow-lg'>
						<div className='flex justify-between items-center mb-4'>
							<div className='text-lg font-semibold'>
								{complaint.customerName}
							</div>
							<div className='text-sm text-[#9ED686]'>{complaint.status}</div>
						</div>
						<p className='text-sm text-[#FEF48B] mb-4'>
							<strong>Description:</strong> {complaint.description}
						</p>
						<p className='text-sm text-[#FEF48B]'>
							<strong>Email:</strong> {complaint.email} |{" "}
							<strong>Phone:</strong> {complaint.phone}
						</p>
					</div>

					<div className='flex-grow bg-[#3F3F3F] p-6 rounded-lg shadow-lg overflow-auto'>
						<h2 className='text-lg font-semibold mb-4'>Feedback</h2>
						<div className='space-y-4'>
							{complaint.feedback.length > 0 ? (
								complaint.feedback.map((feedbackItem) => (
									<div
										key={feedbackItem.id}
										className='flex justify-between bg-[#666666] p-4 rounded-lg'
									>
										<div className='text-sm'>{feedbackItem.message}</div>
										<div className='text-sm text-[#9ED686]'>
											{feedbackItem.date}
										</div>
									</div>
								))
							) : (
								<div className='text-sm text-[#FEF48B]'>
									No feedback available yet.
								</div>
							)}
						</div>
					</div>

					{/* Feedback Form */}
					<form
						onSubmit={handleFeedbackSubmit}
						className='mt-6 flex flex-col bg-[#3F3F3F] p-6 rounded-lg shadow-lg'
					>
						<h3 className='text-lg font-semibold mb-4'>Respond to Complaint</h3>
						<textarea
							className='p-3 bg-[#1B1B1B] text-[#FEF48B] rounded-lg border border-[#6C6C6C] mb-4'
							placeholder='Write your feedback...'
							rows={3}
							value={newFeedback}
							onChange={(e) => setNewFeedback(e.target.value)}
						/>
						<button
							type='submit'
							className='bg-[#9ED686] text-[#1B1B1B] p-3 rounded-lg flex items-center justify-center hover:bg-[#FEF48B] transition duration-200'
						>
							<FaReply className='mr-2' />
							Submit Feedback
						</button>
					</form>
				</>
			)}
		</div>
	);
};

export default FeedbackComponent;
