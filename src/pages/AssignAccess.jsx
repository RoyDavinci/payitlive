import React, { useState } from "react";

const AssignAccess = () => {
	const [selectedUser, setSelectedUser] = useState("");
	const [role, setRole] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Logic for assigning access based on selectedUser and role
		console.log("Assigning", role, "to", selectedUser);
	};

	return (
		<div className='min-h-screen bg-[#1B1B1B] p-8 flex flex-col items-center'>
			<h1 className='text-4xl font-bold text-[#FEF48B] mb-8'>Assign Access</h1>

			<form
				onSubmit={handleSubmit}
				className='bg-[#3F3F3F] p-8 rounded-lg shadow-md w-full max-w-lg space-y-6'
			>
				<div className='w-full'>
					<label
						htmlFor='user'
						className='block mb-2 text-[#FEF48B] text-sm font-medium'
					>
						Select User
					</label>
					<select
						id='user'
						value={selectedUser}
						onChange={(e) => setSelectedUser(e.target.value)}
						className='block w-full md:max-w-md p-3 border border-[#666666] rounded bg-[#6C6C6C] text-white focus:outline-none focus:border-[#FEF48B]'
					>
						<option value=''>Choose a user</option>
						<option value='1'>John Doe</option>
						<option value='2'>Jane Smith</option>
					</select>
				</div>

				<div className='w-full'>
					<label
						htmlFor='role'
						className='block mb-2 text-[#FEF48B] text-sm font-medium'
					>
						Assign Role
					</label>
					<select
						id='role'
						value={role}
						onChange={(e) => setRole(e.target.value)}
						className='block w-full md:max-w-md p-3 border border-[#666666] rounded bg-[#6C6C6C] text-white focus:outline-none focus:border-[#FEF48B]'
					>
						<option value=''>Choose a role</option>
						<option value='admin'>Admin</option>
						<option value='user'>User</option>
					</select>
				</div>

				<div className='w-full'>
					<button
						type='submit'
						className='w-full md:max-w-md bg-[#9ED686] text-black px-4 py-3 rounded-lg hover:bg-green-500 transition-colors'
					>
						Assign Access
					</button>
				</div>
			</form>
		</div>
	);
};

export default AssignAccess;
