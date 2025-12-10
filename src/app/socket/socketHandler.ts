import { Server, Socket } from "socket.io";

declare module "socket.io" {
  interface Socket {
    userId?: string;
  }
}

export const socketHandler = (io: Server, socket: Socket) => {

    
    socket.on("join-user", (data) => {
    const userId = data?.userId;

    if (!userId) {
      console.log("❌ Join event received without userId");
      return;
    }

    const userRoom = `user:${userId}`;
    socket.join(userRoom);
    socket.userId = userId;

    console.log(`👤 User ${userId} joined personal room: ${userRoom}`);

    socket.emit("joined", {
      success: true,
      room: userRoom,
      message: "Successfully joined user room",
    });
  });

  socket.on("disconnect", () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
};
