import { Module } from '@nestjs/common';
import { AssistanceIvmsService } from './assistance-ivms.service';
import { AssistanceIvmsController } from './assistance-ivms.controller';
import { PrismaIvmsModule } from 'src/prisma-ivms/prisma-ivms.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaIvmsModule, PrismaModule],
  providers: [AssistanceIvmsService],
  controllers: [AssistanceIvmsController],
})
export class AssistanceIvmsModule {}
