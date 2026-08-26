import { redisClient } from './redis-client.ts';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_BASE_URL;

export async function getWeather(city : string) {
    if (!city) {
        throw new Error('City is required');
    }
    const result = await redisClient.get(`weather:${city}`);
    if (result == null) {
        // cache miss
        const url = `${BASE_URL}/${encodeURIComponent(city)}?key=${API_KEY}`;
        console.log('Requesting:', url); 
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API returned ${response.status}`);
        }
        const raw = await response.json();
        const today = raw.days[0];
        const ret = {
            city: raw.resolvedAddress,
            temperature: today.temp,
            tempMax: today.tempmax,
            tempMin: today.tempmin,
            condition: today.conditions,
            icon: today.icon,
            humidity: today.humidity,
            windspeed: today.windspeed,
        };

        // set cache
        await redisClient.set(`weather:${city}`, JSON.stringify(ret));

        // response
        return ret;
    } else {
        // cache hit
        return JSON.parse(result);

    }
} // end getWeather
