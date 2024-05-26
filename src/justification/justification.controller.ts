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
import { JustificationService } from './justification.service';
import { Justification } from '@prisma/client';

// @UseGuards(AuthGuard)
@ApiTags('justification')
@Controller('justification')
export class JustificationController {
  constructor(private readonly justificationService: JustificationService) {}

  @Post()
  create(@Body() data: Justification) {
    return this.justificationService.create(data);
  }

  @Get()
  findAll() {
    return this.justificationService.findAll();
    
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.justificationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Justification) {
    return this.justificationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.justificationService.remove(id);
  }

  @Post('sync')
  syncJustifications() {
    return this.justificationService.syncJustifications();
  }
}
