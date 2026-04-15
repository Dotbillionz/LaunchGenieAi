const cardStyle = {
  background: '#11182a',
  border: '1px solid #23304d',
  borderRadius: 14,
  padding: 16
};

export default function HomePage() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ marginBottom: 4 }}>CrownOps Executive Command Center</h1>
        <p style={{ color: '#9ba9cc' }}>Milestone 1: architecture scaffold and KPI cockpit.</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        <article style={cardStyle}><h3>Uptime</h3><p>99.95%</p></article>
        <article style={cardStyle}><h3>Deployment Velocity</h3><p>4 deploys / 24h</p></article>
        <article style={cardStyle}><h3>Security Alerts</h3><p>1 medium open</p></article>
        <article style={cardStyle}><h3>Team KPI</h3><p>86% sprint completion</p></article>
      </section>

      <section style={cardStyle}>
        <h3>Integrations</h3>
        <ul>
          <li>GitHub webhooks and CI/CD trigger routing</li>
          <li>Slack + Telegram notifications for incidents and deployment events</li>
          <li>Notion board synchronization (service stub ready)</li>
          <li>Payments observability pipeline (Stripe/Coinbase/NowPayments/Binance Pay/SumUp/SpotX planned)</li>
        </ul>
      </section>
    </main>
  );
}
