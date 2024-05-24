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
  Res,
} from '@nestjs/common';
import { Assistance } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AssistanceService } from './assistance.service';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

// @UseGuards(AuthGuard)
@ApiTags('assistance')
@Controller('assistance')
export class AssistanceController {
  constructor(private assistanceService: AssistanceService) {}

  @Get()
  async findAll() {
    return this.assistanceService.findAll();
  }

  @Get('between-dates')
  async getAssistancesWithinDateRange(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.assistanceService.getAssistancesWithinDateRange(
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('generate-excel-report')
  async generateExcelReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Res() res?: Response,
  ) {
    const assistances =
      await this.assistanceService.getAssistancesWithinDateRangeForExcel(
        new Date(startDate),
        new Date(endDate),
      );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Assistance Report');

    // Agregar encabezados de columna
    worksheet.addRow(['CÉDULA', 'NOMBRE', 'REGISTRO']);

    // Agregar filas de datos
    assistances.forEach((assistance) => {
      worksheet.addRow([
        assistance.identificationCard,
        assistance.fullName,
        assistance.clockCheck,
      ]);
    });

    // Enviar el archivo Excel como respuesta
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=assistance-report.xlsx',
    );

    await workbook.xlsx.write(res);

    res.end();
  }

  @Get('by-personal-between-dates/:personalId')
  async getAssistancesWithinDateRangeByPersonalId(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Param('personalId', ParseIntPipe) personalId?: number,
  ) {
    return this.assistanceService.getAssistancesWithinDateRangeByPersonalId(
      new Date(startDate),
      new Date(endDate),
      personalId,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assistanceService.findOne(id);
  }

  @Get('by-personal/:personalId')
  async findByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ) {
    return this.assistanceService.findByPersonalId(personalId);
  }

  @Post()
  async create(@Body() data: Assistance) {
    return this.assistanceService.create(data);
  }

  @Post('/sync')
  async syncFromSupabase() {
    return this.assistanceService.sync();
  }

  @Get('test/:clockCheck/:personalId')
  async test(
    @Param('clockCheck') clockCheck: Date,
    @Param('personalId', ParseIntPipe) personalId: number,
  ) {
    return this.assistanceService.verifyOnTime(clockCheck, personalId);
  }
}
