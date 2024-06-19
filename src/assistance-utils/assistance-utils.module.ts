import { Module } from '@nestjs/common';
import { AssistanceUtilsService } from './assistance-utils.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [AssistanceUtilsService],
  providers: [AssistanceUtilsService],
})
export class AssistanceUtilsModule {}
