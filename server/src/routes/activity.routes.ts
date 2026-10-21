import { Router } from 'express';
import {
  getActivities,
  getActivityByIdOrSlug,
  createActivity,
  updateActivity,
  deleteActivity,
  togglePublish
} from '../controllers/activity.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getActivities);
router.get('/:id', getActivityByIdOrSlug);

// Admin-protected routes
router.post('/', authenticateAdmin, createActivity);
router.put('/:id', authenticateAdmin, updateActivity);
router.delete('/:id', authenticateAdmin, deleteActivity);
router.patch('/:id/publish', authenticateAdmin, togglePublish);

export default router;
