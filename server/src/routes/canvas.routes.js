import { Router } from "express";
import { createCanvas } from "../controllers/canvas.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-canvas").post(verifyJWT, createCanvas);

export default router;
