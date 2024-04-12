import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GendersService } from './genders.service';

@UseGuards(AuthGuard)
@ApiTags('Genders')
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Get()
  async findAll() {
    return this.gendersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gendersService.findOne(+id);
  }
}
