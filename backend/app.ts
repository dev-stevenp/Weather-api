import express from 'express';
import weatherRoute from './weather.route.ts';

const app = express();
app.use(express.json());
app.use('/weather', weatherRoute);
export default app;