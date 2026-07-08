import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Map from "../components/Map";
import CameraSidebar from "../components/CameraSidebar";
import { getCameras, getNpcs, getNpcSightings } from "../services/api";
import LegendItem from "../components/LegendItem";
import NpcTrajectorySidebar from "../components/NpcTrajectorySidebar";

export default function MapPage() {
	const { user } = useAuth();
	const [selectedCamera, setSelectedCamera] = useState(null);
	const [cameras, setCameras] = useState([]);
	const [npcs, setNpcs] = useState([]);
	const userCameraCount = user ? cameras.filter((camera) => camera.user_id === user.id).length : 0;
	const [npcTrajectory, setNpcTrajectory] = useState([]);
	const [selectedNpc, setSelectedNpc] = useState(null);

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

	async function handleNpcChange(e) {
		const npcId = e.target.value;

		setSelectedNpc(npcId);

		if (!npcId) {
			setNpcTrajectory([]);
			return;
		}

		try {
			const data = await getNpcSightings(npcId);
			setNpcTrajectory(data);
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
		<div
			style={{
				maxWidth: "1300px",
				margin: "0 auto",
			}}
		>
			<h1>Neighborhood Surveillance</h1>
			<h2>Welcome {user?.username}</h2>

			<br />

			<p>📷 Your cameras: {userCameraCount} / 5</p>

			<br />

			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					gap: "50px",
				}}
			>
				{/* Legend */}
				<div
					style={{
						width: "180px",
						border: "1px solid lightgray",
						padding: "15px",
						borderRadius: "8px",
					}}
				>
					<h3>Legend</h3>

					<LegendItem type="circle" color="#2196F3" text="Your Camera" />
					<br />
					<LegendItem type="circle" color="#9C27B0" text="Other Camera" />
					<br />
					<LegendItem type="circle" color="#4CAF50" text="NPC" />
					<br />
					<LegendItem type="square" color="#DFF5E1" text="Camera Range" />
					<br />
					<LegendItem type="selected" color="gold" text="Selected Camera" />
				</div>

				{/* Map */}
				<Map cameras={cameras} npcs={npcs} npcTrajectory={npcTrajectory} loadCameras={loadCameras} selectedCamera={selectedCamera} setSelectedCamera={setSelectedCamera} />

				{/* Sidebar */}
				<CameraSidebar camera={selectedCamera} currentUser={user} loadCameras={loadCameras} setSelectedCamera={setSelectedCamera} />

				<NpcTrajectorySidebar npcs={npcs} selectedNpc={selectedNpc} setSelectedNpc={setSelectedNpc} npcTrajectory={npcTrajectory} setNpcTrajectory={setNpcTrajectory} />
			</div>
		</div>
	);
}
