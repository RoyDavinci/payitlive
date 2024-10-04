import React from "react";
import { FaArrowUp } from "react-icons/fa";

export const GridItem = ({
	icon,
	statText,
	valueText,
	description,
	value,
	iconColor,
}) => {
	return (
		<div className='bg-[#1B1B1B] shadow-md rounded-lg p-4 flex flex-col justify-between h-full'>
			<div className='flex justify-between items-center mb-4'>
				<div
					className={`text-2xl ${iconColor} mr-2 p-2 bg-[#313026] rounded-md`}
				>
					{icon}
				</div>
				<div className='flex items-center'>
					<p className='text-[#ACEE91] text-sm mx-2'>{statText}</p>
					<FaArrowUp className='text-[#ACEE91]' />
				</div>
			</div>
			<div>
				<p className='text-[#6C6C6C] text-sm'>{description}</p>
				<h2 className='text-[22px] text-white font-normal mt-1'>{value}</h2>
			</div>
		</div>
	);
};
