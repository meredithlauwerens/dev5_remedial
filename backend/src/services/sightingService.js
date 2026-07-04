import { getSightingsRepository } from "../repositories/sightingRepository.js";

export async function getSightingsService() {
  return await getSightingsRepository();
}