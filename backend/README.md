# Backend Services

This folder contains a small NestJS application exposing CRUD APIs for brands, categories and products.
The project uses TypeORM with a MySQL database hosted on Google Cloud SQL. Database connection options can be configured via environment variables. By default the application connects to the Cloud SQL instance using the following settings:

```
host: 34.58.204.105
user: root
password: FgyyB}=^.}Sct.Q]
database: test-db
```


```
DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME
```

To run locally:

```bash
npm install

npm run start:dev
```

The app listens on port **3001**.
