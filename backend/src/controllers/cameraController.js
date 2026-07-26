import { createCameraService, getCamerasService, updateCameraService, deleteCameraService } from "../services/cameraService.js";

// Handles camera API requests and delegates the business logic to the camera service

export async function createCamera(req, res) {
	try {
		const camera = await createCameraService(req.body);

		res.status(201).json(camera);
	} catch (error) {
		res.status(error.status || 500).json({
			message: error.message,
		});
	}
}

export async function getCameras(req, res) {
	try {
		const cameras = await getCamerasService();

		res.json(cameras);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
}

export async function updateCamera(req, res) {
	try {
		// Only the camera range can be updated through this endpoint
		const camera = await updateCameraService(req.params.id, req.body.range);

		res.json(camera);
	} catch (error) {
		res.status(error.status || 500).json({
			message: error.message,
		});
	}
}

export async function deleteCamera(req, res) {
	try {
		const camera = await deleteCameraService(req.params.id);

		res.json({
			message: "Camera deleted successfully.",
			camera,
		});
	} catch (error) {
		res.status(error.status || 500).json({
			message: error.message,
		});
	}
}
