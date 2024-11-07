// socket.js
const { Server } = require("socket.io");
// const AllowedUrl = ["https://crickexpo.in"];
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      method: ["GET", "POST"],
    },
  });

  global.io = io;

  io.on("connection", (socket) => {
    socket.on("userRoom", (userId) => {
      socket.join(userId);
      console.log(`join Room For ${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

  return io;
};

module.exports = { initializeSocket };
