import { Module } from '@nestjs/common';
import { PrismaBiotimeService } from './prisma-biotime.service';

@Module({
  providers: [PrismaBiotimeService],
  exports: [PrismaBiotimeService],
})
export class PrismaBiotimeModule {}
