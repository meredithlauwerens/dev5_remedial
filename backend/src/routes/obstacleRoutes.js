import express from "express";
import { getObstacles } from "../controllers/obstacleController.js";

const router = express.Router();

router.get("/", getObstacles);

export default router;