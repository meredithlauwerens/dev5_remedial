import { createCamera } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Map({ cameras, npcs, obstacles, loadCameras, selectedCamera, setSelectedCamera, npcTrajectory }) {
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
				background: "white",
				padding: "20px",
				borderRadius: "16px",
				boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
			}}
		>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${size}, 30px)`,
					gap: "3px",
				}}
			>
				{Array.from({ length: size * size }).map((_, index) => {
					const x = index % size;
					const y = Math.floor(index / size);

					const camera = cameras.find((camera) => camera.x === x && camera.y === y);

					const isNpcTrajectoryCamera = npcTrajectory.some((step) => step.camera_x === x && step.camera_y === y);

					const npc = npcs.find((npc) => npc.current_x === x && npc.current_y === y);

					const isSelected = camera?.id === selectedCamera?.id && camera;

					const obstacle = obstacles.find((obstacle) => obstacle.x === x && obstacle.y === y);

					let cellBackground = "#ffffff";
					let tileColor = "white";

					if (npc) {
						tileColor = "#ef4444";
					}

					if (camera) {
						if (camera.user_id === user.id) {
							tileColor = "#2563eb";
						} else {
							tileColor = "#9333ea";
						}
					}

					let visible = false;

					if (selectedCamera) {
						const dx = x - selectedCamera.x;
						const dy = y - selectedCamera.y;

						const distance = Math.sqrt(dx * dx + dy * dy);

						if (distance <= selectedCamera.range) {
							visible = hasClearLineOfSight(selectedCamera, x, y);
						}
					}

					if (visible) {
						cellBackground = "#dcfce7";
					}

					if (isNpcTrajectoryCamera) {
						cellBackground = "#cffafe";
					}

					function hasClearLineOfSight(camera, targetX, targetY) {
						const dx = targetX - camera.x;
						const dy = targetY - camera.y;

						const steps = Math.max(Math.abs(dx), Math.abs(dy));

						if (steps === 0) {
							return true;
						}

						for (let i = 1; i < steps; i++) {
							const x = Math.round(camera.x + (dx * i) / steps);

							const y = Math.round(camera.y + (dy * i) / steps);

							const blocked = obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);

							if (blocked) {
								return false;
							}
						}

						return true;
					}

					return (
						<div
							key={index}
							onClick={() => {
								const existingCamera = cameras.find((camera) => camera.x === x && camera.y === y);

								if (existingCamera) {
									setSelectedCamera(existingCamera);
								} else if (obstacle) {
									alert("You cannot place a camera on an obstacle.");
								} else {
									handleCreateCamera(x, y);
								}
							}}
							style={{
								width: "30px",
								height: "30px",
								backgroundColor: cellBackground,
								border: isSelected ? "2px solid #facc15" : "1px solid #d1d5db",
								borderRadius: "6px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								cursor: "pointer",
								boxSizing: "border-box",
								transition: "all 0.2s ease",
							}}
						>
							{(camera || npc || obstacle) &&
								(obstacle ? (
									<div
										style={{
											width: "18px",
											height: "18px",
											borderRadius: "4px",
											backgroundColor: obstacle.type === "building" ? "#9ca3af" : obstacle.type === "tree" ? "#16a34a" : "#8b5cf6",
										}}
									/>
								) : (
									<div
										style={{
											width: "18px",
											height: "18px",
											borderRadius: "50%",
											backgroundColor: tileColor,
											boxShadow: "0 0 6px rgba(0,0,0,0.25)",
										}}
									/>
								))}
						</div>
					);
				})}
			</div>
		</div>
	);
}
