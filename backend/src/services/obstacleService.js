import { getObstaclesRepository } from "../repositories/obstacleRepository.js";

export async function getObstaclesService() {
	return await getObstaclesRepository();
}