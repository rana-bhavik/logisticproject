import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './config/db';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const server = http.createServer(app);

// WebSockets Setup
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.set('io', io);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect Database
connectDB();

// Basic Route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Platform API is active', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);

// Real-time Telemetry WebSocket Handler
io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);
  
  socket.on('join_shipment', (shipmentId) => {
    socket.join(shipmentId);
    console.log(`[Socket] Client joined tracking room: ${shipmentId}`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`[Server] Core API & WebSockets running on port ${PORT}`);
});
