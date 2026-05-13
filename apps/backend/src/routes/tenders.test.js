import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../server.js';

test('tender routes expose sources, opportunities, and protected scan execution', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const sourcesResponse = await fetch(`${baseUrl}/api/tenders/sources`);
    assert.equal(sourcesResponse.status, 200);
    const sourcesPayload = await sourcesResponse.json();
    assert.equal(sourcesPayload.sources.length, 6);

    const forbiddenScanResponse = await fetch(`${baseUrl}/api/tenders/scan`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ keywords: ['cloud'] })
    });
    assert.equal(forbiddenScanResponse.status, 403);

    const scanResponse = await fetch(`${baseUrl}/api/tenders/scan`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-role': 'executive'
      },
      body: JSON.stringify({ keywords: ['cloud', 'cybersecurity'], regionFocus: ['Italy', 'Tuscany'] })
    });
    assert.equal(scanResponse.status, 201);
    const scanPayload = await scanResponse.json();
    assert.equal(scanPayload.summary.totalOpportunities, 6);

    const opportunitiesResponse = await fetch(`${baseUrl}/api/tenders/opportunities?shortlisted=true`);
    assert.equal(opportunitiesResponse.status, 200);
    const opportunitiesPayload = await opportunitiesResponse.json();
    assert.ok(opportunitiesPayload.summary.filteredOpportunities >= 1);
    assert.ok(opportunitiesPayload.opportunities.every((opportunity) => opportunity.shortlisted));
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
