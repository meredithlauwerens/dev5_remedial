import {
  createNpcRepository,
  getNpcsRepository,
  getNpcByNameRepository,
} from "../repositories/npcRepository.js";

export async function createNpcService(data) {
  const name = data.name?.trim();
  const { currentX, currentY } = data;

  if (!name) {
    const error = new Error("Name is required.");
    error.status = 400;
    throw error;
  }

  if (currentX === undefined || currentY === undefined) {
    const error = new Error("Coordinates are required.");
    error.status = 400;
    throw error;
  }

  const existingNpc = await getNpcByNameRepository(name);

  if (existingNpc) {
    const error = new Error("NPC already exists.");
    error.status = 409;
    throw error;
  }

  return await createNpcRepository(
    name,
    currentX,
    currentY
  );
}

export async function getNpcsService() {
  return await getNpcsRepository();
}