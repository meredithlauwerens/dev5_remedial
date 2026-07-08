import express from "express";
import { getSightings, getSightingsByCamera, getSightingsByNpc } from "../controllers/sightingController.js";

const router = express.Router();

router.get("/", getSightings);
router.get("/cameras/:cameraId", getSightingsByCamera);
router.get("/npcs/:npcId", getSightingsByNpc);

export default router;