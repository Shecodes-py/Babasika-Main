import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthController } from './health/health.controller.js';
import { HealthService } from './health/health.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from './users/users.module.js';
import { PfasModule } from './pfas/pfas.module.js';

@Module({
  imports: [PrismaModule, CacheModule.register(), UsersModule, PfasModule],
  controllers: [AppController, HealthController],
  providers: [AppService, HealthService],

  
  CacheModule.register({
    isGlobal: true,
  });

})
export class AppModule {}