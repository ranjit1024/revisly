import express, { Express, Request,Response } from "express";
const app:Express = express()
app.get('/', (_req: Request, res: Response) => {
  return res.send('Express TypeScript on Vercel');
});

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓');
});

export default app;