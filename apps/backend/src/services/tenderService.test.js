import test from 'node:test';
import assert from 'node:assert/strict';
import { getTenderOpportunities, getTenderSources, scanTenders } from './tenderService.js';

test('getTenderSources exposes the official tender sources', () => {
  const sources = getTenderSources();

  assert.equal(sources.length, 6);
  assert.ok(sources.some(({ id }) => id === 'ted'));
  assert.ok(sources.some(({ id }) => id === 'mepa'));
});

test('scanTenders scores and routes opportunities for WCGroup keywords', () => {
  const result = scanTenders({
    keywords: ['cloud', 'cybersecurity', 'logistics'],
    regionFocus: ['Italy', 'Tuscany']
  });

  assert.equal(result.sources.length, 6);
  assert.ok(result.summary.shortlisted >= 1);
  assert.ok(result.opportunities.every((opportunity) => opportunity.score.total > 0));
  assert.ok(result.opportunities.some((opportunity) => opportunity.legalRoute === 'direct-us-llc'));
  assert.ok(result.opportunities.some((opportunity) => opportunity.actionPack.documentChecklist.length >= 4));
});

test('getTenderOpportunities can filter shortlisted opportunities', () => {
  scanTenders({
    keywords: ['consulting', 'fintech'],
    regionFocus: ['Italy']
  });

  const shortlisted = getTenderOpportunities({ shortlisted: true });

  assert.ok(shortlisted.opportunities.length > 0);
  assert.ok(shortlisted.opportunities.every((opportunity) => opportunity.shortlisted));
});
