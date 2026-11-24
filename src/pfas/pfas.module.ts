import { Module } from '@nestjs/common';
import { PfasService } from './pfas.service.js';
import { PfasController } from './pfas.controller.js';
import { NodeCacheModule } from '../cache/node-cache.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [NodeCacheModule, PrismaModule],
  controllers: [PfasController],
  providers: [PfasService],
})
export class PfasModule {}
