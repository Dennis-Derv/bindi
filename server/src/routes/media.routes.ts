import { Router } from 'express';
import { uploadMedia, getMedia, deleteMedia } from '../controllers/media.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

// Public routes
router.get('/', getMedia);

// Admin-protected routes
router.post('/upload', authenticateAdmin, upload.array('files', 10), uploadMedia);
router.delete('/:id', authenticateAdmin, deleteMedia);

export default router;
