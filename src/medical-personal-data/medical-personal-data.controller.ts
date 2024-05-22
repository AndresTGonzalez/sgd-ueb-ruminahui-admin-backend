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
import { MedicalPersonalDataService } from './medical-personal-data.service';
import { MedicalPersonalData } from '@prisma/client';

// @UseGuards(AuthGuard)
@ApiTags('MedicalPersonalData')
@Controller('medical-personal-data')
export class MedicalPersonalDataController {
  constructor(
    private readonly medicalPersonalDataService: MedicalPersonalDataService,
  ) {}

  @Get()
  async findAll(): Promise<MedicalPersonalData[]> {
    return this.medicalPersonalDataService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MedicalPersonalData> {
    return this.medicalPersonalDataService.findOne(id);
  }

  @Post()
  async create(
    @Body() data: MedicalPersonalData,
  ): Promise<MedicalPersonalData> {
    return this.medicalPersonalDataService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: MedicalPersonalData,
  ): Promise<MedicalPersonalData> {
    return this.medicalPersonalDataService.update(id, data);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MedicalPersonalData> {
    return this.medicalPersonalDataService.delete(id);
  }

  @Delete('personal/:personalId')
  async deleteByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ): Promise<any> {
    return this.medicalPersonalDataService.deleteByPersonalId(personalId);
  }

  @Get('personal/:personalId')
  async findByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ): Promise<MedicalPersonalData[]> {
    return this.medicalPersonalDataService.findByPersonalId(personalId);
  }
}
