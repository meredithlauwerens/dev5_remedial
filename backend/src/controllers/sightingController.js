import { getSightingsService } from "../services/sightingService.js";

export async function getSightings(req, res) {
  try {
    const sightings = await getSightingsService();

    res.json(sightings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}