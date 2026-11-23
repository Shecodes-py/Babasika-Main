import { Injectable } from '@nestjs/common';
import { CreatePfaDto } from './dto/create-pfa.dto.js';
import { UpdatePfaDto } from './dto/update-pfa.dto.js';

@Injectable()
export class PfasService {
  create(createPfaDto: CreatePfaDto) {
    return 'This action adds a new pfa';
  }

  findAll() {
    return `This action returns all pfas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pfa`;
  }

  update(id: number, updatePfaDto: UpdatePfaDto) {
    return `This action updates a #${id} pfa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pfa`;
  }
}
