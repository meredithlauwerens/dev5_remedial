import pool from "../config/database.js";

export async function createUserRepository(username) {
  const query = `
    INSERT INTO users (username)
    VALUES ($1)
    RETURNING *;
  `;

  const result = await pool.query(query, [username]);

  return result.rows[0];
}