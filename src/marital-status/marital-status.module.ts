import { Module } from '@nestjs/common';
import { MaritalStatusService } from './marital-status.service';
import { MaritalStatusesController } from './marital-status.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MaritalStatusService],
  controllers: [MaritalStatusesController],
})
export class MaritalStatusesModule {}
