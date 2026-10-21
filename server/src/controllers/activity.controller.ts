import { Request, Response } from 'express';
import { z } from 'zod';
import { dbStore } from '../services/store';

const activitySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  summary: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  categoryId: z.string().min(1, 'Category is required'),
  impact: z.string().optional(),
  beneficiariesCount: z.coerce.number().optional(),
  beneficiariesLabel: z.string().optional(),
  partnersInvolved: z.string().optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  coverImage: z.string().optional(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional()
});

export const getActivities = async (req: Request, res: Response): Promise<void> => {
  const { category, search, all } = req.query;

  const activities = await dbStore.getActivities({
    categorySlug: category as string,
    search: search as string,
    publishedOnly: all === 'true' ? false : true
  });

  res.json({
    success: true,
    count: activities.length,
    data: activities
  });
};

export const getActivityByIdOrSlug = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const activity = await dbStore.getActivityByIdOrSlug(id);

  if (!activity) {
    res.status(404).json({
      success: false,
      message: 'Activity not found'
    });
    return;
  }

  res.json({
    success: true,
    data: activity
  });
};

export const createActivity = async (req: Request, res: Response): Promise<void> => {
  const validated = activitySchema.parse(req.body);
  const activity = await dbStore.createActivity(validated);

  res.status(201).json({
    success: true,
    message: 'Activity created successfully',
    data: activity
  });
};

export const updateActivity = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const validated = activitySchema.partial().parse(req.body);

  const updated = await dbStore.updateActivity(id, validated);
  if (!updated) {
    res.status(404).json({
      success: false,
      message: 'Activity not found'
    });
    return;
  }

  res.json({
    success: true,
    message: 'Activity updated successfully',
    data: updated
  });
};

export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const deleted = await dbStore.deleteActivity(id);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: 'Activity not found'
    });
    return;
  }

  res.json({
    success: true,
    message: 'Activity deleted successfully'
  });
};

export const togglePublish = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const updated = await dbStore.togglePublish(id);

  if (!updated) {
    res.status(404).json({
      success: false,
      message: 'Activity not found'
    });
    return;
  }

  res.json({
    success: true,
    message: `Activity ${updated.isPublished ? 'published' : 'unpublished'} successfully`,
    data: updated
  });
};
