import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", (req, res) => {
  res.send("User route is working");
});

export default router;