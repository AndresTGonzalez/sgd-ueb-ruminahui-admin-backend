import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { BloodTypeService } from './blood-type.service';

// @UseGuards(AuthGuard)
@ApiTags('Blood Types')
@Controller('blood-type')
export class BloodTypeController {
  constructor(private readonly bloodTypeService: BloodTypeService) {}

  @Get()
  async findAll() {
    return this.bloodTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.bloodTypeService.findOne(id);
  }
}
