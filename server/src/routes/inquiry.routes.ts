import { Router } from 'express';
import {
  submitInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  clearAllInquiries
} from '../controllers/inquiry.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public submission
router.post('/', submitInquiry);

// Admin-protected
router.get('/', authenticateAdmin, getInquiries);
router.patch('/:id/status', authenticateAdmin, updateInquiryStatus);
router.delete('/:id', authenticateAdmin, deleteInquiry);
router.delete('/', authenticateAdmin, clearAllInquiries);

export default router;
