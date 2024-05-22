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
import { TitleService } from './title.service';
import { Title } from '@prisma/client';

// @UseGuards(AuthGuard)
@ApiTags('Title')
@Controller('title')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  @Get()
  async findAll(): Promise<Title[]> {
    return this.titleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Title> {
    return this.titleService.findOne(id);
  }

  @Post()
  async create(@Body() data: Title): Promise<Title> {
    return this.titleService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Title,
  ): Promise<Title> {
    return this.titleService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Title> {
    return this.titleService.delete(id);
  }

  @Delete('personal/:personalId')
  async deleteByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ): Promise<any> {
    return this.titleService.deleteByPersonalId(personalId);
  }

  @Get('personal/:personalId')
  async findByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ): Promise<Title[]> {
    return this.titleService.findByPersonalId(personalId);
  }
}
