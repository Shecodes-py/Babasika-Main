import { Module } from '@nestjs/common';
import { PfasService } from './pfas.service.js';
import { PfasController } from './pfas.controller.js';

@Module({
  controllers: [PfasController],
  providers: [PfasService],
})
export class PfasModule {}
