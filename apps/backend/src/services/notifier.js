import { env } from '../config/env.js';

async function safePost(url, payload) {
  if (!url) return { skipped: true };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return { status: response.status, ok: response.ok };
}

export async function notifySlack(text) {
  return safePost(env.slackWebhookUrl, { text });
}

export async function notifyTelegram(text) {
  if (!env.telegramBotToken || !env.telegramChatId) {
    return { skipped: true };
  }

  const url = `https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`;
  return safePost(url, { chat_id: env.telegramChatId, text });
}
