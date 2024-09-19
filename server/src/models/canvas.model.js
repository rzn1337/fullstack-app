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
        index: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Canvas = mongoose.model("Canvas", canvasSchema);
