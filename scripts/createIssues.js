import fs from "fs";

const token = process.env.GITHUB_TOKEN;
const repo = "Dotbillionz/LaunchGenieAi";

const file = process.argv[2];
const content = fs.readFileSync(file, "utf-8");

const tasks = content
  .split("\n")
  .filter(line => line.startsWith("- [ ]"))
  .map(line => line.replace("- [ ]", "").trim());

async function createIssue(title) {
  const res = await fetch("https://api.github.com/repos/" + repo + "/issues", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      body: "Auto-generated from " + file
    })
  });

  const data = await res.json();
  console.log("Issue:", data.html_url);
}

(async () => {
  for (const task of tasks) {
    await createIssue("LG Task: " + task);
  }
})();
