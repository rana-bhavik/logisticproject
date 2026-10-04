import { Router, Request, Response } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

const invoicesStore = [
  { id: 'INV-2026-081', clientName: 'Tesla Energy Europe', amount: 48250, status: 'Paid', issueDate: '2026-09-01', dueDate: '2026-09-15', shipmentRef: 'TRK-9821' },
  { id: 'INV-2026-082', clientName: 'Maersk Global Logistics', amount: 124000, status: 'Pending', issueDate: '2026-09-05', dueDate: '2026-09-20', shipmentRef: 'TRK-9822' },
  { id: 'INV-2026-083', clientName: 'Amazon Fulfilment IN', amount: 89300, status: 'Paid', issueDate: '2026-09-07', dueDate: '2026-09-21', shipmentRef: 'TRK-9823' },
  { id: 'INV-2026-084', clientName: 'Siemens Mobility', amount: 31400, status: 'Overdue', issueDate: '2026-08-20', dueDate: '2026-09-03', shipmentRef: 'TRK-9824' },
  { id: 'INV-2026-085', clientName: 'DHL Supply Chain', amount: 76500, status: 'Pending', issueDate: '2026-09-10', dueDate: '2026-09-25', shipmentRef: 'TRK-9825' },
];

// GET /api/finance/ledger - Combined ledger and analytics
router.get('/ledger', authenticateToken, authorizeRole('Super Admin', 'Company Admin'), (req: Request, res: Response) => {
  const totalRevenue = invoicesStore.reduce((acc, inv) => acc + inv.amount, 0);
  const operatingCosts = Math.round(totalRevenue * 0.58);
  const netMargin = totalRevenue - operatingCosts;

  res.json({
    success: true,
    analytics: {
      totalRevenue,
      operatingCosts,
      netMargin,
      marginPct: 42.0,
    },
    invoices: invoicesStore.map(inv => ({
      _id: inv.id,
      invoiceNumber: inv.id,
      clientName: inv.clientName,
      amount: inv.amount,
      currency: 'USD',
      status: inv.status,
      issuedDate: inv.issueDate,
      dueDate: inv.dueDate,
      itemsCount: 3,
    })),
  });
});

// GET /api/finance/invoices - List invoices
router.get('/invoices', authenticateToken, authorizeRole('Super Admin', 'Company Admin'), (req: Request, res: Response) => {
  res.json({ success: true, invoices: invoicesStore });
});

// GET /api/finance/analytics - Financial summary metrics
router.get('/analytics', authenticateToken, (req: Request, res: Response) => {
  const totalRevenue = invoicesStore.reduce((acc, inv) => acc + inv.amount, 0);
  const paidRevenue = invoicesStore.filter((inv) => inv.status === 'Paid').reduce((acc, inv) => acc + inv.amount, 0);
  const pendingRevenue = invoicesStore.filter((inv) => inv.status === 'Pending').reduce((acc, inv) => acc + inv.amount, 0);

  res.json({
    success: true,
    financials: {
      totalRevenue,
      paidRevenue,
      pendingRevenue,
      operationalCost: Math.round(totalRevenue * 0.42),
      fuelExpenses: Math.round(totalRevenue * 0.18),
      driverPayroll: Math.round(totalRevenue * 0.15),
      netMarginPercentage: 25.4,
      monthlyGrowth: 14.8,
    },
  });
});

export default router;
