'use client';

import { useEffect, useMemo, useState } from 'react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const cardStyle = {
  background: '#11182a',
  border: '1px solid #23304d',
  borderRadius: 14,
  padding: 16
};

const badgeStyle = {
  display: 'inline-block',
  borderRadius: 999,
  padding: '4px 10px',
  fontSize: 12,
  background: '#17233d',
  border: '1px solid #2c3f63',
  color: '#dbe4ff',
  marginRight: 8,
  marginBottom: 8
};

export default function HomePage() {
  const [sources, setSources] = useState([]);
  const [summary, setSummary] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [sourcesResponse, opportunitiesResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/api/tenders/sources`),
          fetch(`${apiBaseUrl}/api/tenders/opportunities?shortlisted=true`)
        ]);

        if (!sourcesResponse.ok || !opportunitiesResponse.ok) {
          throw new Error('The tender API is unavailable.');
        }

        const sourcesPayload = await sourcesResponse.json();
        const opportunitiesPayload = await opportunitiesResponse.json();
        setSources(sourcesPayload.sources || []);
        setSummary(opportunitiesPayload.summary || null);
        setOpportunities(opportunitiesPayload.opportunities || []);
      } catch (loadError) {
        setError(loadError.message);
      }
    }

    loadDashboard();
  }, []);

  const topOpportunity = useMemo(() => opportunities[0], [opportunities]);

  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ marginBottom: 4 }}>LaunchGenie WCGroup Tender Desk</h1>
        <p style={{ color: '#9ba9cc', marginTop: 0 }}>
          Italy tender sourcing dashboard for public procurement monitoring, bid/no-bid routing, and action-pack prep.
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        <article style={cardStyle}>
          <h3>Official Sources</h3>
          <p>{sources.length || 0}</p>
        </article>
        <article style={cardStyle}>
          <h3>Shortlisted Opportunities</h3>
          <p>{summary?.shortlisted || 0}</p>
        </article>
        <article style={cardStyle}>
          <h3>Direct US LLC Route</h3>
          <p>{summary?.directUsLlc || 0}</p>
        </article>
        <article style={cardStyle}>
          <h3>Partner / RTI Route</h3>
          <p>{summary?.partnerRoute || 0}</p>
        </article>
      </section>

      <section style={cardStyle}>
        <h3>Target Sources</h3>
        <div>
          {sources.map((source) => (
            <span key={source.id} style={badgeStyle}>
              {source.name}
            </span>
          ))}
        </div>
        {error ? (
          <p style={{ color: '#ff9f9f' }}>
            {error} Start the backend at {apiBaseUrl} to load live scan results.
          </p>
        ) : null}
      </section>

      {topOpportunity ? (
        <section style={cardStyle}>
          <h3>Top Shortlisted Opportunity</h3>
          <p style={{ marginBottom: 8 }}>
            <strong>{topOpportunity.title}</strong> — {topOpportunity.sourceName}
          </p>
          <p style={{ color: '#9ba9cc' }}>{topOpportunity.actionPack.bidNoBidMemo}</p>
          <p>
            <strong>Recommended route:</strong> {topOpportunity.legalRoute}
          </p>
          <p>
            <strong>Deadline:</strong> {new Date(topOpportunity.deadline).toLocaleDateString()} · <strong>Value:</strong>{' '}
            €{topOpportunity.estimatedValue.toLocaleString()}
          </p>
          <ul>
            {topOpportunity.actionPack.documentChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section style={cardStyle}>
        <h3>Action Pack Pipeline</h3>
        <ul>
          <li>Generate source-specific search URLs or request templates for WCGroup keywords</li>
          <li>Normalize notices into a common opportunity model and score fit, route, urgency, and qualification risk</li>
          <li>Prepare bid/no-bid memo, checklist, partner outreach draft, and next-action timeline</li>
          <li>Keep final submission under human and legal review only</li>
        </ul>
      </section>
    </main>
  );
}
