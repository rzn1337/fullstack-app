import { Router } from "express";
import {
    createCanvas,
    getUserCanvases,
    getUserCanvas,
    updateUserCanvas,
    generateShareableLink,
    getShareableCanvas,
} from "../controllers/canvas.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-canvas").post(verifyJWT, createCanvas);
router.route("/canvases/:username").get(verifyJWT, getUserCanvases);
router.route("/get-canvas/:id").get(verifyJWT, getUserCanvas);
router.route("/update-canvas/:id").patch(verifyJWT, updateUserCanvas);
router.route("/:id/share").post(verifyJWT, generateShareableLink);
router.route("/share/:id").get(verifyJWT, getShareableCanvas);

export default router;
