const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors()); // Apply CORS middleware

// Serve the static files from the frontend directory
app.use(express()); 

// Serve the index.html from the frontend directory


let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
    console.log("Listening to port " + port);
});

// Add CORS middleware for Socket.IO
const io = socket(server, { cors: { origin: "http://127.0.0.1:5501" } });

io.on("connection", (socket) => {
    console.log("Socket connection 👍");
    
    socket.on("beginPath", (data) => {
        io.sockets.emit("beginPath", data);
    });

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    });

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    });
});
