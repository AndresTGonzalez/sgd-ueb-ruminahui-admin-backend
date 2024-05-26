import { Module } from '@nestjs/common';
import { AssistanceService } from './assistance.service';
import { AssistanceController } from './assistance.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssistancePersonalIdentificatorModule } from 'src/assistance-personal-identificator/assistance-personal-identificator.module';
import { PersonalScheduleModule } from 'src/personal-schedule/personal-schedule.module';

@Module({
  imports: [
    PrismaModule,
    AssistancePersonalIdentificatorModule,
    PersonalScheduleModule,
  ],
  exports: [AssistanceService],
  providers: [AssistanceService],
  controllers: [AssistanceController],
})
export class AssistanceModule {}

