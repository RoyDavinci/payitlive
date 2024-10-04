import { GridItem } from "./GridItem";
import { FaBook, FaUser, FaRegCalendarAlt } from "react-icons/fa";
import GroupIcon from "@mui/icons-material/Group";

const DashboardGrid = ({ users, transactions }) => {
	const countUsersCreatedToday = (user) => {
		const today = new Date();
		// Get today's date in YYYY-MM-DD format
		const todayString = today.toISOString().split("T")[0];

		return user.filter((user) => {
			const userCreatedAt = new Date(user.createdAt)
				.toISOString()
				.split("T")[0];
			return userCreatedAt === todayString; // Compare only the date part
		}).length; // Count the number of user created today
	};

	const calculateTotalAmount = (transaction) => {
		return transaction.reduce((accumulator, transaction) => {
			return accumulator + Number(transaction.amount); // Assuming `amount` is a number or a string that can be converted to a number
		}, 0);
	};

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 md:p-2'>
			<GridItem
				icon={<FaBook />}
				statText='+27%'
				valueText='Total Transactions'
				description='Total transactions'
				value={`₦ ${calculateTotalAmount(transactions)}`}
				iconColor='text-[#FEF48B]'
			/>
			<GridItem
				icon={<FaBook />}
				statText='+15%'
				valueText='Transaction Volume'
				description='Transaction Volume'
				value={transactions.length}
				iconColor='text-[#FEF48B]'
			/>
			<GridItem
				icon={<GroupIcon />}
				statText='3%'
				valueText='Total Number of Users'
				description='Total number of users'
				value={users.length}
				iconColor='text-[#FEF48B]'
			/>
			<GridItem
				icon={<GroupIcon />}
				statText='5%'
				valueText='Number of Users Registered Today'
				description='Newly registered users'
				value={countUsersCreatedToday(users)}
				iconColor='text-[#FEF48B]'
			/>
		</div>
	);
};

export default DashboardGrid;
