import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { briefingRouter } from './routes/briefings.js';
import { healthRouter } from './routes/health.js';
import { webhookRouter } from './routes/webhooks.js';

const app = express();

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use('/api/health', healthRouter);
app.use('/api/webhooks', webhookRouter);
app.use('/api/briefings', briefingRouter);

app.listen(env.port, () => {
  console.log(`crownops backend listening on :${env.port}`);
});
