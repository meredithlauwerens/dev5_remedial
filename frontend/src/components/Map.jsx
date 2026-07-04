import { useEffect, useState } from "react";
import { getCameras, createCamera } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Map({ selectedCamera, setSelectedCamera }) {
	const size = 20;

	const [cameras, setCameras] = useState([]);
	const { user } = useAuth();

	async function loadCameras() {
		try {
			const data = await getCameras();
			setCameras(data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		loadCameras();
	}, []);

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
						}}
					>
						{camera && "📷"}
					</div>
				);
			})}
		</div>
	);
}
