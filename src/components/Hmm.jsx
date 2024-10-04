import React, { useState } from "react";
import { DashboardComponent } from "./DashboardComponent";
import { Sidebar } from "./Sidebar";
import Logo from "../assets/default.jpeg";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export const Hmm = () => {
	const [isSidebarVisible, setSidebarVisible] = useState(false);

	const toggleSidebar = () => {
		setSidebarVisible(!isSidebarVisible);
	};
	const handleLanguageChange = (e) => {
		console.log("Selected language:", e.target.value);
	};
	const user = {
		avatar: Logo, // Replace with actual image URL
		name: "John Doe",
		email: "john.doe@example.com",
	};

	const languages = [
		{ code: "en", name: "English" },
		{ code: "yo", name: "Yoruba" },
		{ code: "ig", name: "Igbo" },
		{ code: "ha", name: "Hausa" },
		// Add more languages as needed
	];
	return (
		<>
			<nav className='fixed top-0 z-50 w-full border-b bg-black border-[#1B1B1B]'>
				<div className='px-3 py-3 lg:px-5 lg:pl-3 border-b border-[#333437]'>
					<div className='flex items-center justify-between'>
						<Header
							handleLanguageChange={handleLanguageChange}
							languages={languages}
							user={user}
							toggle={toggleSidebar}
						/>
					</div>
				</div>
			</nav>

			<aside
				id='logo-sidebar'
				className={`fixed  no-scrollbar top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  border-r  bg-black border-[#1B1B1B] ${
					isSidebarVisible ? "translate-x-0" : "-translate-x-full"
				} sm:translate-x-0`}
				// className='fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-black dark:border-[#1B1B1B]'
				aria-label='Sidebar'
			>
				<div className='h-full no-scrollbar px-3 pb-4 overflow-y-auto bg-black'>
					<Sidebar />
				</div>
			</aside>

			<div className='sm:ml-64 no-scrollbar'>
				<div className='p-4 no-scrollbar rounded-lg bg-[#000]  mt-14'>
					<Outlet />
				</div>
			</div>
		</>
	);
};
