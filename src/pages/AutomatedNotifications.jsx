import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AutomatedNotifications = () => {
	const [formData, setFormData] = useState({
		event: "",
		method: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"/api/setup-automated-notifications",
				formData
			);
			if (response.status === 200) {
				toast.success("Automated notification set up successfully!");
				setFormData({
					event: "",
					method: "",
					message: "",
				});
			}
		} catch (error) {
			toast.error("Failed to set up automated notification. Please try again.");
		}
	};

	return (
		<div className=' h-screen my-8 p-8 max-w-lg mx-auto bg-gradient-to-br from-[#1B1B1B] to-[#3F3F3F] rounded-lg shadow-xl'>
			<h2 className='text-2xl font-bold text-[#FEF48B] mb-6 text-center'>
				Automated Notifications
			</h2>
			<form onSubmit={handleSubmit}>
				{/* Event Type */}
				<div className='mb-6'>
					<label
						htmlFor='event'
						className='block text-lg text-[#FEF48B] font-medium mb-2'
					>
						Event Type
					</label>
					<select
						id='event'
						name='event'
						value={formData.event}
						onChange={handleChange}
						className='w-full px-4 py-3 border border-[#6C6C6C] bg-[#3F3F3F] text-[#FEF48B] rounded-md focus:ring-2 focus:ring-[#FEF48B] focus:outline-none'
						required
					>
						<option value=''>Select Event</option>
						<option value='low-balance'>Low Balance Alert</option>
						<option value='transaction-confirmation'>
							Transaction Confirmation
						</option>
						<option value='login-attempt'>Login Attempt</option>
					</select>
				</div>

				{/* Notification Method */}
				<div className='mb-6'>
					<label
						htmlFor='method'
						className='block text-lg text-[#FEF48B] font-medium mb-2'
					>
						Notification Method
					</label>
					<select
						id='method'
						name='method'
						value={formData.method}
						onChange={handleChange}
						className='w-full px-4 py-3 border border-[#6C6C6C] bg-[#3F3F3F] text-[#FEF48B] rounded-md focus:ring-2 focus:ring-[#FEF48B] focus:outline-none'
						required
					>
						<option value=''>Select Method</option>
						<option value='email'>Email</option>
						<option value='whatsapp'>WhatsApp</option>
						<option value='sms'>SMS</option>
						<option value='in-app'>In-App</option>
					</select>
				</div>

				{/* Message Template */}
				<div className='mb-6'>
					<label
						htmlFor='message'
						className='block text-lg text-[#FEF48B] font-medium mb-2'
					>
						Message Template
					</label>
					<textarea
						id='message'
						name='message'
						value={formData.message}
						onChange={handleChange}
						placeholder='Enter the message template for this event'
						rows='5'
						className='w-full px-4 py-3 border border-[#6C6C6C] bg-[#3F3F3F] text-[#FEF48B] rounded-md focus:ring-2 focus:ring-[#FEF48B] focus:outline-none'
						required
					></textarea>
				</div>

				{/* Submit Button */}
				<div className='flex justify-center mt-6'>
					<button
						type='submit'
						className='px-6 py-3 bg-[#9ED686] text-[#1B1B1B] font-semibold rounded-md hover:bg-[#6C6C6C] transition-colors'
					>
						Set Up Notification
					</button>
				</div>
			</form>
		</div>
	);
};
