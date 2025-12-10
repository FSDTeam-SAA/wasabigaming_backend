import { Server } from "socket.io";
import { socketHandler } from "./socketHandler";

export const initializeSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    pingTimeout: 60000,
    pingInterval: 25000,
    cors: {
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
    transports: ["websocket", "polling"],
    maxHttpBufferSize: 50 * 1024 * 1024, // 50MB
  });

  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);
    socketHandler(io, socket);
  });

  return io;
};
