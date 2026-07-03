import express from "express";
import {
  createCamera,
  getCameras,
} from "../controllers/cameraController.js";

const router = express.Router();

router.post("/", createCamera);
router.get("/", getCameras);

export default router;