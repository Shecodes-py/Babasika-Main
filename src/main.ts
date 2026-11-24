import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const openApiDocument = {
    openapi: '3.0.3',
    info: {
      title: 'BabaSika API',
      description: 'Backend API for BabaSika',
      version: '1.0.0',
    },
    paths: {
      '/health/live': {
        get: {
          summary: 'Check whether the API process is running',
          responses: { '200': { description: 'API process is running' } },
        },
      },
      '/health/ready': {
        get: {
          summary: 'Check whether the API can reach its database',
          responses: {
            '200': { description: 'Database is reachable' },
            '503': { description: 'Database is unavailable' },
          },
        },
      },
      '/pfas': {
        get: {
          summary: 'List pension fund administrators',
          responses: {
            '200': { description: 'PFA list returned from cache or database' },
          },
        },
      },
    },
  } as const;
  app.use('/api', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
