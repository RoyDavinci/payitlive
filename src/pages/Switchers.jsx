import React, { useState } from "react";

// Sample data for products and partners
const productData = [
	// {
	// 	productName: "Airtime",
	// 	partners: ["Partner A", "Partner B", "Partner C"],
	// },
	// {
	// 	productName: "Data",
	// 	partners: ["Partner D", "Partner E", "Partner F"],
	// },
	// {
	// 	productName: "Bill Payment",
	// 	partners: ["Partner G", "Partner H", "Partner I"],
	// },
	// {
	// 	productName: "Transfers",
	// 	partners: ["Partner J", "Partner K", "Partner L"],
	// },
	// {
	// 	productName: "Savings",
	// 	partners: ["Partner M", "Partner N", "Partner O"],
	// },
];

const SwitcherComponent = () => {
	// State to store the selected partner for each product
	const [selectedPartners, setSelectedPartners] = useState(() => {
		const initialState = {};
		productData.forEach(
			(product) => (initialState[product.productName] = product.partners[0]) // Set default partner as first option
		);
		return initialState;
	});

	// Function to handle partner switching
	const handleSwitch = (productName, newPartner) => {
		setSelectedPartners((prev) => ({
			...prev,
			[productName]: newPartner,
		}));
	};

	return (
		<div className='h-screen bg-[#1B1B1B] text-white p-6 flex flex-col space-y-6'>
			<h1 className='text-2xl font-bold'>Switch Between Accounts</h1>

			{productData.length <= 0 && (
				<>
					<>
						<div className='flex justify-center flex-col bg-[#3F3F3F] mt-20 h-screen text-white items-center text-center'>
							<h1 className='text-2xl font-bold mb-4 '>Manage Switchers</h1>
							<h1>No Switchers to Manage yet</h1>
						</div>
					</>
				</>
			)}
			{productData.length > 0 && (
				<>
					{" "}
					<div className='flex-1 overflow-auto bg-[#3F3F3F] p-6 rounded-lg shadow-lg space-y-4'>
						{/* Display each product and its partners */}
						{productData.map((product, index) => (
							<div
								key={index}
								className='bg-[#666666] p-4 rounded-lg space-y-2'
							>
								<h2 className='text-lg font-semibold'>{product.productName}</h2>

								<div className='flex items-center justify-between'>
									<span>
										Current Partner:{" "}
										<span className='font-bold'>
											{selectedPartners[product.productName]}
										</span>
									</span>

									{/* Dropdown for selecting a partner */}
									<select
										value={selectedPartners[product.productName]}
										onChange={(e) =>
											handleSwitch(product.productName, e.target.value)
										}
										className='p-2 bg-[#FEF48B] text-black rounded-lg'
									>
										{product.partners.map((partner, i) => (
											<option key={i} value={partner}>
												{partner}
											</option>
										))}
									</select>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default SwitcherComponent;
