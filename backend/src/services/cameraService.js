import { createCameraRepository, getCamerasRepository, getCameraByPositionRepository, updateCameraRepository, deleteCameraRepository, countUserCamerasRepository } from "../repositories/cameraRepository.js";
import { getUserByIdRepository } from "../repositories/userRepository.js";

export async function createCameraService(data) {
	const { userId, x, y, range } = data;

	if (userId === undefined || x === undefined || y === undefined || range === undefined) {
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

	const existingCamera = await getCameraByPositionRepository(x, y);

	if (existingCamera) {
		const error = new Error("A camera already exists at this position.");
		error.status = 409;
		throw error;
	}

	const cameraCount = await countUserCamerasRepository(userId);

	if (cameraCount >= 5) {
		const error = new Error("You can only own a maximum of 5 cameras.");
		error.status = 400;
		throw error;
	}
	
	return await createCameraRepository(userId, x, y, range);
}

export async function getCamerasService() {
	return await getCamerasRepository();
}

export async function updateCameraService(id, range) {
	if (range < 1 || range > 5) {
		const error = new Error("Range must be between 1 and 5.");
		error.status = 400;
		throw error;
	}

	return await updateCameraRepository(id, range);
}

export async function deleteCameraService(id) {
	const camera = await deleteCameraRepository(id);

	if (!camera) {
		const error = new Error("Camera not found.");
		error.status = 404;
		throw error;
	}

	return camera;
}
