import { Module } from '@nestjs/common';
import { InstitutionalPersonalDataService } from './institutional-personal-data.service';
import { InstitutionalPersonalDataController } from './institutional-personal-data.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [InstitutionalPersonalDataService],
  providers: [InstitutionalPersonalDataService],
  controllers: [InstitutionalPersonalDataController],
})
export class InstitutionalPersonalDataModule {}
