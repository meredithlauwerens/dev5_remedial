import { useState, useEffect } from "react";
import { updateCamera, deleteCamera, getCameras, getCameraSightings } from "../services/api";
import PropTypes from "prop-types";

export default function CameraSidebar({ camera, currentUser, loadCameras, setSelectedCamera }) {
	const [range, setRange] = useState(camera?.range?.toString() || "");
	const [sightings, setSightings] = useState([]);

	useEffect(() => {
		setRange(camera?.range?.toString() || "");
	}, [camera]);

	useEffect(() => {
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
					width: "280px",
					borderLeft: "1px solid lightgray",
					padding: "20px",
				}}
			>
				<h2>Camera Information</h2>

				<p>Select a camera.</p>
			</div>
		);
	}

	const isOwner = currentUser && camera.user_id === currentUser.id;

	async function handleSave() {
		const value = Number(range);

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
				width: "280px",
				borderLeft: "1px solid lightgray",
				padding: "20px",
			}}
		>
			<h2>Camera Information</h2>

			<p>
				<strong>📷 Camera #{camera.id}</strong>
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

					<input type="number" min="1" max="5" value={range} onChange={(e) => setRange(e.target.value)} />
					<button onClick={handleSave}>Save</button>
					<button onClick={handleDelete}>Delete</button>
				</>
			) : (
				<>
					<p>
						<strong>Range:</strong> {camera.range}
					</p>
				</>
			)}

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
