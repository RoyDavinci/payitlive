import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, customer }) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md'>
				<button
					className='absolute top-2 right-2 text-gray-500'
					onClick={onClose}
				>
					<FaTimes size={20} />
				</button>
				<h2 className='text-lg font-bold mb-4'>Customer Details</h2>
				<p>
					<strong>ID:</strong> {customer.customerId}
				</p>
				<p>
					<strong>Name:</strong> {customer.name}
				</p>
				<p>
					<strong>Email:</strong> {customer.email}
				</p>
				<p>
					<strong>Phone:</strong> {customer.phone}
				</p>
				<p>
					<strong>Registration Date:</strong> {customer.registrationDate}
				</p>
				{/* Add more fields if needed */}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
