# Backend Services

This folder contains a small NestJS application exposing CRUD APIs for brands, categories and products.
The project uses TypeORM with a MariaDB database. Database connection options can be configured via environment variables:

```
DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME
```

To run locally:

```bash
npm install

npm run start:dev
```

The app listens on port **3001**.
