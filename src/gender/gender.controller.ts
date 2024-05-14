import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Gender')
@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Get()
  async findAll() {
    return this.genderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genderService.findOne(+id);
  }
}
