## Express Application

Node JS, Express, PostgresSQL, Redis, JWT, jasmine, proxy, and Docker

- Copy environment variables
```bash
cp .env.example .env
```

- Run database migrations
```bash
yarn migrate:run
```

- Reset database migrations
```bash
yarn migrate:reset
```

- Make migration
```bash
yarn migrate:create
```

- Start Run server
```bash
 cp .env.example .env
 yarn migration:run
 yarn db:seed
 yarn dev
 // yarn start
```

- Docker
```docker
docker-compose up --build -d
```

__Test Server running
> /api

> /api/info

> /api/metrics

> /api/health

__Api Routes
> /api/v1/**

> /api/v2/**
 
__Proxy Routes
> /proxy/users

> /proxy/todos

> /proxy/posts

> /proxy/comments

> /proxy/albums

> /proxy/photos

__WebSocket Route
> ws://localhost:3000/ws

---
By: [Loai Kanou](https://github.com/loai-k)
