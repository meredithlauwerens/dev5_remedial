import {
  createCameraRepository,
  getCamerasRepository, 
} from "../repositories/cameraRepository.js";
import { getUserByIdRepository } from "../repositories/userRepository.js";

export async function createCameraService(data) {
  const { userId, x, y, range } = data;

  if (
    userId === undefined ||
    x === undefined ||
    y === undefined ||
    range === undefined
  ) {
    throw new Error("All fields are required.");
  }

  const user = await getUserByIdRepository(userId);

    if (!user) {
        const error = new Error("User does not exist.");
        error.status = 404;
        throw error;
    }
  
  if (range <= 0) {
    const error = new Error("Range must be greater than zero.");
    error.status = 400;
    throw error;
  }

  return await createCameraRepository(
    userId,
    x,
    y,
    range
  );
}

export async function getCamerasService() {
  return await getCamerasRepository();
}