import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { MaritalStatusesService } from './marital-statuses.service';

@UseGuards(AuthGuard)
@ApiTags('Marital Statuses')
@Controller('marital-statuses')
export class MaritalStatusesController {
  constructor(
    private readonly maritalStatusesService: MaritalStatusesService,
  ) {}

  @Get()
  async findAll() {
    return this.maritalStatusesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.maritalStatusesService.findOne(+id);
  }
}
