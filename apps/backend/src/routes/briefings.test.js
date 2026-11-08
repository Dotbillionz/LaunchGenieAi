import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../server.js';

test('briefings daily endpoint requires executive or admin role', async () => {
  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const forbiddenResponse = await fetch(`${baseUrl}/api/briefings/daily`);
    assert.equal(forbiddenResponse.status, 403);

    const response = await fetch(`${baseUrl}/api/briefings/daily`, {
      headers: { 'x-role': 'executive' }
    });
    assert.equal(response.status, 200);

    const payload = await response.json();
    assert.ok(payload.generatedAt);
    assert.ok(payload.title.includes('WCGroup Italy Daily Tender Briefing'));
    assert.ok(payload.summary.totalOpportunities >= 1);
    assert.ok(payload.summary.totalSources >= 1);
    assert.ok(Array.isArray(payload.sources));
    assert.ok(Array.isArray(payload.shortlisted));
    assert.ok(payload.guardrail);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
});

test('briefings daily endpoint returns shortlisted opportunities with action packs', async () => {
  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const response = await fetch(
      `${baseUrl}/api/briefings/daily?keywords=cloud,cybersecurity,logistics&regionFocus=Italy,Tuscany`,
      { headers: { 'x-role': 'admin' } }
    );
    assert.equal(response.status, 200);

    const payload = await response.json();
    assert.ok(payload.summary.shortlisted >= 1);

    for (const opportunity of payload.shortlisted) {
      assert.ok(opportunity.id);
      assert.ok(opportunity.title);
      assert.ok(opportunity.legalRouteLabel);
      assert.ok(typeof opportunity.score === 'number');
      assert.ok(opportunity.bidNoBidMemo);
      assert.ok(Array.isArray(opportunity.documentChecklist));
      assert.ok(Array.isArray(opportunity.nextActionTimeline));
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
});
