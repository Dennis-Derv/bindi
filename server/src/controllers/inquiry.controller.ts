import { Request, Response } from 'express';
import { z } from 'zod';
import { dbStore } from '../services/store';

const inquirySchema = z.object({
  type: z.enum(['GRANT', 'SPONSORSHIP', 'PARTNERSHIP', 'DONATION', 'GENERAL']),
  organizationName: z.string().optional(),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Invalid email address format'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  proposedFunding: z.string().optional()
});

export const submitInquiry = async (req: Request, res: Response): Promise<void> => {
  const validated = inquirySchema.parse(req.body);
  const inquiry = await dbStore.createInquiry(validated);

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been submitted successfully. Our team will contact you shortly.',
    data: inquiry
  });
};

export const getInquiries = async (_req: Request, res: Response): Promise<void> => {
  const inquiries = await dbStore.getInquiries();

  res.json({
    success: true,
    count: inquiries.length,
    data: inquiries
  });
};

export const updateInquiryStatus = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const { status } = req.body;

  if (!['PENDING', 'REVIEWED', 'CONTACTED', 'ARCHIVED'].includes(status)) {
    res.status(400).json({
      success: false,
      message: 'Invalid status. Must be PENDING, REVIEWED, CONTACTED, or ARCHIVED.'
    });
    return;
  }

  const updated = await dbStore.updateInquiryStatus(id, status);
  if (!updated) {
    res.status(404).json({
      success: false,
      message: 'Inquiry not found'
    });
    return;
  }

  res.json({
    success: true,
    message: 'Inquiry status updated successfully',
    data: updated
  });
};

export const deleteInquiry = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const deleted = await dbStore.deleteInquiry(id);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: 'Inquiry not found'
    });
    return;
  }

  res.json({
    success: true,
    message: 'Inquiry deleted successfully'
  });
};

export const clearAllInquiries = async (_req: Request, res: Response): Promise<void> => {
  const count = await dbStore.clearAllInquiries();

  res.json({
    success: true,
    message: `Successfully cleared ${count} inquiries`,
    count
  });
};
