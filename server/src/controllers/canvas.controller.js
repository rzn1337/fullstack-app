import { Canvas } from "../models/canvas.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Schema } from "mongoose";

const createCanvas = asyncHandler(async (req, res, next) => {
    const { user } = req;
    const { title } = req.body;

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (!title) {
        throw new ApiError(404, "Title is a required field");
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

const getUserCanvases = asyncHandler(async (req, res, next) => {
    const { username } = req.params;

    console.log(req.params);

    // if (!username?.trim()) {
    //     throw new ApiError(404, "Username not found");
    // }

    const userCanvases = await User.aggregate([
        {
            $match: {
                username: username?.trim(),
            },
        },
        {
            $lookup: {
                from: "canvas",
                localField: "_id",
                foreignField: "owner",
                as: "canvases",
            },
        },
        {
            $addFields: {
                canvas_count: {
                    $size: "$canvases",
                },
            },
        },
        {
            $project: {
                canvases: 1,
                canvas_count: 1,
            },
        },
    ]);

    console.log(userCanvases);

    if (!userCanvases?.length) {
        throw new ApiError(
            404,
            "Something went wrong while retrieving canvases"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, userCanvases, "canvases fetched successfully")
        );
});


// TODO: This
const getUserCanvas = asyncHandler(async (req, res, _) => {
    /* canvas id received in req body 
    check if the canvas id exists, 
    if not return if yes, 
    check if the canvas belongs to the user, 
    if no, return unauth 401, 
    if yes return canvas; */

    const { id } = req.params;
    const { user } = req;

    console.log("canvasid: ", id);

    if (!id) {
        throw new ApiError(404, "Canvas not found");
    }

    const canvas = await Canvas.findById(id);

    console.log(canvas?.owner);
    console.log(user._id);

    // if (canvas.owner !== user._id) {
    //     throw new ApiError(401, "Unauthorized request");
    // }

    return res
        .status(200)
        .json(new ApiResponse(200, canvas, "Canvas fetched successfully"));
});

const updateUserCanvas = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { history, index } = req.body;

    if (!id) {
        throw new ApiError(404, "Canvas not found");
    }

    if (!history || !index) {
        throw new ApiError(404, "History and index fields are required");
    }

    const updatedCanvas = await Canvas.findByIdAndUpdate(
        id,
        {
            $set: {
                history,
                index,
            },
        },
        { new: true }
    );

    if (!updatedCanvas) {
        throw new ApiError(
            500,
            "Something went wrong while updating the canvas"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedCanvas, "Canvas updated successfully")
        );
});

export { createCanvas, getUserCanvases, getUserCanvas, updateUserCanvas };
