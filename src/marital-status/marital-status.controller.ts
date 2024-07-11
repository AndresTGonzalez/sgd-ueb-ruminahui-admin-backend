import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { MaritalStatusService } from './marital-status.service';

// @UseGuards(AuthGuard)
@ApiTags('Marital Statuses')
@Controller('marital-status')
export class MaritalStatusesController {
  constructor(private readonly maritalStatusService: MaritalStatusService) {}

  @Get()
  async findAll() {
    return this.maritalStatusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.maritalStatusService.findOne(+id);
  }
}
