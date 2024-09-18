import { Router } from "express";
import { createCanvas, getUserCanvases, getUserCanvas } from "../controllers/canvas.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-canvas").post(verifyJWT, createCanvas);
router.route("/canvases/:username").get(verifyJWT, getUserCanvases);
router.route("/:id").get(verifyJWT, getUserCanvas);

export default router;
