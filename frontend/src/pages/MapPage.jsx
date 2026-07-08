import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Map from "../components/Map";
import CameraSidebar from "../components/CameraSidebar";
import { getCameras } from "../services/api";

export default function MapPage() {
	const { user } = useAuth();
	const [selectedCamera, setSelectedCamera] = useState(null);
	const [cameras, setCameras] = useState([]);

	async function loadCameras() {
		const data = await getCameras();
		setCameras(data);
		return data;
	}

	useEffect(() => {
		loadCameras();
	}, []);

	return (
		<div>
			<h1>Neighborhood Surveillance</h1>
			<h2>Welcome {user?.username}</h2>

			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					gap: "30px",
				}}
			>
				<Map cameras={cameras} loadCameras={loadCameras} selectedCamera={selectedCamera} setSelectedCamera={setSelectedCamera} />

				<CameraSidebar camera={selectedCamera} currentUser={user} loadCameras={loadCameras} setSelectedCamera={setSelectedCamera} />
			</div>
		</div>
	);
}
