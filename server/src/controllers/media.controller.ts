import { Request, Response } from 'express';
import { dbStore } from '../services/store';

export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
  const files = req.files as Express.Multer.File[] | undefined;
  const singleFile = req.file as Express.Multer.File | undefined;

  const uploadedFiles: Express.Multer.File[] = [];
  if (singleFile) uploadedFiles.push(singleFile);
  if (files && Array.isArray(files)) uploadedFiles.push(...files);

  if (uploadedFiles.length === 0) {
    res.status(400).json({
      success: false,
      message: 'No files were uploaded.'
    });
    return;
  }

  const results = [];
  for (const file of uploadedFiles) {
    const isVideo = file.mimetype.startsWith('video/');
    const record = await dbStore.addMedia({
      title: req.body.title || file.originalname,
      filename: file.filename,
      url: `/uploads/${file.filename}`,
      mediaType: isVideo ? 'VIDEO' : 'IMAGE',
      mimeType: file.mimetype,
      fileSize: file.size,
      caption: req.body.caption || '',
      category: req.body.category || 'General',
      isGallery: req.body.isGallery !== 'false'
    });
    results.push(record);
  }

  res.status(201).json({
    success: true,
    message: `${results.length} media file(s) uploaded successfully`,
    data: results.length === 1 ? results[0] : results
  });
};

export const getMedia = async (req: Request, res: Response): Promise<void> => {
  const { type, category } = req.query;

  const mediaList = await dbStore.getMedia({
    mediaType: type as any,
    category: category as string
  });

  res.json({
    success: true,
    count: mediaList.length,
    data: mediaList
  });
};

export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const deleted = await dbStore.deleteMedia(id);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: 'Media not found'
    });
    return;
  }

  res.json({
    success: true,
    message: 'Media deleted successfully'
  });
};
