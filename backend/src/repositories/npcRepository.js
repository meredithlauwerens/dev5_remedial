import pool from "../config/database.js";

export async function createNpcRepository(name, currentX, currentY) {
  const query = `
    INSERT INTO npcs (name, current_x, current_y)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await pool.query(query, [
    name,
    currentX,
    currentY,
  ]);

  return result.rows[0];
}

export async function getNpcsRepository() {
  const result = await pool.query(
    "SELECT * FROM npcs ORDER BY id;"
  );

  return result.rows;
}

export async function getNpcByNameRepository(name) {
  const result = await pool.query(
    "SELECT * FROM npcs WHERE name = $1;",
    [name]
  );

  return result.rows[0];
}

export async function updateNpcPositionRepository(id, currentX, currentY) {
  const query = `
    UPDATE npcs
    SET current_x = $1,
        current_y = $2
    WHERE id = $3
    RETURNING *;
  `;

  const result = await pool.query(query, [
    currentX,
    currentY,
    id,
  ]);

  return result.rows[0];
}