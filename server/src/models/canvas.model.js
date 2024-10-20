import mongoose, { Schema } from "mongoose";

const canvasSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        history: {
            type: String,
            default: "{[]}",
        },
        shareableLink: {
            type: String,
            unique: true,
            // sparse: true,
        },
        permission: {
            type: String,
            enum: ["view", "edit"],
            default: "view",
        },
    },
    { timestamps: true }
);

export const Canvas = mongoose.model("Canvas", canvasSchema);
