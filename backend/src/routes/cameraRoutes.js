import express from "express";
import {
  createCamera,
  getCameras, updateCamera, deleteCamera
} from "../controllers/cameraController.js";

const router = express.Router();

router.post("/", createCamera);
router.get("/", getCameras);
router.put("/:id", updateCamera);
router.delete("/:id", deleteCamera);

export default router;