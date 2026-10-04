import { Router, Request, Response } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

// In-memory / initial inventory collection simulation
interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minThreshold: number;
  zone: string;
  aisle: string;
  lastUpdated: string;
}

let inventoryStore: InventoryItem[] = [
  { id: 'inv-1', sku: 'SKU-VOLT-401', name: 'Lithium Battery Cells (48V)', category: 'Electronics', quantity: 840, minThreshold: 200, zone: 'Zone A', aisle: 'A-12', lastUpdated: new Date().toISOString() },
  { id: 'inv-2', sku: 'SKU-ROBO-102', name: 'Automated Guided Vehicle Motors', category: 'Robotics', quantity: 120, minThreshold: 50, zone: 'Zone B', aisle: 'B-04', lastUpdated: new Date().toISOString() },
  { id: 'inv-3', sku: 'SKU-SENS-889', name: 'IoT Telematics Gateway Modules', category: 'Hardware', quantity: 45, minThreshold: 100, zone: 'Zone A', aisle: 'A-02', lastUpdated: new Date().toISOString() },
  { id: 'inv-4', sku: 'SKU-PACK-005', name: 'Eco-Friendly Pallet Spacers', category: 'Packaging', quantity: 2400, minThreshold: 500, zone: 'Zone C', aisle: 'C-08', lastUpdated: new Date().toISOString() },
  { id: 'inv-5', sku: 'SKU-TYRE-990', name: 'Heavy-Duty Semi Tires (295/75R)', category: 'Automotive', quantity: 80, minThreshold: 40, zone: 'Zone D', aisle: 'D-01', lastUpdated: new Date().toISOString() },
];

let dockDoors = [
  { id: 'DOCK-01', name: 'Inbound Bay 1', status: 'Occupied', currentCarrier: 'Volt Freight #401', eta: '10:45 AM', assignedDriver: 'Alex Mercer' },
  { id: 'DOCK-02', name: 'Inbound Bay 2', status: 'Available', currentCarrier: 'None', eta: '11:30 AM', assignedDriver: 'Unassigned' },
  { id: 'DOCK-03', name: 'Outbound Bay 1', status: 'Loading', currentCarrier: 'Eurasia Express #12', eta: '12:00 PM', assignedDriver: 'Vikram Patel' },
  { id: 'DOCK-04', name: 'Outbound Bay 2', status: 'Scheduled', currentCarrier: 'Global Sea Freight #88', eta: '02:15 PM', assignedDriver: 'Sarah Chen' },
];

// GET /api/warehouse/inventory - Get stock inventory
router.get('/inventory', authenticateToken, authorizeRole('Super Admin', 'Warehouse Manager', 'Company Admin'), (req: Request, res: Response) => {
  res.json({ success: true, inventory: inventoryStore });
});

// POST /api/warehouse/adjust-stock & /adjust - Stock in / stock out adjustment
const handleAdjust = (req: Request, res: Response) => {
  const { sku, delta, action } = req.body;
  const item = inventoryStore.find((i) => i.sku === sku);

  if (!item) {
    return res.status(404).json({ success: false, message: 'SKU item not found' });
  }

  const change = Number(delta) || 0;
  if (action === 'stock-in' || (action !== 'stock-out' && change > 0)) {
    item.quantity += Math.abs(change);
  } else {
    item.quantity = Math.max(0, item.quantity - Math.abs(change));
  }

  item.lastUpdated = new Date().toISOString();

  // Low stock check
  const isLowStock = item.quantity <= item.minThreshold;

  const io = req.app.get('io');
  if (io) {
    io.emit('warehouse:stock_updated', { item, isLowStock });
  }

  res.json({ success: true, item, isLowStock });
};

router.post('/adjust-stock', authenticateToken, authorizeRole('Super Admin', 'Warehouse Manager'), handleAdjust);
router.post('/adjust', authenticateToken, authorizeRole('Super Admin', 'Warehouse Manager'), handleAdjust);

// GET /api/warehouse/docks - Dock scheduling matrix
router.get('/docks', authenticateToken, authorizeRole('Super Admin', 'Warehouse Manager', 'Dispatcher', 'Company Admin'), (req: Request, res: Response) => {
  res.json({ success: true, docks: dockDoors });
});

export default router;
