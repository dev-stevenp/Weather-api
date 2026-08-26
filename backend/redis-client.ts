import { createClient } from 'redis';

export const redisClient = createClient();
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();