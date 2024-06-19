import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssistanceBiotimeService } from './assistance-biotime.service';

@ApiTags('assistance-biotime')
@Controller('assistance-biotime')
export class AssistanceBiotimeController {
  constructor(
    private readonly assistanceBiotimeService: AssistanceBiotimeService,
  ) {}

  @Get()
  async getAssistanceBiotime() {
    return await this.assistanceBiotimeService.getAssistanceBiotime();
  }

  @Get(':emp_code')
  async getAssistanceByEmpCode(@Param('emp_code') emp_code: string) {
    return await this.assistanceBiotimeService.getAssistanceByEmpCode(emp_code);
  }

  @Post('sync')
  async syncAssistance() {
    return await this.assistanceBiotimeService.syncAssistance();
  }
}
