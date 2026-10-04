/**
 * Real-Time Socket.IO Telemetry Streaming Client
 * Connects to http://localhost:5000 (with auto reconnect)
 */
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => {
      console.log(`[WebSocket] Connected to Telemetry Hub (ID: ${socket?.id})`);
    });

    socket.on('disconnect', (reason) => {
      console.log(`[WebSocket] Disconnected: ${reason}`);
    });

    socket.on('connect_error', (error) => {
      console.warn(`[WebSocket] Telemetry connection notice:`, error.message);
    });
  }

  return socket;
};

export const subscribeToShipment = (shipmentId: string, callback: (data: any) => void) => {
  const s = getSocket();
  s.emit('join_shipment', shipmentId);
  s.on('telemetry_update', callback);
  s.on('status_update', callback);

  return () => {
    s.off('telemetry_update', callback);
    s.off('status_update', callback);
  };
};

export const subscribeToFleet = (callback: (data: any) => void) => {
  const s = getSocket();
  s.emit('join_fleet');
  s.on('fleet_telematics_stream', callback);

  return () => {
    s.off('fleet_telematics_stream', callback);
  };
};
