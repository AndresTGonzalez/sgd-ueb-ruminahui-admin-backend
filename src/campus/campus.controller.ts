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
import { CreateCampusDto } from './campus.model';
import { CampusService } from './campus.service';

@UseGuards(AuthGuard)
@ApiTags('Campus')
@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Get()
  async findAll() {
    return this.campusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.campusService.findOne(id);
  }

  @Post()
  async create(@Body() createCampusDto: CreateCampusDto) {
    return this.campusService.create(createCampusDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateCampusDto,
  ) {
    return this.campusService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.campusService.remove(id);
  }
}
