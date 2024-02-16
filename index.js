const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();

const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const queryString = require("querystring");
const frontendUrl = "http://localhost:5173";


app.use(express.json());




// socketio connect  start
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages
  socket.on("message", (message) => {
    console.log("Message received:", message);
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });
  socket.on('refetch', (message) => {
    console.log('Message received:', message);
    // Broadcast the message to all connected clients
    io.emit('refetch', message);
  });


  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
// socketio connect  end



server.listen(port, () => {
  console.log(`Fitness are Running on port ${port}`);
});
