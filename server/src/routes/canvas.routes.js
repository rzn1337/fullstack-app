import { Router } from "express";
import { createCanvas, getUserCanvases } from "../controllers/canvas.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-canvas").post(verifyJWT, createCanvas);
router.route("/canvases/:username").get(verifyJWT, getUserCanvases);

export default router;
