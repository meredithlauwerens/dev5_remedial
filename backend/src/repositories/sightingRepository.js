import pool from "../config/database.js";

export async function createSightingRepository(npcId, cameraId) {
	const query = `
    INSERT INTO sightings (npc_id, camera_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

	const result = await pool.query(query, [npcId, cameraId]);

	return result.rows[0];
}

export async function getSightingsRepository() {
	const result = await pool.query("SELECT * FROM sightings ORDER BY detected_at DESC;");

	return result.rows;
}

export async function getSightingsByCameraRepository(cameraId) {
	const query = `
		SELECT
			sightings.id,
			sightings.detected_at,
			CONCAT('NPC ', npcs.id) AS npc_name
		FROM sightings
		JOIN npcs
			ON sightings.npc_id = npcs.id
		WHERE sightings.camera_id = $1
		ORDER BY sightings.detected_at DESC;
	`;

	const result = await pool.query(query, [cameraId]);

	return result.rows;
}

export async function getSightingsByNpcRepository(npcId) {
	const query = `
		SELECT
			sightings.id,
			sightings.detected_at,
			cameras.id AS camera_id,
			cameras.x AS camera_x,
			cameras.y AS camera_y
		FROM sightings
		JOIN cameras
			ON sightings.camera_id = cameras.id
		WHERE sightings.npc_id = $1
		ORDER BY sightings.detected_at ASC;
	`;

	const result = await pool.query(query, [npcId]);

	return result.rows;
}
