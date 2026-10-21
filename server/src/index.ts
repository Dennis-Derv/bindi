import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config/env';
import { errorHandler } from './middleware/errorHandler.middleware';
import { checkDatabaseConnection } from './config/prisma';
import { dbStore } from './services/store';

// Route imports
import authRoutes from './routes/auth.routes';
import activityRoutes from './routes/activity.routes';
import mediaRoutes from './routes/media.routes';
import inquiryRoutes from './routes/inquiry.routes';
import statsRoutes from './routes/stats.routes';

const app = express();

// Middleware
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads directory serving
const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Health check with database connection diagnostics & automatic synchronization
app.get('/api/health', async (_req, res) => {
  const dbConnected = await checkDatabaseConnection();
  let syncInfo = null;
  if (dbConnected) {
    syncInfo = await dbStore.syncLocalStoreToDatabase();
  }
  const storeStats = await dbStore.getStats();

  res.json({
    status: 'ok',
    organization: 'Bindir Knowledge Development Centre International (BKC)',
    cacRegistration: 'CAC/IT/NO 56020',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'PostgreSQL (Connected & Synchronized)' : 'Fallback Store (Active)',
    databaseConnection: {
      isConnected: dbConnected,
      engine: dbConnected ? 'PostgreSQL 16 (Docker: bkc_postgres)' : 'Persistent JSON File (scratch/bkc_local_store.json)',
      port: 5432,
      dockerStatusHint: dbConnected ? 'Docker container is running and healthy' : 'PostgreSQL offline: Start Docker and run "docker compose up -d"'
    },
    inquiriesPersisted: storeStats.totalInquiries,
    pendingInquiries: storeStats.pendingInquiries,
    autoSyncStatus: dbConnected
      ? 'Active — All offline submissions automatically synced to PostgreSQL database'
      : 'Standby — Submissions safely saved in local file and will auto-sync when PostgreSQL is started',
    syncSummary: syncInfo
  });
});

// Dedicated manual trigger to force synchronization
app.post('/api/health/sync', async (_req, res) => {
  const isDbUp = await checkDatabaseConnection();
  if (!isDbUp) {
    res.status(503).json({
      success: false,
      message: 'PostgreSQL database is currently offline. Start Docker with "docker compose up -d" to connect.',
      fallbackStorage: 'scratch/bkc_local_store.json (All proposals are safely preserved)'
    });
    return;
  }
  const result = await dbStore.syncLocalStoreToDatabase();
  res.json({
    success: true,
    message: 'All local proposals and data successfully synchronized to PostgreSQL database.',
    ...result
  });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api', statsRoutes);

// Global error handler
app.use(errorHandler);

// Start server
const server = app.listen(config.port, () => {
  console.log(`
  ==============================================================
  🚀 BKC International Express API Server Running
  📡 Local Address: http://localhost:${config.port}
  🔒 Admin Auth: /api/auth/login
  📂 Uploads Path: http://localhost:${config.port}/uploads
  🏛️ Organization: Bindir Knowledge Development Centre (CAC/IT/NO 56020)
  ==============================================================
  `);
  // Attempt DB ping
  checkDatabaseConnection();
});

export default app;
