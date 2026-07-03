import { env } from '../config/env.js';

export async function syncDecisionToNotion({ title, status, owner }) {
  if (!env.notionApiKey || !env.notionDatabaseId) {
    return { skipped: true, reason: 'Notion credentials missing' };
  }

  return {
    queued: true,
    payload: { title, status, owner }
  };
}
