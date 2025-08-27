# LaunchGenie API Routes

This document sketches out the server‑side endpoints for a complete LaunchGenie platform. These routes are designed to power both the web UI and third‑party integrations.

## `/api/plan` (POST)

Generate a launch plan based on user input. Accepts a JSON payload with fields like `country`, `state`, `city` and `idea`. The server locates the most relevant scenario pack (if available), augments it with dynamic regulatory data and returns:

* **Permits:** list of required licences and regulatory actions.
* **Tasks:** ordered tasks with dependencies and recommended due dates.
* **Shopping:** purchase and rental checklists.
* **Budgets:** budget tiers with cost breakdowns and recommended actions.
* **Emails:** templated outreach messages for landlords, vendors and investors.

Example request:

```json
{
  "country": "Italy",
  "state": "Tuscany",
  "city": "Fucecchio",
  "idea": "Billiards & Hookah Lounge"
}
```

## `/api/packs` (GET)

Return a list of available scenario packs. Each item includes the pack’s `id`, region and idea so that clients can show a dropdown of prebuilt options.

## `/api/packs` (POST)

Create or update a scenario pack. Accepts a JSON payload matching the format described in `SCENARIO_PACKS.md`. Requires authentication and proper authorisation.

## `/api/metrics` (GET)

Return high‑level metrics and analytics for the current user or organisation. Includes number of automated tasks, Snapback activations, generated pitch decks and adoption statistics.

## `/api/webhooks` (POST)

Receive asynchronous events from external services (e.g. Notion, Slack, Stripe). The automation engine listens on this endpoint to trigger Snapback workflows or update tasks when statuses change.

## `/api/auth/*`

Standard authentication routes (login, logout, refresh). Also handles OAuth flows for connecting external services like Notion or Slack.

---

These definitions are aspirational and intended as a blueprint. The actual implementation may differ depending on the backend framework (Express.js, Fastify, etc.) and deployment environment.
