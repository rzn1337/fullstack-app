import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    console.log(req.body);

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

export { registerUser };
