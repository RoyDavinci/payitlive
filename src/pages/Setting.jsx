import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { BsCloudUpload } from "react-icons/bs";
import { Switch, MenuItem, Select } from "@mui/material";

const UserSettings = () => {
	const [users, setUsers] = useState([
		{
			id: 1,
			fullName: "John Doe",
			email: "john.doe@example.com",
			phone: "123-456-7890",
			gender: "Male",
			role: "Admin",
			tier: "Premium",
			dateRegistered: "2023-07-15",
			status: "active",
		},
		// Add more user objects as needed
	]);

	const [selectedUserId, setSelectedUserId] = useState(users[0]?.id);
	const [isEditing, setIsEditing] = useState(false);
	const [isActive, setIsActive] = useState(users[0]?.status === "active");
	const [userForm, setUserForm] = useState(users[0]);

	const handleToggleStatus = () => {
		setIsActive((prevStatus) => !prevStatus);
	};

	const handleSaveChanges = () => {
		setUsers((prevUsers) =>
			prevUsers.map((user) =>
				user.id === selectedUserId
					? { ...user, ...userForm, status: isActive ? "active" : "inactive" }
					: user
			)
		);
		setIsEditing(false);
	};

	const handleTierChange = (event) => {
		setUserForm({ ...userForm, tier: event.target.value });
	};

	return (
		<div className='min-h-screen bg-[#1b1b1b] text-white'>
			<div className='container mx-auto px-4 py-6'>
				{/* User Selection */}
				<div className='bg-[#222222] rounded-lg p-6 mb-6'>
					<h2 className='text-xl font-semibold mb-4'>Select User</h2>
					<Select
						value={selectedUserId}
						onChange={(e) => {
							const selectedUser = users.find(
								(user) => user.id === e.target.value
							);
							setSelectedUserId(e.target.value);
							setUserForm(selectedUser);
							setIsActive(selectedUser.status === "active");
						}}
						className='w-full bg-[#2b2b2b] text-white border border-[#666666] rounded-lg'
					>
						{users.map((user) => (
							<MenuItem key={user.id} value={user.id}>
								{user.fullName}
							</MenuItem>
						))}
					</Select>
				</div>

				{/* Profile Section */}
				<div className='bg-[#222222] rounded-lg p-6 mb-6 flex items-center'>
					<div className='relative'>
						<img
							src='https://via.placeholder.com/100' // Placeholder for profile picture
							alt='Profile'
							className='w-24 h-24 rounded-full object-cover border-4 border-[#FEF48B]'
						/>
						<label className='absolute bottom-0 right-0 bg-[#FEF48B] p-2 rounded-full cursor-pointer'>
							<BsCloudUpload className='text-black' />
							<input
								type='file'
								className='hidden'
								onChange={(e) => console.log(e.target.files[0])} // Handle file upload here
							/>
						</label>
					</div>
					<div className='ml-6'>
						<h1 className='text-2xl font-semibold mb-2'>{userForm.fullName}</h1>
						<p className='text-lg text-[#ABEB90]'>Role: {userForm.role}</p>
					</div>
				</div>

				{/* User Details Section */}
				<div className='bg-[#2b2b2b] rounded-lg p-6 mb-6'>
					<h2 className='text-xl font-semibold mb-4 flex items-center'>
						User Details
						{isEditing ? (
							<AiOutlineSave
								onClick={handleSaveChanges}
								className='ml-4 text-green-500 cursor-pointer'
							/>
						) : (
							<AiOutlineEdit
								onClick={() => setIsEditing(true)}
								className='ml-4 text-yellow-500 cursor-pointer'
							/>
						)}
					</h2>
					<div className='space-y-4'>
						{isEditing ? (
							<>
								<div>
									<label className='block text-sm text-[#6C6C6C]'>
										Full Name
									</label>
									<input
										type='text'
										value={userForm.fullName}
										onChange={(e) =>
											setUserForm({ ...userForm, fullName: e.target.value })
										}
										className='text-lg bg-[#1b1b1b] border-b border-[#6C6C6C] text-white focus:outline-none'
									/>
								</div>
								<div>
									<label className='block text-sm text-[#6C6C6C]'>Email</label>
									<input
										type='text'
										value={userForm.email}
										onChange={(e) =>
											setUserForm({ ...userForm, email: e.target.value })
										}
										className='text-lg bg-[#1b1b1b] border-b border-[#6C6C6C] text-white focus:outline-none'
									/>
								</div>
								<div>
									<label className='block text-sm text-[#6C6C6C]'>Phone</label>
									<input
										type='text'
										value={userForm.phone}
										onChange={(e) =>
											setUserForm({ ...userForm, phone: e.target.value })
										}
										className='text-lg bg-[#1b1b1b] border-b border-[#6C6C6C] text-white focus:outline-none'
									/>
								</div>
								<div>
									<label className='block text-sm text-[#6C6C6C]'>Gender</label>
									<input
										type='text'
										value={userForm.gender}
										onChange={(e) =>
											setUserForm({ ...userForm, gender: e.target.value })
										}
										className='text-lg bg-[#1b1b1b] border-b border-[#6C6C6C] text-white focus:outline-none'
									/>
								</div>
							</>
						) : (
							<>
								<div>
									<label className='block text-sm text-[#6C6C6C]'>
										Full Name
									</label>
									<p className='text-lg'>{userForm.fullName}</p>
								</div>
								<div>
									<label className='block text-sm text-[#6C6C6C]'>Email</label>
									<p className='text-lg'>{userForm.email}</p>
								</div>
								<div>
									<label className='block text-sm text-[#6C6C6C]'>Phone</label>
									<p className='text-lg'>{userForm.phone}</p>
								</div>
								<div>
									<label className='block text-sm text-[#6C6C6C]'>Gender</label>
									<p className='text-lg'>{userForm.gender}</p>
								</div>
							</>
						)}
					</div>
				</div>

				{/* Account Settings Section */}
				<div className='bg-[#2b2b2b] rounded-lg p-6 mb-6'>
					<h2 className='text-xl font-semibold mb-4'>Account Settings</h2>
					<div className='space-y-4'>
						<div>
							<label className='block text-sm text-[#6C6C6C]'>Tier</label>
							<Select
								value={userForm.tier}
								onChange={handleTierChange}
								className='w-full bg-[#1b1b1b] text-white border border-[#666666] rounded-lg'
							>
								<MenuItem value='Basic'>Basic</MenuItem>
								<MenuItem value='Standard'>Standard</MenuItem>
								<MenuItem value='Premium'>Premium</MenuItem>
							</Select>
						</div>
						<div>
							<label className='block text-sm text-[#6C6C6C]'>
								Date Registered
							</label>
							<p className='text-lg'>{userForm.dateRegistered}</p>
						</div>
						<div className='flex items-center'>
							<label className='block text-sm text-[#6C6C6C] mr-4'>
								Status
							</label>
							<Switch
								checked={isActive}
								onChange={handleToggleStatus}
								color='default'
								inputProps={{ "aria-label": "status toggle" }}
								sx={{
									"& .MuiSwitch-thumb": {
										backgroundColor: isActive ? "#ABEB90" : "#f69c14",
									},
								}}
							/>
							<p
								className={`text-lg font-semibold ${
									isActive ? "text-[#ABEB90]" : "text-[#f69c14]"
								}`}
							>
								{isActive ? "Active" : "Inactive"}
							</p>
						</div>
					</div>
				</div>

				{/* Save Button */}
				<div className='flex justify-end mt-6'>
					<button
						onClick={handleSaveChanges}
						className='px-6 py-2 bg-[#FEF48B] text-black font-semibold rounded-lg hover:bg-[#e3d77e]'
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserSettings;
