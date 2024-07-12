import { Module } from '@nestjs/common';
import { AssistanceUtilsService } from './assistance-utils.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationMailModule } from 'src/notification-mail/notification-mail.module';

@Module({
  imports: [PrismaModule, NotificationMailModule],
  exports: [AssistanceUtilsService],
  providers: [AssistanceUtilsService],
})
export class AssistanceUtilsModule {}
