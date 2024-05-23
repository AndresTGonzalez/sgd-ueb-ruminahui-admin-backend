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
import { AssistancePersonalIdentificatorService } from './assistance-personal-identificator.service';
import { AssistancePersonalIdentificator } from 'prisma/prisma-client';

// @UseGuards(AuthGuard)
@ApiTags('AssistancePersonalIdentificator')
@Controller('assistance-personal-identificator')
export class AssistancePersonalIdentificatorController {
  constructor(
    private readonly assistancePersonalIdentificatorService: AssistancePersonalIdentificatorService,
  ) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.assistancePersonalIdentificatorService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AssistancePersonalIdentificator> {
    return this.assistancePersonalIdentificatorService.findOne(id);
  }

  @Post()
  async create(@Body() data: any): Promise<AssistancePersonalIdentificator> {
    return this.assistancePersonalIdentificatorService.create(data);
  }
}
