import { Module } from '@nestjs/common';
import { AssistanceService } from './assistance.service';
import { AssistanceController } from './assistance.controller';

@Module({
  providers: [AssistanceService],
  controllers: [AssistanceController]
})
export class AssistanceModule {}
