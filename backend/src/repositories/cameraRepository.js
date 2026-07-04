import pool from "../config/database.js";

export async function createCameraRepository(userId, x, y, range) {
	const query = `
    INSERT INTO cameras (user_id, x, y, range)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

	const result = await pool.query(query, [userId, x, y, range]);

	return result.rows[0];
}

export async function getCamerasRepository() {
	const query = `
        SELECT
            cameras.*,
            users.username
        FROM cameras
        JOIN users
            ON cameras.user_id = users.id
        ORDER BY cameras.id;
    `;

	const result = await pool.query(query);

	return result.rows;
}

export async function getCameraByPositionRepository(x, y) {
	const result = await pool.query("SELECT * FROM cameras WHERE x = $1 AND y = $2", [x, y]);

	return result.rows[0];
}
