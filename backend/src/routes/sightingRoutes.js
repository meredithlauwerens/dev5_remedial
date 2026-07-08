import express from "express";
import { getSightings, getSightingsByCamera } from "../controllers/sightingController.js";

const router = express.Router();

router.get("/", getSightings);
router.get("/cameras/:cameraId", getSightingsByCamera);

export default router;