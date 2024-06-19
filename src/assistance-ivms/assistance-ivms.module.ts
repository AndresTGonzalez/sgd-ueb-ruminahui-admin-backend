import { Module } from '@nestjs/common';
import { AssistanceIvmsService } from './assistance-ivms.service';
import { AssistanceIvmsController } from './assistance-ivms.controller';
import { PrismaIvmsModule } from 'src/prisma-ivms/prisma-ivms.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssistanceUtilsModule } from 'src/assistance-utils/assistance-utils.module';

@Module({
  imports: [PrismaIvmsModule, PrismaModule, AssistanceUtilsModule],
  providers: [AssistanceIvmsService],
  controllers: [AssistanceIvmsController],
})
export class AssistanceIvmsModule {}
