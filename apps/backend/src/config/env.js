import dotenv from 'dotenv';

dotenv.config();

const required = ['PORT', 'GITHUB_WEBHOOK_SECRET'];

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[config] Missing required environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT || 8080),
  nodeEnv: process.env.NODE_ENV || 'development',
  githubWebhookSecret: process.env.GITHUB_WEBHOOK_SECRET || '',
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL || '',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  telegramChatId: process.env.TELEGRAM_CHAT_ID || '',
  notionApiKey: process.env.NOTION_API_KEY || '',
  notionDatabaseId: process.env.NOTION_DATABASE_ID || ''
};
