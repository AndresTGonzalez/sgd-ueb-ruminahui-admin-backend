import { Module } from '@nestjs/common';
import { LaboralRegimeService } from './laboral-regime.service';
import { LaboralRegimeController } from './laboral-regime.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LaboralRegimeService],
  controllers: [LaboralRegimeController],
})
export class LaboralRegimeModule {}
