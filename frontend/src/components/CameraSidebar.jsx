import { useState, useEffect } from "react";
import { updateCamera, deleteCamera, getCameras } from "../services/api";
import PropTypes from "prop-types";

export default function CameraSidebar({ camera, currentUser, loadCameras, setSelectedCamera }) {
	const [range, setRange] = useState(camera?.range?.toString() || "");

	useEffect(() => {
		setRange(camera?.range?.toString() || "");
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

	const isOwner = camera.user_id === currentUser.id;

	async function handleSave() {
		try {
			await updateCamera(camera.id, Number(range));

			await loadCameras();

			const cameras = await getCameras();
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

					<input type="number" min="1" value={range} onChange={(e) => setRange(e.target.value)} />
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
