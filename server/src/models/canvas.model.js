import mongoose, { Schema } from "mongoose";

const canvasSchema = new Schema({}, { timestamps: true });

export const Canvas = mongoose.model("Canvas", canvasSchema);
