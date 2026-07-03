import {
  getNpcsRepository, updateNpcPositionRepository,
} from "../repositories/npcRepository.js";

function getRandomMove() {
  const moves = [
    { x: 0, y: 1 },   // Up
    { x: 0, y: -1 },  // Down
    { x: 1, y: 0 },   // Right
    { x: -1, y: 0 },  // Left
  ];

  return moves[Math.floor(Math.random() * moves.length)];
}

export function startSimulation() {
    console.log("Simulation started...");

    setInterval(async () => {
        const npcs = await getNpcsRepository();
        
        for (const npc of npcs) {
            const move = getRandomMove();
            const newX = npc.current_x + move.x;
            const newY = npc.current_y + move.y;

            await updateNpcPositionRepository(
                npc.id,
                newX,
                newY
            );

            console.log(
                `${npc.name} moved to (${newX}, ${newY})`
            );
        }
    }, 2000);
}