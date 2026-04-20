import fs from "fs";
import path from "path";

const today = new Date().toISOString().split("T")[0];

const content = `# LaunchGenie Daily Report — ${today}

## Summary
Automated daily execution report.

## Improvements
- Autonomous execution system
- Issue generation pipeline

## Build Tasks
- [ ] Connect reports to issues
- [ ] Expand AI generation layer

## Execution Status
- Completed: 1
- In Progress: 2
- Pending: 3
`;

const dir = path.join("reports","daily");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const filePath = path.join(dir, `${today}.md`);
fs.writeFileSync(filePath, content);

console.log("Daily report generated:", filePath);
