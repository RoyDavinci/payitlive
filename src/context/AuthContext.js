import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = (token) => {
		setUser(token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.clear();
		setUser(null);
		setIsAuthenticated(false);
	};

	useEffect(() => {});

	return (
		<AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
