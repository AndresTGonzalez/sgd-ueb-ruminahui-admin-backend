import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Provinces')
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  async findAll() {
    return this.provinceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.provinceService.findOne(+id);
  }
}
