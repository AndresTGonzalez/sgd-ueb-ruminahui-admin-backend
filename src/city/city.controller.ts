import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CityService } from './city.service';

@UseGuards(AuthGuard)
@ApiTags('Cities')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }

  @Get('province/:provinceId')
  async findByProvinceId(@Param('provinceId') provinceId: string) {
    return this.cityService.findByProvinceId(+provinceId);
  }
}
