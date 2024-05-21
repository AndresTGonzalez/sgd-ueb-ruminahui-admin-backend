import { Module } from '@nestjs/common';
import { PersonalScheduleService } from './personal-schedule.service';
import { PersonalScheduleController } from './personal-schedule.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PersonalScheduleService],
  controllers: [PersonalScheduleController],
  exports: [PersonalScheduleService],
})
export class PersonalScheduleModule {}
