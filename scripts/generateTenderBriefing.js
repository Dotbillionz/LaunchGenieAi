import fs from 'fs';
import path from 'path';
import { scanTenders } from '../apps/backend/src/services/tenderService.js';

async function main() {
  const today = new Date().toISOString().split('T')[0];
  const result = scanTenders({});
  const shortlisted = result.opportunities.filter(({ shortlisted: isShortlisted }) => isShortlisted);

  const jsonDir = path.join('data', 'tenders');
  const reportsDir = path.join('reports', 'tenders');

  fs.mkdirSync(jsonDir, { recursive: true });
  fs.mkdirSync(reportsDir, { recursive: true });

  const jsonOutput = {
    generatedAt: result.generatedAt,
    summary: result.summary,
    criteria: result.criteria,
    opportunities: result.opportunities
  };

  fs.writeFileSync(path.join(jsonDir, 'wcgroup-italy-latest.json'), JSON.stringify(jsonOutput, null, 2));
  fs.writeFileSync(path.join(reportsDir, `${today}.json`), JSON.stringify(jsonOutput, null, 2));

  const markdown = `# WCGroup Italy Tender Briefing — ${today}

## Scan Summary
- Official sources monitored: ${result.summary.totalSources}
- Opportunities scored: ${result.summary.totalOpportunities}
- Shortlisted opportunities: ${result.summary.shortlisted}
- Direct US LLC routes: ${result.summary.directUsLlc}
- Italian partner / RTI routes: ${result.summary.partnerRoute}
- Future Italian S.r.l. routes: ${result.summary.futureItalianSrl}

## Source Coverage
${result.sources.map((source) => `- **${source.name}** — ${source.coverage}`).join('\n')}

## Shortlist
${shortlisted
  .map(
    (opportunity) => `### ${opportunity.title}
- Source: ${opportunity.sourceName}
- Score: ${opportunity.score.total}/100
- Legal route: ${opportunity.legalRouteLabel}
- Estimated value: €${opportunity.estimatedValue.toLocaleString()}
- Deadline: ${new Date(opportunity.deadline).toLocaleDateString('en-GB')}
- Memo: ${opportunity.actionPack.bidNoBidMemo}
- Next steps:
${opportunity.actionPack.nextActionTimeline.map((item) => `  - ${item}`).join('\n')}`
  )
  .join('\n\n')}

## Guardrail
- No official bid is submitted automatically. Final submission remains subject to human and legal review.
`;

  fs.writeFileSync(path.join(reportsDir, `${today}.md`), markdown);

  console.log('Tender briefing generated:', path.join(reportsDir, `${today}.md`));
}

await main();
