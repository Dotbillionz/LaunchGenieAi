const fs = require("fs");
const path = require("path");

const today = new Date().toISOString().split("T")[0];

const content = `
# LaunchGenie Daily Report — ${today}

## Improvements
- Autonomous Deal Sourcing Engine
- Portfolio Orchestrator
- CAC Compression System
- Reputation Monitoring Layer
- Venture Scoreboard

## Recap
- Platform shifting toward portfolio intelligence
- Stronger capital allocation discipline
- Execution systems becoming autonomous
`;

const filePath = path.join(__dirname, "..", "reports", "daily", `${today}.md`);

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, content);

console.log("✅ Daily report generated:", filePath);
