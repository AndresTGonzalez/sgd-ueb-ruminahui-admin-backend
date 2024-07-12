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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { PersonalService } from './personal.service';
import * as ExcelJS from 'exceljs';

// @UseGuards(AuthGuard)
@ApiTags('personal')
@Controller('personal')
export class PersonalController {
  constructor(private personalService: PersonalService) {}

  @Get()
  async findAll() {
    return this.personalService.findAll();
  }

  @Get('generate-excel-report')
  async generateExcelReport(@Res() res?: Response) {
    // Obtener los datos
    const data = await this.personalService.getPersonalForExcelReport();

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();

    // Establecer el nombre del archivo
    const filename = `reporte-personal-${new Date().toISOString()}.xlsx`;

    // Agregar una nueva hoja al libro de Excel
    const worksheet = workbook.addWorksheet('Reporte de Personal');

    // Agregar encabezados de columna
    worksheet.addRow([
      'CÉDULA',
      'NOMBRES',
      'APELLIDOS',
      'FECHA DE NACIMIENTO',
      'GÉNERO',
      'PROVINCIA',
      'CIUDAD',
      'TELÉFONO',
      'EMAIL',
      'DIRECCIÓN',
      'CATEGORÍA',
      'FUNCIÓN',
      'TIPO DE SANGRE',
      'ALERGIAS',
      'MEDICAMENTOS',
      'ESTADO CIVIL',
      'NÚMERO DE HIJOS',
      'CAMPUS PERSONAL',
    ]);

    // Agregar filas de datos
    data.forEach((item) => {
      worksheet.addRow([
        item.identificationCard,
        item.names,
        item.lastNames,
        item.birthdate,
        item.gender,
        item.province,
        item.city,
        item.phone,
        item.email,
        item.address,
        item.category,
        item.function,
        item.bloodType,
        item.personalAllergy,
        item.personalMedication,
        item.maritalStatus,
        item.children,
        item.campusPersonal,
      ]);
    });

    // Configurar las cabeceras de la respuesta para enviar el archivo Excel
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    // Escribir el archivo Excel en la respuesta
    await workbook.xlsx.write(res);

    // Terminar la respuesta
    res.end();
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

  @Put('change-status/:id')
  async changeStatus(@Param('id', ParseIntPipe) id: number, @Body() data) {
    return this.personalService.changeAssistanceStatus(id, data.status);
  }
}
