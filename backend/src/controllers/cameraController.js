import {
  createCameraService,
  getCamerasService,
} from "../services/cameraService.js";

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