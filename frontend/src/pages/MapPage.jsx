import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Map from "../components/Map";
import CameraSidebar from "../components/CameraSidebar";

export default function MapPage() {
	const { user } = useAuth();
	const [selectedCamera, setSelectedCamera] = useState(null);

	return (
		<div>
			<h1>Neighborhood Surveillance</h1>
			<h2>Welcome {user.username}</h2>

			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					gap: "30px",
				}}
			>
				<Map selectedCamera={selectedCamera} setSelectedCamera={setSelectedCamera} />

				<CameraSidebar camera={selectedCamera} currentUser={user} />
			</div>
		</div>
	);
}
