import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { PersonalService } from './personal.service';

// @UseGuards(AuthGuard)
@ApiTags('personal')
@Controller('personal')
export class PersonalController {
  constructor(private personalService: PersonalService) {}

  @Get()
  async findAll() {
    return this.personalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personalService.findOne(id);
  }

  @Post()
  async create(@Body() data) {
    return this.personalService.create(data);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data) {
    return this.personalService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.personalService.delete(id);
  }
}
