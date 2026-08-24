// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World\n');
// })

// server.listen(port, hostname, () => {
//     console.log(`server listening at: http://${hostname}:${port}/`)
// })

import express, { Router } from 'express';
import type { Request, Response } from 'express';
import { getWeather } from './weather.service.ts';

const router = Router();

router.get('/', async (req : Request, res : Response) => {
  try {
    const city = req.query.city as string;
    const data = await getWeather(city);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

export default router;