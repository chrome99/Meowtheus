import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

type MeowEvent = {
  catId: string;
  timestamp: string;
};

let clients: Response[] = [];

app.post('/meow', (req: Request, res: Response) => {
  const data: MeowEvent = req.body;

  const payload = `data: ${JSON.stringify(data)}\n\n`;
  for (const client of clients) {
    client.write(payload);
  }

  res.sendStatus(204);
});

app.get('/meow/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);

  req.on('close', () => {
    clients = clients.filter(c => c !== res);
  });
});

app.listen(PORT, () => {
  console.log(`🐱 Meowtheus backend running on http://localhost:${PORT}`);
});

