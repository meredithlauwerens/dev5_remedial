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
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
				fontFamily: "Arial, sans-serif",
			}}
		>
			<div
				style={{
					backgroundColor: "white",
					padding: "40px",
					borderRadius: "16px",
					boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
					width: "360px",
					textAlign: "center",
				}}
			>
				<h1
					style={{
						color: "#1e3a8a",
						marginBottom: "10px",
					}}
				>
					Neighborhood Surveillance
				</h1>

				<p
					style={{
						color: "#666",
						marginBottom: "30px",
					}}
				>
					Log in to monitor your neighborhood.
				</p>

				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					style={{
						width: "100%",
						padding: "14px",
						marginBottom: "20px",
						borderRadius: "8px",
						border: "1px solid #ccc",
						fontSize: "16px",
						boxSizing: "border-box",
					}}
				/>

				<button
					onClick={handleLogin}
					style={{
						width: "100%",
						padding: "14px",
						backgroundColor: "#2563eb",
						color: "white",
						border: "none",
						borderRadius: "8px",
						fontSize: "16px",
						fontWeight: "bold",
						cursor: "pointer",
					}}
				>
					Login
				</button>
			</div>
		</div>
	);
}
