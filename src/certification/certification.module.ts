import { Module } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [CertificationService],
  providers: [CertificationService],
  controllers: [CertificationController],
})
export class CertificationModule {}
