import fs from "fs";
import path from "path";

const today = new Date().toISOString().split("T")[0];

const content = `# LaunchGenie Daily Report — ${today}

## Summary
Automated daily execution report.

## Improvements
- Autonomous Deal Sourcing Engine
- Portfolio Orchestrator
- CAC Compression System
- Reputation Monitoring Layer
- Venture Scoreboard

## Build Tasks
- [ ] Connect reports to issues
- [ ] Expand AI generation layer

## Execution Status
- Completed: 1
- In Progress: 2
- Pending: 3

## Recap
- Platform shifting toward portfolio intelligence
- Stronger capital allocation discipline
- Execution systems becoming autonomous
`;

const dir = path.join("reports", "daily");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const filePath = path.join(dir, `${today}.md`);
fs.writeFileSync(filePath, content);

console.log("✅ Daily report generated:", filePath);
