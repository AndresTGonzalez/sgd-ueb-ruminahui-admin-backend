import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CitiesService } from './cities.service';

// @UseGuards(AuthGuard)
@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.citiesService.findOne(+id);
  }

  @Get('province/:provinceId')
  async findByProvinceId(@Param('provinceId') provinceId: string) {
    return this.citiesService.findByProvinceId(+provinceId);
  }
}
