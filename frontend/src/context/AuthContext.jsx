import { createContext, useContext, useState } from "react";

// Provides authentication state and actions to components throughout the app
const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	function login(userData) {
		setUser(userData);
	}

	function logout() {
		setUser(null);
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}