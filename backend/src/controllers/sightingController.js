import { getSightingsService, getSightingsByCameraService } from "../services/sightingService.js";

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

export async function getSightingsByCamera(req, res) {
	try {
		const sightings = await getSightingsByCameraService(
			req.params.cameraId
		);

		res.json(sightings);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
}