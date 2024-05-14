import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  UseGuards,
  Param,
} from '@nestjs/common';
import { CampusPersonalService } from './campus-personal.service';
import { CampusPersonal } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Campus Personal')
@Controller('campus-personal')
export class CampusPersonalController {
  constructor(private readonly campusPersonalService: CampusPersonalService) {}

  @Get()
  async findAll(): Promise<CampusPersonal[]> {
    return this.campusPersonalService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CampusPersonal> {
    return this.campusPersonalService.findOne(id);
  }

  @Get('campus/:campusId')
  async findByCampusId(
    @Param('campusId', ParseIntPipe) campusId: number,
  ): Promise<CampusPersonal[]> {
    return this.campusPersonalService.findByCampusId(campusId);
  }

  @Get('personal/:personalId')
  async findByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ): Promise<CampusPersonal[]> {
    return this.campusPersonalService.findByPersonalId(personalId);
  }

  @Post()
  async create(@Body() data: CampusPersonal): Promise<CampusPersonal> {
    return this.campusPersonalService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CampusPersonal,
  ): Promise<CampusPersonal> {
    return this.campusPersonalService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<CampusPersonal> {
    return this.campusPersonalService.delete(id);
  }
}
