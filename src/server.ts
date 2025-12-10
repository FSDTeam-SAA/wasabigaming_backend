import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import socketIo from'socket.io';
import http from 'http';
import { initializeSocket } from './app/socket';


const PORT = config.port;
const server = http.createServer(app);

const io = initializeSocket(server);
app.set('io', io);

const main = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error('MongoDB URI is not defined in environment variables.');
    }

    const mongo = await mongoose.connect(config.mongoUri);
    console.log(`✅ MongoDB connected: ${mongo.connection.host}`);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error('❌ Error starting server:', error.message || error);
    process.exit(1);
  }
};

main();
