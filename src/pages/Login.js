import React, { useCallback, useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from "../config/baseUrl";

export const Login = () => {
	const [showPassword, setShowPassword] = useState(true);
	const [formDetails, setFormDetails] = useState({ email: "", password: "" });
	const { login, user } = useAuth();
	// console.log(login);

	// const { user } = useAuth();

	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormDetails({ ...formDetails, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const isValidEmail = emailRegex.test(formDetails.email);

		if (isValidEmail) {
			try {
				const { email, password } = formDetails;
				const { data } = await axios.post(`${baseUrl.staging}auth/login-user`, {
					email,
					password,
				});

				console.log(data);

				if (!data) {
					toast.error("An Error Occured", {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
				// console.log(data);
				if (data && data.accessToken) {
					console.log(data.accessToken);
					login(data.accessToken);
					localStorage.setItem("payittoken", data.accessToken);
					navigate("/");
					return toast.success("Login Successful", {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			} catch (error) {
				console.log(error.response.data);
				if (!error) {
					toast.error("An Error Occured", {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
				toast.error("Invalid Credentials", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} else {
			toast.error("Invalid email address", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const checlLoginState = useCallback(() => {
		// setLoading(true);
		const token = localStorage.getItem("payittoken");
		if (token) {
			// setLoading(false);
			navigate("/");
		} else {
			// setLoading(false);
			navigate("/login");
		}
	}, [pathname]);

	useEffect(() => {
		const interval = setInterval(() => {
			checlLoginState();
		}, 20);

		// Clean up the interval when the component unmounts
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className='bg-black min-h-screen flex items-center justify-center'>
			<form
				action=''
				className='w-96 p-10 rounded-xl border border-gray-600'
				onSubmit={handleSubmit}
			>
				{/* //add logo here */}
				<div className='flex justify-center items-center mb-4'>
					<img src={Logo} alt='' />
				</div>
				<h1 className='text-white font-bold text-[20px] text-center my-2'>
					Sign In
				</h1>
				<div className='my-4'>
					<label htmlFor='email' className='text-[#7A7A7A] block mb-2'>
						Email
					</label>
					<input
						// type='email'
						className='rounded-3xl w-full px-4 py-3 bg-[#1B1B1B] text-white placeholder-[#838383]'
						id='email'
						placeholder='account@email.com'
						value={formDetails.email}
						name='email'
						onChange={handleChange}
						required
						type='emailwwwwwwwwwwww'
					/>
				</div>
				<div className='my-4'>
					<label htmlFor='email' className='text-[#7A7A7A] block mb-2'>
						Password
					</label>
					<div className='bg-[#1B1B1B] flex justify-between items-center rounded-3xl px-2'>
						<input
							type={showPassword ? "password" : "text"}
							className='px-4 py-3 bg-[#1B1B1B] w-[80%] border-none outline-none rounded-3xl placeholder-[#838383] text-white'
							id='password'
							placeholder='*************'
							value={formDetails.password}
							name='password'
							onChange={handleChange}
							required
						/>
						ww
						<div>
							{showPassword ? (
								<i
									className='fa-solid fa-eye text-white cursor-pointer'
									onClick={() => setShowPassword(!showPassword)}
								></i>
							) : (
								<i
									className='fa-solid fa-eye-slash text-white cursor-pointer'
									onClick={() => setShowPassword(!showPassword)}
								></i>
							)}
						</div>
					</div>
				</div>
				<button className='bg-[#FEF69E] p-3 rounded-full w-full my-4'>
					<span>Login</span>
				</button>
			</form>
			<ToastContainer />
		</div>
	);
};
