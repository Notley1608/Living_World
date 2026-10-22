import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { WebSocketServer } from 'ws';
import type { ServerMsg } from '@shared';
import { createWorld, tick, toSnapshot } from '@sim';

const PORT = Number(process.env.PORT ?? 3000);
const TICK_MS = 100;

const app = express();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(fileURLToPath(new URL('../../dist/client', import.meta.url))));
}

const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

const world = createWorld();
setInterval(() => {
  tick(world, TICK_MS);
  const msg = JSON.stringify({ type: 'snapshot', data: toSnapshot(world) } satisfies ServerMsg);
  for (const client of wss.clients) client.send(msg);
}, TICK_MS);

server.listen(PORT, () => console.log(`Living_World server on http://localhost:${PORT}`));
