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
import { InstitutionalPersonalDataService } from './institutional-personal-data.service';
import { InstitutionalPersonalData } from '@prisma/client';

// @UseGuards(AuthGuard)
@ApiTags('InstitutionalPersonalData')
@Controller('institutional-personal-data')
export class InstitutionalPersonalDataController {
  constructor(
    private readonly institutionalPersonalDataService: InstitutionalPersonalDataService,
  ) {}

  @Get()
  async findAll(): Promise<InstitutionalPersonalData[]> {
    return this.institutionalPersonalDataService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InstitutionalPersonalData> {
    return this.institutionalPersonalDataService.findOne(id);
  }

  @Post()
  async create(
    @Body() data: InstitutionalPersonalData,
  ): Promise<InstitutionalPersonalData> {
    return this.institutionalPersonalDataService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: InstitutionalPersonalData,
  ): Promise<InstitutionalPersonalData> {
    return this.institutionalPersonalDataService.update(id, data);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InstitutionalPersonalData> {
    return this.institutionalPersonalDataService.delete(id);
  }

  @Delete('personal/:personalId')
  async deleteByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ): Promise<any> {
    return this.institutionalPersonalDataService.deleteByPersonalId(personalId);
  }

  @Get('personal/:personalId')
  async findByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ): Promise<InstitutionalPersonalData[]> {
    return this.institutionalPersonalDataService.findByPersonalId(personalId);
  }
}
