import { Controller, Get, Param } from '@nestjs/common';
import { BiotimeService } from './biotime.service';

@Controller('biotime')
export class BiotimeController {
  constructor(private readonly biotimeService: BiotimeService) {}

  @Get()
  async findAssistance() {
    return this.biotimeService.findAssistance();
  }

  @Get(':employeId')
  async findAssistanceByEmployeId(@Param('employeId') employeId: string) {
    return this.biotimeService.findAssistanceByEmployeId(employeId);
  }
}
