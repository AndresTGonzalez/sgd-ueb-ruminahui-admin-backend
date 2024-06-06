import { Module } from '@nestjs/common';
import { AssistanceBiotimeService } from './assistance-biotime.service';
import { AssistanceBiotimeController } from './assistance-biotime.controller';
import { PrismaBiotimeModule } from 'src/prisma-biotime/prisma-biotime.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaBiotimeModule, PrismaModule],
  providers: [AssistanceBiotimeService],
  controllers: [AssistanceBiotimeController],
})
export class AssistanceBiotimeModule {}