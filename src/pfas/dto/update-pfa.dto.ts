import { PartialType } from '@nestjs/mapped-types';
import { CreatePfaDto } from './create-pfa.dto.js';

export class UpdatePfaDto extends PartialType(CreatePfaDto) {}
