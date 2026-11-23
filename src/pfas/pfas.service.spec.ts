import { Test, TestingModule } from '@nestjs/testing';
import { PfasService } from './pfas.service.js';

describe('PfasService', () => {
  let service: PfasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PfasService],
    }).compile();

    service = module.get<PfasService>(PfasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
