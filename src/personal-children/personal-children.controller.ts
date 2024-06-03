import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PersonalChildrenService } from './personal-children.service';
import { PersonalChildren } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

// @UseGuards(AuthGuard)
@ApiTags('Personal Children')
@Controller('personal-children')
export class PersonalChildrenController {
  constructor(
    private readonly personalChildrenService: PersonalChildrenService,
  ) {}

  @Get()
  async findAll(): Promise<PersonalChildren[]> {
    return this.personalChildrenService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personalChildrenService.findOne(id);
  }

  @Post()
  async create(@Body() data: PersonalChildren) {
    return this.personalChildrenService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: PersonalChildren,
  ) {
    return this.personalChildrenService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.personalChildrenService.remove(id);
  }

  @Delete('personal/:personalId')
  async removeByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ) {
    return this.personalChildrenService.removeByPersonalId(personalId);
  }

  @Get('personal/:personalId')
  async findByPersonalId(
    @Param('personalId', ParseIntPipe) personalId: number,
  ) {
    return this.personalChildrenService.findByPersonalId(personalId);
  }
}
