import dotenv from 'dotenv';
import path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'bkc_super_secret_jwt_key_2026_knowledge_is_good_production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/bkc_db?schema=public',
  defaultAdmin: {
    email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@bkc.org.ng',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@BKC2026!',
    name: process.env.DEFAULT_ADMIN_NAME || 'BKC System Administrator'
  }
};
