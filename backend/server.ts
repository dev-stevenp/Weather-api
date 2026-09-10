import 'dotenv/config';
import app from "./app.ts";
import { redisClient } from "./redis-client.ts";

const PORT = process.env.PORT || 3000;

await redisClient.connect();
console.log("Redis connected");

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});