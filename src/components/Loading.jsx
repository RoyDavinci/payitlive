import { BounceLoader } from "react-spinners";

export const Loading = () => {
	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-100 w-full'>
			<BounceLoader size={60} color={"#3490dc"} loading={true} />
			<p className='mt-4 text-blue-500 text-lg font-semibold animate-pulse'>
				Loading...
			</p>
		</div>
	);
};
