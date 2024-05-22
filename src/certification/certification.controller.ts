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
import { CertificationService } from './certification.service';
import { Certification } from '@prisma/client';

// @UseGuards(AuthGuard)
@ApiTags('Certification')
@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @Get()
  async findAll(): Promise<Certification[]> {
    return this.certificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Certification> {
    return this.certificationService.findOne(id);
  }

  @Post()
  async create(@Body() data: Certification): Promise<Certification> {
    return this.certificationService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Certification,
  ): Promise<Certification> {
    return this.certificationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Certification> {
    return this.certificationService.delete(id);
  }

  @Delete('personal/:personalId')
  async deleteByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ): Promise<any> {
    return this.certificationService.deleteByPersonalId(personalId);
  }

  @Get('personal/:personalId')
  async findByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ): Promise<Certification[]> {
    return this.certificationService.findByPersonalId(personalId);
  }
}
