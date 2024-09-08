import { Canvas } from "../models/canvas.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Schema } from "mongoose";

const createCanvas = asyncHandler(async (req, res, next) => {
    const { user } = req;
    const { title } = req.body;

    if (!user) {
        return new ApiError(404, "User not found");
    }

    if (!title) {
        return new ApiError(404, "Title is a required field");
    }

    console.log("THISSSSSSSSSSSSSSSSSSSS");
    console.log(user);

    const createdCanvas = await Canvas.create({ owner: user._id, title });

    if (!createdCanvas) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }

    res.status(200).json(
        new ApiResponse(200, { createdCanvas }, "Canvas created successfully")
    );
});

export { createCanvas };
