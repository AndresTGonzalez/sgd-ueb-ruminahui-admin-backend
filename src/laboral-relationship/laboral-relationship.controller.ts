import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { LaboralRelationshipService } from './laboral-relationship.service';

// @UseGuards(AuthGuard)
@ApiTags('Laboral Relationship')
@Controller('laboral-relationship')
export class LaboralRelationshipController {
  constructor(
    private readonly laboralRelationshipService: LaboralRelationshipService,
  ) {}

  @Get()
  async findAll() {
    return this.laboralRelationshipService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.laboralRelationshipService.findOne(+id);
  }
}
