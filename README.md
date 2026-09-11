# Weather-api
Weather API from visual crossing  

## Prerequisite and Start up
Prerequisite: nodejs, memurai  
Start up memurai with `Start-Service Memurai` (stop with `Stop-Service Memurai`).  
Health check: `memurai-cli ping` returns `pong`. Run `npm start` at /backend dir.  

## Tech stack
Backend uses nodejs with express. Caching with redis.  
```text
server.ts   -> app.ts           -> route -> service (logic for fetching and caching)
            -> redis-client.ts
```

## To-do
- add frontend to process json
- routing links html