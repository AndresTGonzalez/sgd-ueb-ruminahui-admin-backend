import { Module } from '@nestjs/common';
import { AssistanceBiotimeService } from './assistance-biotime.service';
import { AssistanceBiotimeController } from './assistance-biotime.controller';
import { PrismaBiotimeModule } from 'src/prisma-biotime/prisma-biotime.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssistanceUtilsModule } from 'src/assistance-utils/assistance-utils.module';

@Module({
  imports: [PrismaBiotimeModule, PrismaModule, AssistanceUtilsModule],
  providers: [AssistanceBiotimeService],
  controllers: [AssistanceBiotimeController],
  exports: [AssistanceBiotimeService],
})
export class AssistanceBiotimeModule {}
