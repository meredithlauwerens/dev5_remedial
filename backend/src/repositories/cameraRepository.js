import pool from "../config/database.js";

export async function createCameraRepository(
  userId,
  x,
  y,
  range
) {
  const query = `
    INSERT INTO cameras (user_id, x, y, range)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const result = await pool.query(query, [
    userId,
    x,
    y,
    range,
  ]);

  return result.rows[0];
}

export async function getCamerasRepository() {
  const result = await pool.query(
    "SELECT * FROM cameras ORDER BY id;"
  );

  return result.rows;
}