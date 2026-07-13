import { getObstaclesService } from "../services/obstacleService.js";

export async function getObstacles(req, res) {
	try {
		const obstacles = await getObstaclesService();

		res.json(obstacles);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
}