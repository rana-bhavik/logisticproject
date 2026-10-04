import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import ordersRoutes from './routes/orders';
import shipmentsRoutes from './routes/shipments';
import fleetRoutes from './routes/fleet';
import warehouseRoutes from './routes/warehouse';
import financeRoutes from './routes/finance';
import aiRoutes from './routes/ai';
import usersRoutes from './routes/users';

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

// Mount Enterprise API Modules
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/shipments', shipmentsRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/api/warehouse', warehouseRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', usersRoutes);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[API Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Real-time Telemetry WebSocket Handler
io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);
  
  socket.on('join_shipment', (shipmentId) => {
    socket.join(shipmentId);
    console.log(`[Socket] Client joined tracking room: ${shipmentId}`);
  });

  socket.on('join_fleet', () => {
    socket.join('fleet_telematics');
    console.log(`[Socket] Client joined fleet telematics stream`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`[Server] Core API & WebSockets running on port ${PORT}`);
});
