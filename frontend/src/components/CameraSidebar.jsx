import { useState, useEffect } from "react";
import { updateCamera, deleteCamera, getCameraSightings } from "../services/api";
import PropTypes from "prop-types";

export default function CameraSidebar({ camera, currentUser, loadCameras, setSelectedCamera }) {
	const [range, setRange] = useState(camera?.range?.toString() || "");
	const [sightings, setSightings] = useState([]);

	useEffect(() => {
		setRange(camera?.range?.toString() || "");
	}, [camera]);

	useEffect(() => {
		// Reload sightings whenever a different camera is selected
		async function loadSightings() {
			if (!camera) {
				setSightings([]);
				return;
			}

			try {
				const data = await getCameraSightings(camera.id);
				setSightings(data);
			} catch (error) {
				console.error(error);
			}
		}

		loadSightings();
	}, [camera]);

	if (!camera) {
		return (
			<div
				style={{
					background: "white",
					borderRadius: 16,
					padding: 20,
					boxShadow: "0 8px 18px rgba(0,0,0,.15)",
					height: "fit-content",
				}}
			>
				<h2>Camera Information</h2>

				<p>Select a camera.</p>
			</div>
		);
	}

	// Only the camera owner can change its range or delete it
	const isOwner = currentUser && camera.user_id === currentUser.id;

	async function handleSave() {
		const value = Number(range);

		// Camera range must stay between 1 and 5
		if (value < 1 || value > 5) {
			alert("Range must be between 1 and 5.");
			return;
		}

		try {
			await updateCamera(camera.id, value);

			const cameras = await loadCameras();
			const updatedCamera = cameras.find((c) => c.id === camera.id);

			setSelectedCamera(updatedCamera);

			alert("Camera updated!");
		} catch (error) {
			console.error(error);
		}
	}

	async function handleDelete() {
		try {
			await deleteCamera(camera.id);

			await loadCameras();

			setSelectedCamera(null);

			alert("Camera deleted");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div
			style={{
				background: "white",
				borderRadius: 16,
				padding: 20,
				boxShadow: "0 8px 18px rgba(0,0,0,.15)",
				height: "fit-content",
			}}
		>
			<h2>Camera Information</h2>

			<p>
				<strong>Camera #{camera.id}</strong>
			</p>

			<p>
				<strong>Owner:</strong> {camera.username}
			</p>

			<p>
				<strong>Position:</strong> ({camera.x}, {camera.y})
			</p>

			{isOwner ? (
				<>
					<p>
						<strong>Range:</strong>
					</p>

					<input
						type="number"
						min="1"
						max="5"
						value={range}
						onChange={(e) => setRange(e.target.value)}
						style={{
							width: "90%",
							padding: "10px 10px",
							borderRadius: 8,
							border: "1px solid #ccc",
							marginBottom: 15,
						}}
					/>
					<button
						onClick={handleSave}
						style={{
							background: "#2563eb",
							color: "white",
							border: "none",
							borderRadius: 8,
							padding: "10px 16px",
							cursor: "pointer",
							marginRight: 10,
						}}
					>
						Save
					</button>
					<button
						onClick={handleDelete}
						style={{
							background: "#dc2626",
							color: "white",
							border: "none",
							borderRadius: 8,
							padding: "10px 16px",
							cursor: "pointer",
						}}
					>
						Delete
					</button>
				</>
			) : (
				<>
					<p>
						<strong>Range:</strong> {camera.range}
					</p>
				</>
			)}

			<p>
				<strong>Total Sightings:</strong> {sightings.length}
			</p>

			<hr />

			<h3>Recent Sightings</h3>

			{sightings.length === 0 ? (
				<p>No sightings yet.</p>
			) : (
				<ul
					style={{
						maxHeight: "220px",
						overflowY: "auto",
						paddingLeft: "20px",
					}}
				>
					{sightings.map((sighting) => (
						<li key={sighting.id}>
							<strong>{sighting.npc_name}</strong>
							<br />
							<small>{new Date(sighting.detected_at).toLocaleString()}</small>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

CameraSidebar.propTypes = {
	camera: PropTypes.shape({
		id: PropTypes.number,
		user_id: PropTypes.number,
		username: PropTypes.string,
		x: PropTypes.number,
		y: PropTypes.number,
		range: PropTypes.number,
	}),
	currentUser: PropTypes.shape({
		id: PropTypes.number.isRequired,
		username: PropTypes.string.isRequired,
	}).isRequired,
	loadCameras: PropTypes.func.isRequired,
	setSelectedCamera: PropTypes.func.isRequired,
};
