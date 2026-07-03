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
  const result = await pool.query(
    "SELECT * FROM sightings ORDER BY detected_at DESC;"
  );

  return result.rows;
}