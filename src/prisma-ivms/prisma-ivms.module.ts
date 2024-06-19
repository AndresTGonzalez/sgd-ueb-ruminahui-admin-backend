import { Module } from '@nestjs/common';
import { PrismaIvmsService } from './prisma-ivms.service';

@Module({
  providers: [PrismaIvmsService],
  exports: [PrismaIvmsService],
})
export class PrismaIvmsModule {}
