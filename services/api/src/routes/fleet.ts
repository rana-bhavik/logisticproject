import { Router, Request, Response } from 'express';
import Vehicle from '../models/Vehicle';
import User from '../models/User';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

// GET /api/fleet & /api/fleet/vehicles - List all vehicles
const listVehicles = async (req: Request, res: Response) => {
  try {
    const { status, type } = req.query;
    const query: any = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const vehicles = await Vehicle.find(query)
      .populate('companyId', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, vehicles });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

router.get('/', authenticateToken, authorizeRole('Super Admin', 'Dispatcher', 'Warehouse Manager'), listVehicles);
router.get('/vehicles', authenticateToken, authorizeRole('Super Admin', 'Dispatcher', 'Warehouse Manager'), listVehicles);

// POST /api/fleet/vehicles - Register new vehicle
router.post('/vehicles', authenticateToken, authorizeRole('Super Admin', 'Dispatcher'), async (req: Request, res: Response) => {
  try {
    const { licensePlate, type, capacity, companyId } = req.body;

    const vehicle = new Vehicle({
      licensePlate,
      type,
      capacity,
      companyId: companyId || (req as any).user?.companyId,
      status: 'Available',
    });

    await vehicle.save();
    res.status(201).json({ success: true, vehicle });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH /api/fleet/vehicles/:id/status - Update vehicle status (Available, In Use, Maintenance)
router.patch('/vehicles/:id/status', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.json({ success: true, vehicle });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/fleet/drivers - List active drivers
router.get('/drivers', authenticateToken, async (req: Request, res: Response) => {
  try {
    const drivers = await User.find({ role: 'Driver' })
      .select('-passwordHash')
      .populate('companyId', 'name');

    res.json({ success: true, drivers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/fleet/telematics-summary - Fleet overview metrics
router.get('/telematics-summary', authenticateToken, async (req: Request, res: Response) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const activeVehicles = await Vehicle.countDocuments({ status: 'In Use' });
    const maintenanceVehicles = await Vehicle.countDocuments({ status: 'Maintenance' });
    const availableVehicles = await Vehicle.countDocuments({ status: 'Available' });

    res.json({
      success: true,
      metrics: {
        total: totalVehicles,
        active: activeVehicles,
        maintenance: maintenanceVehicles,
        available: availableVehicles,
        utilizationRate: totalVehicles > 0 ? Math.round((activeVehicles / totalVehicles) * 100) : 0,
        averageFuelEfficiency: '8.4 km/L',
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
