import { Injectable, Logger } from '@nestjs/common';
import NodeCache from 'node-cache';
import type { PfaModel } from '../generated/prisma/models/Pfa.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePfaDto } from './dto/create-pfa.dto.js';
import { UpdatePfaDto } from './dto/update-pfa.dto.js';

const PFA_LIST_CACHE_KEY = 'pfas:list';

@Injectable()
export class PfasService {
  private readonly logger = new Logger(PfasService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: NodeCache,
  ) {}

  create(_createPfaDto: CreatePfaDto) {
    return 'This action adds a new pfa';
  }

  async findAll(): Promise<PfaModel[]> {
    const cachedPfas = this.cache.get<PfaModel[]>(PFA_LIST_CACHE_KEY);

    if (cachedPfas !== undefined) {
      this.logger.log('Cache HIT for pfas:list');
      return cachedPfas;
    }

    this.logger.log('Cache MISS for pfas:list; reading from PostgreSQL');
    const pfas = await this.prisma.pfa.findMany({
      orderBy: { name: 'asc' },
    });

    this.cache.set(PFA_LIST_CACHE_KEY, pfas);
    return pfas;
  }

  findOne(id: number) {
    return `This action returns a #${id} pfa`;
  }

  update(id: number, _updatePfaDto: UpdatePfaDto) {
    return `This action updates a #${id} pfa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pfa`;
  }
}
