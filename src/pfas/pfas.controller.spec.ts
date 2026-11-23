import { Test, TestingModule } from '@nestjs/testing';
import { PfasController } from './pfas.controller.js';
import { PfasService } from './pfas.service.js';

describe('PfasController', () => {
  let controller: PfasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PfasController],
      providers: [PfasService],
    }).compile();

    controller = module.get<PfasController>(PfasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
