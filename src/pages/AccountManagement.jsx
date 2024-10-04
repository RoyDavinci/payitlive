import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const AccountManagement = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const customer = location.state?.customer; // Receive the customer details

	const [formData, setFormData] = useState({
		name: customer?.name || "",
		email: customer?.email || "",
		phone: customer?.phone || "",
		address: customer?.address || "",
		status: customer?.status || "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleUpdate = () => {
		// Handle the update logic here
		// For example, make an API call to update customer details

		// Navigate back to the account overview page
		navigate("/account-overview");
	};

	useEffect(() => {
		if (!customer) {
			navigate("/account-overview");
		}
	}, [customer]);

	return (
		<div className='p-4 bg-[#1B1B1B] flex flex-col h-screen'>
			<header className='mb-4'>
				<h1 className='text-2xl font-bold text-[#FEF48B] mb-2'>
					Manage Account
				</h1>
				<button
					className='bg-[#FEF48B] text-[#1B1B1B] px-4 py-2 rounded-lg flex items-center hover:bg-[#FDE583] transition'
					onClick={() => navigate("/account-overview")}
				>
					<FaArrowLeft className='mr-2' /> Back to Overview
				</button>
			</header>

			<main className='flex-1 overflow-auto'>
				<div className='bg-[#2A2A2A] p-6 rounded-lg mb-6'>
					<h2 className='text-xl font-semibold text-[#FEF48B] mb-4'>
						Customer Information
					</h2>
					<form className='space-y-4'>
						<div>
							<label className='block text-sm text-[#FEF48B] mb-1'>Name</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								className='w-full p-3 border border-[#666666] rounded-lg text-white bg-[#3F3F3F]'
							/>
						</div>
						<div>
							<label className='block text-sm text-[#FEF48B] mb-1'>Email</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								className='w-full p-3 border border-[#666666] rounded-lg text-white bg-[#3F3F3F]'
							/>
						</div>
						<div>
							<label className='block text-sm text-[#FEF48B] mb-1'>Phone</label>
							<input
								type='text'
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								className='w-full p-3 border border-[#666666] rounded-lg text-white bg-[#3F3F3F]'
							/>
						</div>
						<div>
							<label className='block text-sm text-[#FEF48B] mb-1'>
								Address
							</label>
							<input
								type='text'
								name='address'
								value={formData.address}
								onChange={handleChange}
								className='w-full p-3 border border-[#666666] rounded-lg text-white bg-[#3F3F3F]'
							/>
						</div>
						<div>
							<label className='block text-sm text-[#FEF48B] mb-1'>
								Status
							</label>
							<select
								name='status'
								value={formData.status}
								onChange={handleChange}
								className='w-full p-3 border border-[#666666] rounded-lg text-white bg-[#3F3F3F]'
							>
								<option value='Active'>Active</option>
								<option value='Inactive'>Inactive</option>
							</select>
						</div>
						<button
							type='button'
							className='bg-[#FEF48B] text-[#1B1B1B] px-4 py-2 rounded-lg flex items-center hover:bg-[#FDE583] transition'
							onClick={handleUpdate}
						>
							<FaSave className='mr-2' /> Save Changes
						</button>
					</form>
				</div>

				<div className='bg-[#2A2A2A] p-6 rounded-lg mb-6'>
					<h2 className='text-xl font-semibold text-[#FEF48B] mb-4'>
						Linked Accounts
					</h2>
					<p className='text-[#FEF48B]'>
						Manage linked accounts if applicable.
					</p>
				</div>

				<div className='bg-[#2A2A2A] p-6 rounded-lg'>
					<h2 className='text-xl font-semibold text-[#FEF48B] mb-4'>
						Notification Preferences
					</h2>
					<p className='text-[#FEF48B]'>
						Adjust notification preferences if applicable.
					</p>
				</div>
			</main>
		</div>
	);
};

export default AccountManagement;
