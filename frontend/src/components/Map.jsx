import { createCamera } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Map({ cameras, npcs, loadCameras, selectedCamera, setSelectedCamera }) {
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
			console.error(error);
		}
	}

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${size}, 28px)`,
				gap: "2px",
				marginTop: "20px",
			}}
		>
			{Array.from({ length: size * size }).map((_, index) => {
				const x = index % size;
				const y = Math.floor(index / size);

				const camera = cameras.find((camera) => camera.x === x && camera.y === y);
				const npc = npcs.find((npc) => npc.current_x === x && npc.current_y === y);

				let inRange = false;

				if (selectedCamera) {
					const dx = x - selectedCamera.x;
					const dy = y - selectedCamera.y;

					const distance = Math.sqrt(dx * dx + dy * dy);

					inRange = distance <= selectedCamera.range;
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
							border: "1px solid gray",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
							backgroundColor: inRange ? "#d9fdd3" : "white",
						}}
					>
						{camera ? "📷" : npc ? "👤" : ""}
					</div>
				);
			})}
		</div>
	);
}
