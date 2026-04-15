import crypto from 'crypto';
import { Router } from 'express';
import { env } from '../config/env.js';
import { notifySlack, notifyTelegram } from '../services/notifier.js';

export const webhookRouter = Router();

function verifyGithubSignature(req) {
  const signature = req.header('x-hub-signature-256');
  if (!signature || !env.githubWebhookSecret) return false;

  const digest = `sha256=${crypto
    .createHmac('sha256', env.githubWebhookSecret)
    .update(req.rawBody)
    .digest('hex')}`;

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

webhookRouter.post('/github', async (req, res) => {
  const event = req.header('x-github-event') || 'unknown';

  if (!verifyGithubSignature(req)) {
    return res.status(401).json({ error: 'invalid signature' });
  }

  const repository = req.body?.repository?.full_name || 'unknown-repo';
  const action = req.body?.action || 'updated';
  const message = `GitHub event: ${event} | ${repository} | action=${action}`;

  await Promise.all([notifySlack(message), notifyTelegram(message)]);

  return res.status(202).json({ received: true, event, repository, action });
});
