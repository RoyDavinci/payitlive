import React, { useCallback, useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { Hmm } from "../components/Hmm";
import { Loading } from "../components/Loading";

export const Dashboard = () => {
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { pathname } = useLocation();

	const checkLoginState = () => {
		const token = localStorage.getItem("payittoken");
		if (!token) {
			navigate("/login");
		}
	};

	useEffect(() => {
		checkLoginState();
		const interval = setInterval(() => {
			checkLoginState();
		}, 20000);

		// Clean up the interval when the component unmounts
		return () => {
			clearInterval(interval);
		};
	}, [pathname]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='h-screen'>
			<div>
				<Hmm />
			</div>
		</div>
	);
};
