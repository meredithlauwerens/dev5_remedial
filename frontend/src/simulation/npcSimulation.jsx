import pool from "../config/database.js";

export function startNpcSimulation() {
    setInterval(async () => {
        try {
            const result = await pool.query("SELECT * FROM npcs");

            for (const npc of result.rows) {

                let x = npc.x;
                let y = npc.y;

                const direction = Math.floor(Math.random() * 4);

                switch (direction) {
                    case 0:
                        x++;
                        break;
                    case 1:
                        x--;
                        break;
                    case 2:
                        y++;
                        break;
                    case 3:
                        y--;
                        break;
                }

                // Keep inside the 20x20 map
                x = Math.max(0, Math.min(19, x));
                y = Math.max(0, Math.min(19, y));

                await pool.query(
                    `
                    UPDATE npcs
                    SET x = $1,
                        y = $2
                    WHERE id = $3
                    `,
                    [x, y, npc.id]
                );
            }

            console.log("NPCs moved");

        } catch (error) {
            console.error(error);
        }

    }, 1000);
}