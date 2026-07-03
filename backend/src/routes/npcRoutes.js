import express from "express";
import {
  createNpc,
  getNpcs,
} from "../controllers/npcController.js";

const router = express.Router();

router.post("/", createNpc);
router.get("/", getNpcs);

export default router;