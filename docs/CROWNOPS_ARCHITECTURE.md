# CrownOps Milestone 1 Architecture

## Scope delivered
- Monorepo scaffold for backend + frontend + shared packages.
- Express backend with secure middleware baseline, role checks, and webhook endpoint.
- Next.js executive dashboard layout for core KPI visibility.
- CI workflow and environment template for secure deploy pipelines.

## Services map
- `apps/backend`: API, webhooks, daily briefing endpoint, notifier services.
- `apps/frontend`: executive dashboard shell.
- `packages/shared`: reserved for DTOs, schema validators, and SDK clients.

## Initial API routes
- `GET /api/health`
- `POST /api/webhooks/github`
- `GET /api/briefings/daily`

## Integration readiness
- Slack + Telegram event notifications wired at service layer.
- Notion sync service stub prepared for database writes.
- GitHub webhook signature verification implemented using HMAC SHA256.

## Next milestone recommendation
1. Add persistent data store (Postgres + Prisma).
2. Implement payment provider adapters and transaction ingest.
3. Add RBAC with JWT/OIDC and audit logging.
4. Build Notion sync worker and Slack command bot.
