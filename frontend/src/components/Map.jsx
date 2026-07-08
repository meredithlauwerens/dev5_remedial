import { createCamera } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Map({ cameras, npcs, loadCameras, selectedCamera, setSelectedCamera, npcTrajectory }) {
	const size = 20;

	const { user } = useAuth();

	async function handleCreateCamera(x, y) {
		try {
			await createCamera({
				userId: user.id,
				x,
				y,
				range: 3,
			});

			await loadCameras();
		} catch (error) {
			alert(error.message);
		}
	}

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${size}, 28px)`,
				gap: "2px",
				marginTop: "-70px",
			}}
		>
			{Array.from({ length: size * size }).map((_, index) => {
				const x = index % size;
				const y = Math.floor(index / size);

				const camera = cameras.find((camera) => camera.x === x && camera.y === y);
				const isNpcTrajectoryCamera = npcTrajectory.some((step) => step.camera_x === x && step.camera_y === y);
				const npc = npcs.find((npc) => npc.current_x === x && npc.current_y === y);
				const isSelected = camera?.id === selectedCamera?.id && camera;

				let cellBackground = "white";
				let tileColor = "white";

				if (npc) {
					tileColor = "#4CAF50"; // green
				}

				if (camera) {
					if (camera.user_id === user.id) {
						tileColor = "#2196F3"; // blue (your camera)
					} else {
						tileColor = "#9C27B0"; // purple (other user's camera)
					}
				}

				let inRange = false;

				if (selectedCamera) {
					const dx = x - selectedCamera.x;
					const dy = y - selectedCamera.y;

					const distance = Math.sqrt(dx * dx + dy * dy);

					inRange = distance <= selectedCamera.range;
				}

				if (inRange) {
					cellBackground = "#d9fdd3";
				}

				if (isNpcTrajectoryCamera) {
					cellBackground = "#7aecf9";
				}

				return (
					<div
						key={index}
						onClick={() => {
							const existingCamera = cameras.find((camera) => camera.x === x && camera.y === y);

							if (existingCamera) {
								setSelectedCamera(existingCamera);
							} else {
								handleCreateCamera(x, y);
							}
						}}
						style={{
							width: "28px",
							height: "28px",
							border: isSelected ? "2px solid gold" : "1px solid lightgray",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
							backgroundColor: cellBackground,
						}}
					>
						{(camera || npc) && (
							<div
								style={{
									width: "18px",
									height: "18px",
									borderRadius: "50%",
									backgroundColor: tileColor,
								}}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
