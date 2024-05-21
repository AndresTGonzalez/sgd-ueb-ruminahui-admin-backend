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
import { PersonalScheduleService } from './personal-schedule.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { PersonalSchedule } from '@prisma/client';

// @UseGuards(AuthGuard)
@ApiTags('personal-schedule')
@Controller('personal-schedule')
export class PersonalScheduleController {
  constructor(private personalScheduleService: PersonalScheduleService) {}

  @Get()
  async findAll() {
    return this.personalScheduleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personalScheduleService.findOne(id);
  }

  @Post()
  async create(@Body() data: PersonalSchedule) {
    return this.personalScheduleService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: PersonalSchedule,
  ) {
    return this.personalScheduleService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.personalScheduleService.remove(id);
  }

  @Get('by-personal-id/:personalId')
  async findOneByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ) {
    return this.personalScheduleService.findByPersonalId(personalId);
  }
}
