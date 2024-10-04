import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/");
	};

	return (
		<div className='w-full h-screen bg-[#1B1B1B] flex flex-col items-center justify-center text-[#FEF48B]'>
			<h1 className='text-4xl font-bold mb-4'>404 - Page Not Found</h1>
			<p className='text-lg mb-8'>
				Sorry, the page you're looking for does not exist.
			</p>
			<button
				onClick={handleGoHome}
				className='px-4 py-2 bg-[#9ED686] text-[#1B1B1B] rounded-lg hover:bg-[#6C6C6C]'
			>
				Go Back to Home
			</button>
		</div>
	);
};

export default NotFoundPage;
