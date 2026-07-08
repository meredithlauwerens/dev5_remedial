import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login as loginApi } from "../services/api";

export default function LoginPage() {
	const [username, setUsername] = useState("");

	const navigate = useNavigate();

	const { login } = useAuth();

	async function handleLogin() {
		if (!username.trim()) {
			alert("Please enter a username.");
			return;
		}

		try {
			const user = await loginApi(username.trim());

			login(user);

			navigate("/map");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			<h1>Neighborhood Surveillance</h1>

			<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

			<button onClick={handleLogin}>Login</button>
		</div>
	);
}
