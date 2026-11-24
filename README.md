# BabaSika API

NestJS API foundation using Prisma ORM 7 and Neon PostgreSQL. Docker is not part of this local workflow; the database is hosted by Neon.

## Requirements

- Node.js 22 or later
- npm
- A Neon PostgreSQL database

## Setup

1. Copy `.env.example` to `.env` and replace both example Neon URLs with the connection strings for your development branch.
2. Keep `DATABASE_URL` set to Neon’s pooled connection string for API traffic. Set `DIRECT_URL` to the direct, non-pooled connection string for Prisma commands and migrations.
3. Install dependencies with `npm install`.
4. Generate the Prisma Client with `npm run prisma:generate`.
5. Apply the committed foundation migration with `npm run prisma:migrate:deploy`. Use `npm run prisma:migrate:dev -- --name <description>` when creating future schema changes.
6. Start the API with `npm run start:dev`.

Do not commit `.env` or real database credentials. `.env.example` is safe to commit because it contains placeholders only.

## API endpoints

- `GET /health/live` reports whether the application process is running.
- `GET /health/ready` checks whether the database can be reached and returns `503` when it cannot.
- `GET /api` opens the Swagger UI.

## Database changes

Edit `prisma/schema.prisma` for schema changes, then create a named development migration with `npm run prisma:migrate:dev -- --name <description>`. Commit both the schema and generated migration directory. Apply committed migrations to a deployment database with `npm run prisma:migrate:deploy`.

The initial schema creates `users` and `pfas`. User phone numbers, email addresses, and PFA names are unique. Email remains optional until authentication is implemented. User names are stored separately as `firstName` and `lastName`; `lastName` is optional to support users who do not provide one.

## Learning notes

- [How the PFA cache works](docs/caching-explained.md)

## Code quality

- `npm run lint` runs ESLint with the typescript-eslint recommended rules.
- `npm run lint:ox` also runs the starter project's Oxlint checks.
- `npm run format` formats the TypeScript source and Prisma config.
- `npm run format:check` checks formatting without editing files.
- `npm run build` compiles the application.

## Docker grading note

This project currently uses Neon and does not define Docker Compose services. If the foundation rubric still requires `docker compose up` to start both the app and database, clarify with your mentor how that criterion is scored for the approved no-Docker setup.
