import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  global.__prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
  });

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma;
}

let lastCheckTime = 0;
let cachedResult: boolean | null = null;

export async function checkDatabaseConnection(): Promise<boolean> {
  const now = Date.now();
  if (cachedResult !== null && now - lastCheckTime < 30000) {
    return cachedResult;
  }
  lastCheckTime = now;
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ PostgreSQL database connected successfully.');
    cachedResult = true;
    return true;
  } catch (error: any) {
    if (cachedResult !== false) {
      console.warn('⚠️ PostgreSQL offline: falling back smoothly to persistent data store.');
      console.warn('ℹ️ To activate PostgreSQL, start Docker and run: docker compose up -d');
    }
    cachedResult = false;
    return false;
  }
}
