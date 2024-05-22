import { Module } from '@nestjs/common';
import { MedicalPersonalDataController } from './medical-personal-data.controller';
import { MedicalPersonalDataService } from './medical-personal-data.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [MedicalPersonalDataService],
  controllers: [MedicalPersonalDataController],
  providers: [MedicalPersonalDataService],
})
export class MedicalPersonalDataModule {}
