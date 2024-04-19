import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { SexsService } from './sexs.service';

// @UseGuards(AuthGuard)
@ApiTags('Sexs')
@Controller('sexs')
export class SexsController {
  constructor(private readonly sexsService: SexsService) {}

  @Get()
  async findAll() {
    return this.sexsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sexsService.findOne(+id);
  }
}
