import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const SendNotifications = () => {
	const [formData, setFormData] = useState({
		type: "",
		recipients: "",
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
			const response = await axios.post("/api/send-notifications", formData);
			if (response.status === 200) {
				toast.success("Notification sent successfully!");
				setFormData({
					type: "",
					recipients: "",
					message: "",
				});
			}
		} catch (error) {
			toast.error("Failed to send notification. Please try again.");
		}
	};

	return (
		<div className='h-screen my-8 p-8 max-w-lg mx-auto bg-gradient-to-br from-[#1B1B1B] to-[#3F3F3F] rounded-lg shadow-xl'>
			<h2 className='text-2xl font-bold text-[#FEF48B] mb-6 text-center'>
				Send Notifications
			</h2>
			<form onSubmit={handleSubmit}>
				{/* Notification Type */}
				<div className='mb-6'>
					<label
						htmlFor='type'
						className='block text-lg text-[#FEF48B] font-medium mb-2'
					>
						Notification Type
					</label>
					<select
						id='type'
						name='type'
						value={formData.type}
						onChange={handleChange}
						className='w-full px-4 py-3 border border-[#6C6C6C] bg-[#3F3F3F] text-[#FEF48B] rounded-md focus:ring-2 focus:ring-[#FEF48B] focus:outline-none'
						required
					>
						<option value=''>Select Type</option>
						<option value='email'>Email</option>
						<option value='whatsapp'>WhatsApp</option>
						<option value='sms'>SMS</option>
						<option value='in-app'>In-App</option>
					</select>
				</div>

				{/* Recipients */}
				<div className='mb-6'>
					<label
						htmlFor='recipients'
						className='block text-lg text-[#FEF48B] font-medium mb-2'
					>
						Recipients
					</label>
					<input
						type='text'
						id='recipients'
						name='recipients'
						value={formData.recipients}
						onChange={handleChange}
						placeholder='Enter emails or phone numbers'
						className='w-full px-4 py-3 border border-[#6C6C6C] bg-[#3F3F3F] text-[#FEF48B] rounded-md focus:ring-2 focus:ring-[#FEF48B] focus:outline-none'
						required
					/>
				</div>

				{/* Message */}
				<div className='mb-6'>
					<label
						htmlFor='message'
						className='block text-lg text-[#FEF48B] font-medium mb-2'
					>
						Message
					</label>
					<textarea
						id='message'
						name='message'
						value={formData.message}
						onChange={handleChange}
						placeholder='Enter your message here'
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
						Send Notification
					</button>
				</div>
			</form>
		</div>
	);
};
