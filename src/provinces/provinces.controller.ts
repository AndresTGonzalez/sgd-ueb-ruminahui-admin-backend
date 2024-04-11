import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Provinces')
@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get()
  async findAll() {
    return this.provincesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.provincesService.findOne(+id);
  }
}
