import express from "express";
import { getSightings } from "../controllers/sightingController.js";

const router = express.Router();

router.get("/", getSightings);

export default router;