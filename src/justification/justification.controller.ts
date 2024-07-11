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
  Query,
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

  @Get()
  findAll() {
    return this.justificationService.findAll();
  }

  @Get('between-dates')
  findeBetweenDates(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    const startDateISO = new Date(startDate);
    const endDateISO = new Date(endDate);
    return this.justificationService.findeBetweenDates(
      startDateISO,
      endDateISO,
    );
  }

  // Obtener los estados de las justificaciones
  @Get('status')
  getStatus() {
    return this.justificationService.getJustificationStatus();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.justificationService.findOne(id);
  }

  @Post()
  create(@Body() data: Justification) {
    return this.justificationService.create(data);
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

  // Cambiar el estado de una justificación
  @Put(':id/status')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('statusId') statusId: number,
  ) {
    return this.justificationService.changeStatus(id, statusId);
  }
}
