import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { FunctionService } from './function.service';

// @UseGuards(AuthGuard)
@ApiTags('Function')
@Controller('function')
export class FunctionController {
  constructor(private readonly functionService: FunctionService) {}

  @Get()
  async findAll() {
    return this.functionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.functionService.findOne(+id);
  }
}
