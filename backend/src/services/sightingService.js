import { getSightingsRepository, getSightingsByCameraRepository } from "../repositories/sightingRepository.js";

export async function getSightingsService() {
  return await getSightingsRepository();
}

export async function getSightingsByCameraService(cameraId) {
  return await getSightingsByCameraRepository(cameraId);
}