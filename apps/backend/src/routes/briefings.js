import { Router } from 'express';
import { requireRole } from '../middleware/auth.js';

export const briefingRouter = Router();

briefingRouter.get('/daily', requireRole(['admin', 'executive']), (_req, res) => {
  res.json({
    generatedAt: new Date().toISOString(),
    summary: {
      uptime: '99.95%',
      deployments24h: 4,
      incidentsOpen: 1,
      paymentsProcessed: 182
    }
  });
});
