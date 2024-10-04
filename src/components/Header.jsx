import React from "react";
import Logo from "../assets/logo.png";
const Header = ({ user, languages, onLanguageChange, toggle }) => {
	return (
		<div className='w-full h-16 flex items-center justify-between  bg-black text-white px-4'>
			{/* Logo */}
			<div
				className='flex items-center border-r-10  border-[#fff]'
				onClick={() => toggle()}
			>
				<img src={Logo} alt='Logo' className='h-10' />
			</div>

			{/* Right Section */}
			<div className='flex items-center space-x-4'>
				{/* Language Selector */}
				<select
					className='bg-gray-800 text-white p-2 rounded'
					onChange={onLanguageChange}
				>
					{languages.map((language) => (
						<option key={language.code} value={language.code}>
							{language.name}
						</option>
					))}
				</select>

				{/* Notification Icon */}
				<div className='relative'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-5-5.917V5a3 3 0 00-6 0v.083A6.002 6.002 0 002 11v3c0 .538-.214 1.04-.595 1.405L0 17h5m5 0v1a3 3 0 106 0v-1m-6 0h6'
						/>
					</svg>
					<span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>
						3
					</span>
				</div>

				<div className='flex items-center mx-4'>
					<img
						src={user.avatar}
						alt='User Avatar'
						className='w-10 h-10 rounded-full'
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
