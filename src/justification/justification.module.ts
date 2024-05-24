import { Module } from '@nestjs/common';
import { JustificationService } from './justification.service';
import { JustificationController } from './justification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [JustificationService],
  controllers: [JustificationController],
})
export class JustificationModule {}
