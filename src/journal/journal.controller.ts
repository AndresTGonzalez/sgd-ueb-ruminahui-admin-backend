import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { JournalService } from './journal.service';

// @UseGuards(AuthGuard)
@ApiTags('Journal')
@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  async findAll() {
    return this.journalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.journalService.findOne(id);
  }
}
