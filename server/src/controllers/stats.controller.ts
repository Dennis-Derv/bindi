import { Request, Response } from 'express';
import { dbStore } from '../services/store';

export const getStats = async (_req: Request, res: Response): Promise<void> => {
  const stats = await dbStore.getStats();
  res.json({
    success: true,
    data: stats
  });
};

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  const categories = await dbStore.getCategories();
  res.json({
    success: true,
    data: categories
  });
};
