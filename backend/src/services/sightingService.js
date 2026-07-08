import { getSightingsRepository, getSightingsByCameraRepository, getSightingsByNpcRepository } from "../repositories/sightingRepository.js";

export async function getSightingsService() {
  return await getSightingsRepository();
}

export async function getSightingsByCameraService(cameraId) {
  return await getSightingsByCameraRepository(cameraId);
}

export async function getSightingsByNpcService(npcId) {
  return await getSightingsByNpcRepository(npcId);
}