import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { PfasService } from './pfas.service.js';
import { CreatePfaDto } from './dto/create-pfa.dto.js';
import { UpdatePfaDto } from './dto/update-pfa.dto.js';

@Controller('pfas')
export class PfasController {
  constructor(private readonly pfasService: PfasService) {}

  @Post()
  create(@Body() createPfaDto: CreatePfaDto) {
    return this.pfasService.create(createPfaDto);
  }

  @Get()
  findAll() {
    return this.pfasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pfasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePfaDto: UpdatePfaDto) {
    return this.pfasService.update(+id, updatePfaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pfasService.remove(+id);
  }
}
