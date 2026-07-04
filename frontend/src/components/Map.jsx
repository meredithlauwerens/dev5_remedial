import { useEffect, useState } from "react";
import { getCameras } from "../services/api";

export default function Map() {
	const size = 20;

	const [cameras, setCameras] = useState([]);

	useEffect(() => {
		async function loadCameras() {
			const data = await getCameras();
			setCameras(data);
		}

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

				return (
					<div
						key={index}
						onClick={() => {
							console.log(`Clicked (${x}, ${y})`);
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
