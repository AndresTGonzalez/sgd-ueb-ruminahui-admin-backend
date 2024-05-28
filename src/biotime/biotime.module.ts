import { Module } from '@nestjs/common';
import { BiotimeService } from './biotime.service';
import { BiotimeController } from './biotime.controller';
import { PrismaBiotimeModule } from 'src/prisma-biotime/prisma-biotime.module';

@Module({
  imports: [PrismaBiotimeModule],
  providers: [BiotimeService],
  controllers: [BiotimeController],
})
export class BiotimeModule {}
