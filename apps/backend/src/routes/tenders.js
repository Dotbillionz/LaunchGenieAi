import { Router } from 'express';
import { requireRole } from '../middleware/auth.js';
import { syncDecisionToNotion } from '../services/notionSync.js';
import { notifySlack } from '../services/notifier.js';
import { getTenderOpportunities, getTenderSources, scanTenders } from '../services/tenderService.js';

export const tenderRouter = Router();

tenderRouter.get('/sources', (_req, res) => {
  res.json({
    generatedAt: new Date().toISOString(),
    sources: getTenderSources()
  });
});

tenderRouter.post('/scan', requireRole(['admin', 'executive']), async (req, res) => {
  const scan = scanTenders(req.body || {});
  const shortlisted = scan.opportunities.filter(({ shortlisted: isShortlisted }) => isShortlisted);
  const sync = req.body?.sync || {};

  const syncResults = {
    slack: { skipped: true },
    notion: { skipped: true }
  };

  if (sync.slack && shortlisted.length) {
    syncResults.slack = await notifySlack(
      `LaunchGenie tender scan: ${shortlisted.length} shortlisted Italian opportunities for WCGroup. Top notice: ${shortlisted[0].title}`
    );
  }

  if (sync.notion && shortlisted.length) {
    syncResults.notion = await syncDecisionToNotion({
      title: shortlisted[0].title,
      status: shortlisted[0].shortlisted ? 'shortlisted' : 'monitor',
      owner: 'LaunchGenie Tender Desk'
    });
  }

  res.status(201).json({
    ...scan,
    syncResults
  });
});

tenderRouter.get('/opportunities', (req, res) => {
  res.json(
    getTenderOpportunities({
      shortlisted: req.query.shortlisted,
      legalRoute: req.query.legalRoute,
      sourceId: req.query.sourceId
    })
  );
});
