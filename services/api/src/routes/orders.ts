import { Router, Request, Response } from 'express';
import Order from '../models/Order';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET /api/orders - List all orders with filters & pagination
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const query: any = {};

    if (status) {
      query.status = status;
    }

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate('companyId', 'name')
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      orders,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/orders - Create new order
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const {
      pickupAddress,
      deliveryAddress,
      cargoDetails,
      scheduledPickupTime,
      scheduledDeliveryTime,
      companyId,
    } = req.body;

    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder = new Order({
      orderNumber,
      companyId: companyId || (req as any).user?.companyId,
      status: 'Pending',
      pickupAddress,
      deliveryAddress,
      cargoDetails,
      scheduledPickupTime: new Date(scheduledPickupTime || Date.now()),
      scheduledDeliveryTime: new Date(scheduledDeliveryTime || Date.now() + 86400000),
    });

    await newOrder.save();

    // Broadcast order creation via WebSockets
    const io = req.app.get('io');
    if (io) {
      io.emit('order:created', newOrder);
    }

    res.status(201).json({ success: true, order: newOrder });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH /api/orders/:id/status - Update order lifecycle status
router.patch('/:id/status', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const io = req.app.get('io');
    if (io) {
      io.emit('order:status_updated', order);
    }

    res.json({ success: true, order });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/orders/bulk - Ingest bulk orders from CSV
router.post('/bulk', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid orders array' });
    }

    const createdOrders = await Order.insertMany(
      orders.map((o) => ({
        ...o,
        orderNumber: `ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Pending',
        companyId: o.companyId || (req as any).user?.companyId,
      }))
    );

    res.status(201).json({ success: true, count: createdOrders.length, orders: createdOrders });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
