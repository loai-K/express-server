## Express Application

Node, Express, PostgresSQL, Redis, JWT, jasmine, proxy, and Docker

- run development
```bash
 cp .env.example .env
 yarn migration:run
 yarn db:seed
 yarn dev
```
- make migration
```
migrate:create
```

- Docker
```docker
docker-compose up --build -d
```

---
By: [Loai Kanou](https://github.com/loai-k)
