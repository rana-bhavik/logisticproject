import { Router, Request, Response } from 'express';
import Shipment from '../models/Shipment';
import Telemetry from '../models/Telemetry';
import Order from '../models/Order';
import Vehicle from '../models/Vehicle';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET /api/shipments - List all shipments
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const query: any = {};
    if (status) query.status = status;

    const shipments = await Shipment.find(query)
      .populate('orderIds')
      .populate('vehicleId')
      .populate('driverId', 'name email')
      .sort({ updatedAt: -1 });

    res.json({ success: true, shipments });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/shipments/track/:trackingNumber - Public & authenticated shipment tracking
router.get('/track/:trackingNumber', async (req: Request, res: Response) => {
  try {
    const shipment = await Shipment.findOne({ trackingNumber: req.params.trackingNumber })
      .populate('orderIds')
      .populate('vehicleId')
      .populate('driverId', 'name email');

    if (!shipment) {
      return res.status(404).json({ success: false, message: 'Shipment tracking number not found' });
    }

    // Also get recent telemetry trail
    const recentTelemetry = await Telemetry.find({ shipmentId: shipment._id })
      .sort({ timestamp: -1 })
      .limit(30);

    res.json({
      success: true,
      shipment,
      telemetryHistory: recentTelemetry,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/shipments - Create new shipment & assign resources
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { orderIds, vehicleId, driverId, estimatedCompletionTime } = req.body;

    const trackingNumber = `TRK-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newShipment = new Shipment({
      trackingNumber,
      orderIds: orderIds || [],
      vehicleId,
      driverId,
      status: 'In Transit',
      currentLocation: {
        lat: 20.5937,
        lng: 78.9629,
        timestamp: new Date(),
      },
      estimatedCompletionTime: estimatedCompletionTime || new Date(Date.now() + 86400000 * 2),
    });

    await newShipment.save();

    // Mark orders as In Transit
    if (orderIds && orderIds.length > 0) {
      await Order.updateMany(
        { _id: { $in: orderIds } },
        { status: 'In Transit' }
      );
    }

    // Mark vehicle as In Use
    if (vehicleId) {
      await Vehicle.findByIdAndUpdate(vehicleId, { status: 'In Use' });
    }

    const io = req.app.get('io');
    if (io) {
      io.emit('shipment:created', newShipment);
    }

    res.status(201).json({ success: true, shipment: newShipment });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/shipments/:id/telemetry - Live GPS ingest & WebSocket broadcast
router.post('/:id/telemetry', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { lat, lng, speed, fuelLevel } = req.body;
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({ success: false, message: 'Shipment not found' });
    }

    // Update shipment's current coordinates
    shipment.currentLocation = {
      lat,
      lng,
      timestamp: new Date(),
    };
    await shipment.save();

    // Append to time-series telemetry log
    const telemetryLog = new Telemetry({
      shipmentId: shipment._id,
      vehicleId: shipment.vehicleId,
      location: { lat, lng },
      speed: speed || 0,
      fuelLevel: fuelLevel || 100,
      timestamp: new Date(),
    });
    await telemetryLog.save();

    // Broadcast live telemetry update to room & global listeners
    const io = req.app.get('io');
    if (io) {
      io.to(shipment._id.toString()).emit('telemetry:update', {
        shipmentId: shipment._id,
        trackingNumber: shipment.trackingNumber,
        location: { lat, lng },
        speed,
        timestamp: new Date(),
      });
      io.emit('fleet:telemetry_pulse', {
        shipmentId: shipment._id,
        vehicleId: shipment.vehicleId,
        lat,
        lng,
      });
    }

    res.json({ success: true, currentLocation: shipment.currentLocation });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH /api/shipments/:id/status - Complete or delay shipment
router.patch('/:id/status', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!shipment) {
      return res.status(404).json({ success: false, message: 'Shipment not found' });
    }

    if (status === 'Completed') {
      if (shipment.vehicleId) {
        await Vehicle.findByIdAndUpdate(shipment.vehicleId, { status: 'Available' });
      }
      if (shipment.orderIds && shipment.orderIds.length > 0) {
        await Order.updateMany(
          { _id: { $in: shipment.orderIds } },
          { status: 'Delivered' }
        );
      }
    }

    const io = req.app.get('io');
    if (io) {
      io.emit('shipment:status_updated', shipment);
    }

    res.json({ success: true, shipment });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
