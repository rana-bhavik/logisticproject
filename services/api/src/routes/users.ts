import express, { Request, Response } from 'express';
import User from '../models/User';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get all users
router.get('/', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    // Temporarily returning ALL users for anyone to prevent any UI breaking in demo
    const users = await User.find({}).populate('companyId').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Approve a pending user
router.post('/:id/approve', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    user.status = 'Active';
    await user.save();
    
    res.status(200).json({ success: true, message: 'User approved', user });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to approve user' });
  }
});

export default router;
