import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    console.log(req);
    const { username, password, email } = req.body;

    // check if all fields are valid (not null and not empty)
    if (
        [username, password].some((field) => {
            field?.trim() === "";
        })
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // check for an existing user
    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existingUser) {
        throw new ApiError(
            409,
            "User already exists with the provided username or email"
        );
    }

    const createdUser = await User.create({ username, email, password });

    console.log(createdUser);

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }

    const user = await User.findById(createdUser._id).select("-password");

    return res
        .status(201)
        .json(new ApiResponse(201, user, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    console.log(req.body);

    if (!username && !password) {
        throw new ApiError(
            400,
            "Both username and password are required to login"
        );
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    console.log(user);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res, next) => {
    const { user } = req;
    await User.findByIdAndUpdate(
        user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
    const { user } = req;

    if (!user) {
        return new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { user }, "Current user fetched successfully")
        );
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
