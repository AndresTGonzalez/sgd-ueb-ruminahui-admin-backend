import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssistanceIvmsService } from './assistance-ivms.service';

@ApiTags('assistance-ivms')
@Controller('assistance-ivms')
export class AssistanceIvmsController {
  constructor(private readonly assistanceIvmsService: AssistanceIvmsService) {}

  @Get()
  async getAssistanceIvms() {
    return await this.assistanceIvmsService.getAssistanceIvms();
  }

  @Post('sync')
  async syncAssistance() {
    return await this.assistanceIvmsService.syncAssistance();
  }
}
