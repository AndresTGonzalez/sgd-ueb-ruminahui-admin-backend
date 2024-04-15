import { Module } from '@nestjs/common';
import { AssistanceDispositiveService } from './assistance-dispositive.service';
import { AssistanceDispositiveController } from './assistance-dispositive.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [AssistanceDispositiveService],
  providers: [AssistanceDispositiveService],
  controllers: [AssistanceDispositiveController],
})
export class AssistanceDispositiveModule {}
