import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { LaboralRegimeService } from './laboral-regime.service';

// @UseGuards(AuthGuard)
@ApiTags('Laboral Regime')
@Controller('laboral-regime')
export class LaboralRegimeController {
  constructor(private readonly laboralRegimeService: LaboralRegimeService) {}

  @Get()
  async findAll() {
    return this.laboralRegimeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.laboralRegimeService.findOne(+id);
  }
}
