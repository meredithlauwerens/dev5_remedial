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

export async function getUsersRepository() {
  const result = await pool.query(
    "SELECT * FROM users ORDER BY id;"
  );

  return result.rows;
}

export async function getUserByUsernameRepository(username) {
  const query = `
    SELECT *
    FROM users
    WHERE username = $1;
  `;

  const result = await pool.query(query, [username]);

  return result.rows[0];
}

export async function getUserByIdRepository(id) {
  const query = `
    SELECT *
    FROM users
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
}