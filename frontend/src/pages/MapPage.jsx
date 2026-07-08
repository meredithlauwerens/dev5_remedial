import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Map from "../components/Map";
import CameraSidebar from "../components/CameraSidebar";
import { getCameras, getNpcs } from "../services/api";

export default function MapPage() {
	const { user } = useAuth();
	const [selectedCamera, setSelectedCamera] = useState(null);
	const [cameras, setCameras] = useState([]);
	const [npcs, setNpcs] = useState([]);
	const userCameraCount = user ? cameras.filter((camera) => camera.user_id === user.id).length : 0;
	
	async function loadCameras() {
		const data = await getCameras();
		setCameras(data);
		return data;
	}

	async function loadNpcs() {
		try {
			const data = await getNpcs();
			setNpcs(data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		loadCameras();
		loadNpcs();
	}, []);

	// Set up an interval to fetch NPCs every 2 seconds (make npcs move live)
	useEffect(() => {
		const interval = setInterval(() => {
			loadNpcs();
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<h1>Neighborhood Surveillance</h1>
			<h2>Welcome {user?.username}</h2>

			<p>📷 Your cameras: {userCameraCount} / 5</p>

			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					gap: "30px",
				}}
			>
				<Map cameras={cameras} npcs={npcs} loadCameras={loadCameras} selectedCamera={selectedCamera} setSelectedCamera={setSelectedCamera} />

				<CameraSidebar camera={selectedCamera} currentUser={user} loadCameras={loadCameras} setSelectedCamera={setSelectedCamera} />
			</div>
		</div>
	);
}
