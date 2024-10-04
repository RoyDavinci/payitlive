import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { DashboardComponent } from "./components/DashboardComponent";
import { Users } from "./components/User";
import { Traansactions } from "./pages/Traansactions";
import AuditTrail from "./pages/Audit";
import "react-toastify/dist/ReactToastify.css";
import UserSettings from "./pages/Setting";
import ReportComponent from "./pages/Report";
import { AuthProvider } from "./context/AuthContext";
import { CreateUser } from "./pages/CreateUser";
import AssignAccess from "./pages/AssignAccess";
import ViewCustomers from "./pages/Customers";
import AccountOverview from "./pages/AccountOverview";
import AccountManagement from "./pages/AccountManagement";
import ComplaintsTable from "./pages/Complaints";
import FeedbackComponent from "./pages/Feedback";
import ManageAccounts from "./pages/ManageAccounts";
import SwitcherComponent from "./pages/Switchers";
import BalanceOverview from "./pages/BalanceOverview";
import TransactionMonitoring from "./pages/TransactionMonitoring";
import UserBalances from "./pages/UserBalance";
import TransactionHistory from "./pages/TransactionHistory";
import UserFundRequests from "./pages/WalletFundinc";
import NotFoundPage from "./components/ErrorPage";
import ViewInsightfulReports from "./pages/InsightfulReports";
import CustomReportForm from "./pages/CustomReport";
import { SendNotifications } from "./pages/SendNotifications";
import { AutomatedNotifications } from "./pages/AutomatedNotifications";
import Staff from "./pages/Staff";
import UserTransaction from "./pages/UserTransactions";
import InitiateNewAccountForm from "./pages/InitiateNewAccount";
import CreateAccountForm from "./pages/CreateAccountForm";
import AdminUserStatus from "./pages/UserStatus";
import { Transactions } from "./pages/Transactions";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Dashboard />,
			children: [
				{
					element: <DashboardComponent />,
					path: "/",
				},
				{ path: "/users", element: <Users /> },
				{ path: "/staff", element: <Staff /> },
				{ path: "/create-user", element: <CreateUser /> },
				{
					path: "/user-transactions",
					element: <UserTransaction />,
				},
				{
					path: "/audit",
					element: <AuditTrail />,
				},
				{
					path: "/transactions",
					element: <Transactions />,
				},
				{
					path: "/settings",
					element: <UserSettings />,
				},
				{
					path: "/reports",
					element: <ReportComponent />,
				},
				{
					path: "/assign-access",
					element: <AssignAccess />,
				},
				{
					path: "/view-customers",
					element: <ViewCustomers />,
				},
				{
					path: "/account-overview",
					element: <AccountOverview />,
				},
				{
					path: "/complaints",
					element: <ComplaintsTable />,
				},
				{
					path: "/complaints/respond-feedback",
					element: <FeedbackComponent />,
				},
				{
					path: "/partner-accounts/manage",
					element: <ManageAccounts />,
				},
				{
					path: "/partner-accounts/switch",
					element: <SwitcherComponent />,
				},
				{
					path: "/partner-accounts/balance",
					element: <BalanceOverview />,
				},
				{
					path: "/partner-accounts/transactions",
					element: <TransactionMonitoring />,
				},
				{
					path: "/account-management",
					element: <AccountManagement />,
				},
				{
					path: "/transaction-management/wallets",
					element: <UserBalances />,
				},
				{
					path: "/transaction-management/history",
					element: <TransactionHistory />,
				},
				{
					path: "/transaction-management/fund-requests",
					element: <UserFundRequests />,
				},
				{
					path: "/reports/custom",
					element: <CustomReportForm />,
				},
				{
					path: "/reports/insights",
					element: <ViewInsightfulReports />,
				},
				{
					path: "/notifications/send",
					element: <SendNotifications />,
				},
				{
					path: "/initiate-token",
					element: <InitiateNewAccountForm />,
				},
				{
					path: "/create-test-account",
					element: <CreateAccountForm />,
				},
				{
					path: "/notifications/automated",
					element: <AutomatedNotifications />,
				},

				{
					path: "/user-status/:id",
					element: <AdminUserStatus />,
				},
			],
		},

		{ path: "/login", element: <Login /> },
		{ path: "*", element: <NotFoundPage /> },
	]);
	return (
		<div className='App'>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</div>
	);
}

export default App;
