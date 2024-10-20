import { Canvas } from "../models/canvas.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

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

    const shareableLink = uuidv4();

    const createdCanvas = await Canvas.create({
        owner: user._id,
        title,
        shareableLink,
    });

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

    console.log(user._id);

    if (!canvas) {
        throw new ApiError(404, "Canvas not found");
    }

    // if (canvas.owner !== user._id) {
    //     throw new ApiError(401, "Unauthorized request");
    // }

    return res
        .status(200)
        .json(new ApiResponse(200, canvas, "Canvas fetched successfully"));
});

const updateUserCanvas = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { history } = req.body;

    if (!id) {
        throw new ApiError(404, "Canvas not found");
    }

    if (!history) {
        throw new ApiError(404, "History and index fields are required");
    }

    const updatedCanvas = await Canvas.findByIdAndUpdate(
        id,
        {
            $set: {
                history,
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

const generateShareableLink = asyncHandler(async (req, res) => {
    const { permission } = req.body;
    const { id } = req.params;
    const { user } = req;

    console.log(req.body);
    console.log(req.params);
    console.log(req.user);

    if (!permission) {
        throw new ApiError(404, "Specify permission for the shareable link");
    }

    const canvas = await Canvas.findById(id);

    

    if (!canvas) {
        throw new ApiError(
            500,
            "Something went wrong while fetching the canvas"
        );
    }

    if (!canvas.owner.equals(user._id)) {
        throw new ApiError(403, "Unauthorized access");
    }

    console.log();
    console.log(typeof canvas.owner);
    console.log(typeof user._id);

    canvas.permission = permission;

    try {
        await canvas.save();
    } catch (error) {
        throw new ApiError(500, error.message);
    }

    const fullShareableLink = `${process.env.FRONTEND_URL}/share/${canvas.shareableLink}`;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                fullShareableLink,
                "Shareable link generated successfully"
            )
        );
});

const getShareableCanvas = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const shareableCanvas = await Canvas.findOne({
        shareableLink: id,
    }).populate("owner", "username -_id");

    if (!shareableCanvas) {
        throw new ApiError(500, "Canvas not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                shareableCanvas,
                "Shareable canvas fetched successfully"
            )
        );
});

const deleteCanvas = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;

    if (!id) {
        throw new ApiError(404, "Canvas id not found");
    }

    const canvasToBeDeleted = await Canvas.findById(id).populate(
        "owner",
        "_id"
    );

    if (!canvasToBeDeleted) {
        throw new ApiError(404, "Canvas not found");
    }

    if (!canvasToBeDeleted.owner._id.equals(_id)) {
        throw new ApiError(403, "Unauthorized access");
    }

    const canvas = await Canvas.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, "Canvas deleted successfully"));
});

export {
    createCanvas,
    getUserCanvases,
    getUserCanvas,
    updateUserCanvas,
    generateShareableLink,
    getShareableCanvas,
    deleteCanvas,
};
