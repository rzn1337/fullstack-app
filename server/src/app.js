import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

  // Get all rooms (including default rooms created by Socket.IO)
  const rooms = io.sockets.adapter.rooms;

  // Loop through all rooms and log the users in each room
  rooms.forEach((room, roomId) => {
    // If the room ID is also a socket ID, then it's not a custom room
    if (room.has(socket.id)) {
      console.log(`Skipping room ${roomId}, as it's the socket's own room.`);
    } else {
      // Custom room (created via socket.join())
      const usersInRoom = Array.from(room);

      console.log(`Room ID: ${roomId}`);
      console.log(`Users in this room:`, usersInRoom);
    }
  });

  console.log("Total connected clients:", io.engine.clientsCount);

    socket.on("join-room", (shareableLink) => {
        console.log("shareablelink:", shareableLink);
        socket.join(shareableLink);
        console.log(`A user joined the room ${shareableLink}`);
    });

    socket.on("updateCanvas", (payload) => {
        console.log("updateCanvas", payload);
        socket.to(payload.shareableLink).emit("canvasUpdated", payload.elements)
    });

    socket.on("drawing", ({ shareableLink, drawings }) => {
        socket.to(shareableLink).emit("drawing", drawings);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });

    // socket.on("update", (element) => {
    //     socket.broadcast.emit("update", element);
    //     console.log(element)
    // });
});

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        methods: "GET, POST, PUT, DELETE",
        credentials: true,
    })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

console.log("Express App Started");

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

import canvasRouter from "./routes/canvas.routes.js";
app.use("/api/v1/canvas", canvasRouter);

export default httpServer;
