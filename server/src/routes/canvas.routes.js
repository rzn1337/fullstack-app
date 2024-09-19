import { Router } from "express";
import {
    createCanvas,
    getUserCanvases,
    getUserCanvas,
    updateUserCanvas,
} from "../controllers/canvas.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-canvas").post(verifyJWT, createCanvas);
router.route("/canvases/:username").get(verifyJWT, getUserCanvases);
router.route("/get-canvas/:id").get(verifyJWT, getUserCanvas);
router.route("/update-canvas/:id").patch(verifyJWT, updateUserCanvas);

export default router;
