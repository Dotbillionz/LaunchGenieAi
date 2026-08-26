import { Router } from 'express';
import { requireRole } from '../middleware/auth.js';
import { scanTenders } from '../services/tenderService.js';

export const briefingRouter = Router();

briefingRouter.get('/daily', requireRole(['admin', 'executive']), (req, res) => {
  const keywords = req.query.keywords ? String(req.query.keywords).split(',') : undefined;
  const regionFocus = req.query.regionFocus ? String(req.query.regionFocus).split(',') : undefined;

  const scan = scanTenders({ keywords, regionFocus });
  const shortlisted = scan.opportunities.filter(({ shortlisted: isShortlisted }) => isShortlisted);

  res.json({
    generatedAt: scan.generatedAt,
    title: `WCGroup Italy Daily Tender Briefing — ${new Date().toISOString().split('T')[0]}`,
    criteria: scan.criteria,
    summary: scan.summary,
    sources: scan.sources.map(({ id, name, country, coverage, website }) => ({
      id,
      name,
      country,
      coverage,
      website
    })),
    shortlisted: shortlisted.map(
      ({ id, title, sourceName, estimatedValue, deadline, legalRouteLabel, score, actionPack }) => ({
        id,
        title,
        sourceName,
        estimatedValue,
        deadline,
        legalRouteLabel,
        score: score.total,
        bidNoBidMemo: actionPack.bidNoBidMemo,
        documentChecklist: actionPack.documentChecklist,
        nextActionTimeline: actionPack.nextActionTimeline
      })
    ),
    guardrail:
      'No official bid is submitted automatically. Final submission remains subject to human and legal review.'
  });
});
