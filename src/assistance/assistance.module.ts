import { Module } from '@nestjs/common';
import { AssistanceService } from './assistance.service';
import { AssistanceController } from './assistance.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssistancePersonalIdentificatorModule } from 'src/assistance-personal-identificator/assistance-personal-identificator.module';
import { PersonalScheduleModule } from 'src/personal-schedule/personal-schedule.module';
import { AssistanceIvmsModule } from 'src/assistance-ivms/assistance-ivms.module';
import { AssistanceBiotimeModule } from 'src/assistance-biotime/assistance-biotime.module';
import { AssistanceUtilsModule } from 'src/assistance-utils/assistance-utils.module';
import { NotificationMailModule } from 'src/notification-mail/notification-mail.module';

@Module({
  imports: [
    PrismaModule,
    AssistancePersonalIdentificatorModule,
    PersonalScheduleModule,
    AssistanceIvmsModule,
    AssistanceBiotimeModule,
    AssistanceUtilsModule,
    NotificationMailModule
  ],
  exports: [AssistanceService],
  providers: [AssistanceService],
  controllers: [AssistanceController],
})
export class AssistanceModule {}
