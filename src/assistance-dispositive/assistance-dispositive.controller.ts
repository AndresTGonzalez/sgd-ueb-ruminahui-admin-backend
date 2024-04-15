import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AssistanceDispositiveService } from './assistance-dispositive.service';
import { CreateAssistanceDispositiveDto } from './assistance-dispositive.model';

// @UseGuards(AuthGuard)
@ApiTags('Assistance Dispositive')
@Controller('assistance-dispositive')
export class AssistanceDispositiveController {
  constructor(
    private readonly assistanceDispositiveService: AssistanceDispositiveService,
  ) {}

  @Get()
  async findAll() {
    return this.assistanceDispositiveService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.assistanceDispositiveService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createAssistanceDispositiveDto: CreateAssistanceDispositiveDto,
  ) {
    return this.assistanceDispositiveService.create(
      createAssistanceDispositiveDto,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssistanceDispositiveDto: CreateAssistanceDispositiveDto,
  ) {
    return this.assistanceDispositiveService.update(
      +id,
      updateAssistanceDispositiveDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.assistanceDispositiveService.remove(+id);
  }
}
