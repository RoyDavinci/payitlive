import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const UserBalances = () => {
	const [users, setUsers] = useState([]);
	const [showMore, setShowMore] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		// Simulate API call
		const fetchedUsers = [
			// { id: 1, name: "Alice Johnson", balance: 1500 },
			// { id: 2, name: "Bob Smith", balance: 2300 },
			// { id: 3, name: "Charlie Brown", balance: 3200 },
			// { id: 4, name: "David Wilson", balance: 4100 },
			// { id: 5, name: "Eva Green", balance: 5100 },
			// Add more users for testing
		];
		setUsers(fetchedUsers);
		setLoading(false);
	};

	const handleShowMore = () => {
		setShowMore(!showMore);
	};

	return (
		<div className='w-full h-full bg-[#1B1B1B] text-[#FEF48B] p-4'>
			<div className='text-2xl font-bold mt-12'>User Balances</div>
			{users.length <= 0 && (
				<>
					<div className='flex justify-center flex-col bg-[#3F3F3F] mt-4 h-screen text-white items-center text-center'>
						<h1 className='text-2xl font-bold mb-4 '>User Balances</h1>
						<h1>No User Balance to Manage yet</h1>
					</div>
				</>
			)}
			{users.length > 0 && (
				<>
					{" "}
					<div className='overflow-y-auto h-[calc(100vh-80px)]'>
						{loading ? (
							<div>Loading...</div>
						) : (
							<div className='space-y-4'>
								{users.slice(0, showMore ? users.length : 5).map((user) => (
									<div
										key={user.id}
										className='p-4 bg-[#3F3F3F] border border-[#666666] rounded-lg flex justify-between items-center'
									>
										<div className='text-lg font-semibold'>{user.name}</div>
										<div className='text-lg'>{`$${user.balance.toLocaleString()}`}</div>
									</div>
								))}
							</div>
						)}
					</div>
					<button
						className='mt-4 w-full p-2 bg-[#9ED686] text-[#1B1B1B] rounded-lg hover:bg-[#6C6C6C]'
						onClick={handleShowMore}
					>
						{showMore ? "Show Less" : "Show More"}
						<FaChevronDown
							className={`inline-block ml-2 ${showMore ? "rotate-180" : ""}`}
						/>
					</button>
				</>
			)}
		</div>
	);
};

export default UserBalances;
