import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
	FaChevronDown,
	FaExchangeAlt,
	FaClipboardList,
	FaCog,
	FaUsersCog,
	FaExclamationCircle,
	FaDollarSign,
	FaChartBar,
} from "react-icons/fa";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAuth } from "../context/AuthContext";

export const Sidebar = () => {
	const [openItems, setOpenItems] = useState({});
	const [path, setPath] = useState("");
	const [id, setId] = useState(1);

	const toggleItem = (id) => {
		setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const location = useLocation();
	const { logout } = useAuth();

	const navigate = useNavigate();

	const handleLogout = () => {
		// logout();
		localStorage.clear();
		navigate("/login");
	};

	const items = [
		{ id: 1, title: "Dashboard", link: "/", icon: DashboardIcon },
		{
			id: 2,
			title: "User Management",
			children: [
				{ id: 1, title: "Users", link: "/users" },
				{
					id: 2,
					title: "Staff",
					link: "/staff",
				},
			],
			icon: AccountCircleOutlinedIcon,
		},
		{
			id: 3,
			title: "Role Management",
			icon: Diversity3Icon,
			children: [{ id: 1, title: "Assign Access", link: "/assign-access" }],
		},
		{
			id: 4,
			title: "Transactions",
			link: "",
			icon: FaExchangeAlt,
			children: [
				{ id: 1, title: "All Transactions", link: "/transactions" },
				{ id: 2, title: "Search by User ID", link: "/user-transactions" },
				{
					id: 3,
					title: "Wallet Management",
					link: "/transaction-management/wallets",
				},
				{
					id: 4,
					title: "User Fund Requests",
					link: "/transaction-management/fund-requests",
				},
				{ id: 5, title: "View Insightful Reports", link: "/reports/insights" },
			],
		},
		{
			id: 5,
			title: "Complaints",
			icon: FaExclamationCircle,
			children: [
				{ id: 1, title: "Complaints Overview", link: "/complaints" },
				{
					id: 2,
					title: "Respond to Feedback",
					link: "/complaints/respond-feedback",
				},
			],
		},
		{
			id: 6,
			title: "Partner Accounts",
			icon: FaExchangeAlt, // Use a suitable icon
			children: [
				{ id: 1, title: "Manage Accounts", link: "/partner-accounts/manage" },
				{
					id: 2,
					title: "Switcher",
					link: "/partner-accounts/switch",
				},
				{ id: 3, title: "Balance Overview", link: "/partner-accounts/balance" },
				{
					id: 4,
					title: "Transaction Monitoring",
					link: "/partner-accounts/transactions",
				},
			],
		},
		{
			id: 7,
			title: "Notifications",
			icon: FaExclamationCircle, // Replace with a suitable icon
			children: [
				{ id: 1, title: "Send Notifications", link: "/notifications/send" },
				{
					id: 2,
					title: "Automated Notifications",
					link: "/notifications/automated",
				},
			],
		},
		{
			id: 8,
			title: "Settings",
			link: "/settings",
			icon: FaCog,
			children: [
				{ id: 1, title: "Audit Trail", link: "/audit" },
				{ id: 2, title: "User Settings", link: "/settings" },
				{ id: 3, title: "Logout", link: "", function: () => handleLogout() },
			],
		},

		// { id: 9, title: "Settings", link: "/settings", icon: FaCog },
	];

	useEffect(() => {
		setPath(location.pathname);
	}, [location]);

	return (
		<div className='h-screen no-scrollbar bg-black text-white flex flex-col'>
			<div className='flex-grow overflow-y-auto no-scrollbar'>
				{items.map((item) => {
					const IconComponent = item.icon;
					const isActive = id === item.id;

					return (
						<div key={item.id}>
							<div
								className={`flex items-center justify-between p-4 cursor-pointer ${
									isActive ? "text-[#FEF48B]" : "text-[#666666]"
								}`}
								onClick={() => {
									setId(item.id);
									if (item.children) {
										toggleItem(item.id);
									} else {
										setOpenItems({});
									}
								}}
							>
								<div>
									<Link
										to={
											item.title !== "Dashboard" && !item.link ? "#" : item.link
										}
										className='flex items-center'
									>
										<IconComponent className={`text-xl`} />
										<span className='ml-4'>{item.title}</span>
									</Link>
								</div>
								{item.children && (
									<div>
										{openItems[item.id] ? (
											<ExpandLessIcon />
										) : (
											<ExpandMoreIcon />
										)}
									</div>
								)}
							</div>
							{item.children && openItems[item.id] && (
								<div className='pl-6'>
									{item.children.map((child) =>
										child.title === "Logout" ? (
											<div
												key={child.id}
												className='block p-2 text-[#FEF48B] hover:bg-gray-700'
												onClick={handleLogout}
											>
												{child.title}
											</div>
										) : (
											<Link
												key={child.id}
												className='block p-2 text-[#FEF48B] hover:bg-gray-700'
												to={child.link}
											>
												{child.title}
											</Link>
										)
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>
			<div className='px-4 py-2 bg-[#1B1B1B]'>
				<div
					className='flex items-center justify-between cursor-pointer'
					onClick={() => handleLogout()}
				>
					<div className='flex items-center'>
						<img
							src='/path/to/user-avatar.jpg' // Replace with actual image URL
							alt='User Avatar'
							className='w-10 h-10 p-2 border border-[#333437] rounded-full'
						/>
						<div className='ml-2'>
							<div className='font-bold'>John Doe</div>
							<div className='text-sm text-gray-400'>john.doe@exa.com</div>
						</div>
					</div>
					<div className='border border-[#808080] bg-[#3F3F3F] rounded-full p-1'>
						<FaChevronDown size={10} color='#808080' />
					</div>
				</div>
			</div>
		</div>
	);
};
