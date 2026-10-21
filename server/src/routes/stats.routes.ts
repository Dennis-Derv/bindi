import { Router } from 'express';
import { getStats, getCategories } from '../controllers/stats.controller';

const router = Router();

router.get('/stats', getStats);
router.get('/categories', getCategories);

export default router;
