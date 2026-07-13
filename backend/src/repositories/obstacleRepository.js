import pool from "../config/database.js";

export async function getObstaclesRepository() {
	const result = await pool.query(`
		SELECT *
		FROM obstacles
		ORDER BY id;
	`);

	return result.rows;
}