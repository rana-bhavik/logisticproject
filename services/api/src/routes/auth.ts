import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Company from '../models/Company';
import { authenticate } from '../middleware/auth';

const router = express.Router();
// Helper to map role to target portal
export const getRedirectPath = (role: string): string => {
  switch (role) {
    case 'Super Admin':
      return '/admin';
    case 'Company Admin':
      return '/customer';
    case 'Dispatcher':
      return '/admin/dispatch';
    case 'Warehouse Manager':
      return '/admin/warehouse';
    case 'Driver':
      return '/driver';
    default:
      return '/customer';
  }
};

// Auto-seed all 5 enterprise roles if missing
const seedDefaultAccounts = async () => {
  try {
    let company = await Company.findOne({ name: 'Logistis Global Core' });
    if (!company) {
      company = await Company.create({ name: 'Logistis Global Core', industry: 'Logistics', plan: 'Enterprise' });
    }

    const defaultAccounts = [
      {
        name: 'Super Administrator',
        email: 'admin@logistis.com',
        password: 'Admin@123456',
        role: 'Super Admin' as const,
      },
      {
        name: 'Enterprise Client Director',
        email: 'client@logistis.com',
        password: 'Client@123456',
        role: 'Company Admin' as const,
      },
      {
        name: 'Chief Route Dispatcher',
        email: 'dispatcher@logistis.com',
        password: 'Dispatch@123456',
        role: 'Dispatcher' as const,
      },
      {
        name: 'Terminal Warehouse Manager',
        email: 'warehouse@logistis.com',
        password: 'Warehouse@123456',
        role: 'Warehouse Manager' as const,
      },
      {
        name: 'Lead Commercial Driver',
        email: 'driver@logistis.com',
        password: 'Driver@123456',
        role: 'Driver' as const,
      },
    ];

    for (const acc of defaultAccounts) {
      const exists = await User.findOne({ email: acc.email });
      if (!exists) {
        await User.create({
          ...acc,
          companyId: company._id,
          status: 'Active',
        });
        console.log(`[Auth] Seeded ${acc.role}: ${acc.email}`);
      }
    }
  } catch (e) {
    console.warn('[Auth] Seeding notice:', (e as Error).message);
  }
};

// Run seed on startup
seedDefaultAccounts();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, companyName, role, roleKey } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: 'Name, email and password are required' });
      return;
    }
    
    let company = await Company.findOne({ name: companyName || 'Global Freight Corp' });
    if (!company) {
      company = await Company.create({ name: companyName || 'Global Freight Corp' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'An account with this work email already exists' });
      return;
    }

    let assignedRole: any = 'Company Admin';
    let assignedStatus: any = 'Active';

    if (role && role !== 'Company Admin') {
      const validKeys: { [key: string]: string } = {
        'Super Admin': 'ADMIN999',
        'Dispatcher': 'DISPATCH2026',
        'Warehouse Manager': 'WHOUSE2026',
        'Driver': 'DRIVER2026'
      };
      
      if (roleKey !== validKeys[role]) {
        res.status(401).json({ error: 'Invalid Internal Access Key for this role' });
        return;
      }
      assignedRole = role;
      assignedStatus = 'Pending';
    }

    const user = await User.create({
      name,
      email,
      password,
      companyId: company._id,
      role: assignedRole,
      status: assignedStatus,
    });

    const populatedUser = await User.findById(user._id).populate('companyId');
    const io = req.app.get('io');
    if (io) {
      io.emit('new_user_registration', populatedUser);
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, companyId: user.companyId },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: assignedStatus === 'Pending' ? 'Registration pending Super Admin approval' : 'Account registered successfully',
      token: assignedStatus === 'Pending' ? null : token,
      role: user.role,
      status: user.status,
      redirectPath: assignedStatus === 'Pending' ? '/login' : getRedirectPath(user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    
    // Check DB
    let user = await User.findOne({ email }).select('+password');
    
    // If not found in DB but matching demo credentials, auto-provision
    if (!user && (
      (email === 'admin@logistis.com' && password === 'Admin@123456') ||
      (email === 'client@logistis.com' && password === 'Client@123456') ||
      (email === 'dispatcher@logistis.com' && password === 'Dispatch@123456') ||
      (email === 'warehouse@logistis.com' && password === 'Warehouse@123456') ||
      (email === 'driver@logistis.com' && password === 'Driver@123456')
    )) {
      await seedDefaultAccounts();
      user = await User.findOne({ email }).select('+password');
    }

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: 'Invalid work email or password' });
      return;
    }

    if (user.status === 'Pending') {
      res.status(403).json({ error: 'Account pending Super Admin approval. Wait for access.' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, companyId: user.companyId },
      process.env.JWT_SECRET || 'fallback_secret_key_change_in_prod',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      role: user.role,
      redirectPath: getRedirectPath(user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

router.post('/forgot-password', async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  // Simulates sending reset email
  res.status(200).json({
    success: true,
    message: `Password reset instructions dispatched to ${email || 'your email'}.`,
  });
});

router.get('/me', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId).populate('companyId');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router;
