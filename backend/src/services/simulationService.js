import { getNpcsRepository, updateNpcPositionRepository } from "../repositories/npcRepository.js";
import { getCamerasRepository } from "../repositories/cameraRepository.js";
import { createSightingRepository } from "../repositories/sightingRepository.js";
import { getObstaclesRepository } from "../repositories/obstacleRepository.js";

const MAP_WIDTH = 20;
const MAP_HEIGHT = 20;

// Keeps track of NPC-camera pairs currently in range
const activeDetections = new Set();

function getRandomMove() {
	const moves = [
		{ x: 0, y: 1 }, // Up
		{ x: 0, y: -1 }, // Down
		{ x: 1, y: 0 }, // Right
		{ x: -1, y: 0 }, // Left
	];

	return moves[Math.floor(Math.random() * moves.length)];
}

function isNpcInRange(npc, camera) {
	const dx = npc.current_x - camera.x;
	const dy = npc.current_y - camera.y;

	const distance = Math.sqrt(dx * dx + dy * dy);

	return distance <= camera.range;
}

function hasClearLineOfSight(camera, npc, obstacles) {
	const dx = npc.current_x - camera.x;
	const dy = npc.current_y - camera.y;

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

export function startSimulation() {
	console.log("Simulation started...");

	setInterval(async () => {
		try {
			const npcs = await getNpcsRepository();
			const cameras = await getCamerasRepository();
			const obstacles = await getObstaclesRepository();

			for (const npc of npcs) {
				const move = getRandomMove();

				let newX = npc.current_x + move.x;
				let newY = npc.current_y + move.y;

				// Keep NPC inside the map
				newX = Math.max(0, Math.min(newX, MAP_WIDTH - 1));
				newY = Math.max(0, Math.min(newY, MAP_HEIGHT - 1));
				const blocked = obstacles.some((obstacle) => obstacle.x === newX && obstacle.y === newY) || cameras.some((camera) => camera.x === newX && camera.y === newY);

				if (blocked) {
					continue;
				}

				await updateNpcPositionRepository(npc.id, newX, newY);

				console.log(`${npc.name} moved to (${newX}, ${newY})`);

				for (const camera of cameras) {
					const detectionKey = `${npc.id}-${camera.id}`;

					const movedNpc = {
						...npc,
						current_x: newX,
						current_y: newY,
					};

					const inRange = isNpcInRange(movedNpc, camera);
					const clearSight = hasClearLineOfSight(camera, movedNpc, obstacles);

					if (inRange && clearSight && !activeDetections.has(detectionKey)) {
						activeDetections.add(detectionKey);

						await createSightingRepository(npc.id, camera.id);

						console.log(`${npc.name} entered camera ${camera.id}`);
					}

					if (!inRange) {
						activeDetections.delete(detectionKey);
					}
				}
			}
		} catch (error) {
			console.error("Error during simulation:", error);
		}
	}, 2000);
}
