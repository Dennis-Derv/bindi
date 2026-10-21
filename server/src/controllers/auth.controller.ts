import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { dbStore } from '../services/store';
import { config } from '../config/env';
import { AuthRequest } from '../middleware/auth.middleware';

const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await dbStore.findUserByEmail(email);
  if (!user) {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
    return;
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };

  const token = jwt.sign(tokenPayload, config.jwtSecret, {
    expiresIn: '7d'
  });

  // Set HTTP-only cookie
  res.cookie('bkc_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.json({
    success: true,
    message: 'Admin authentication successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const user = await dbStore.findUserById(req.user.id);
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  res.clearCookie('bkc_token');
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};
