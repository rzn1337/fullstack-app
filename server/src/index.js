import dotenv from "dotenv";
import connectDB from "./db/index.js";
import httpServer from "./app.js";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        httpServer.on("error", (error) => {
            console.log("MongoDB Connection ERROR: ", error);
            throw error;
        });

        httpServer.listen(process.env.PORT || 8000, () => {
            console.log(`Server listening on port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });
