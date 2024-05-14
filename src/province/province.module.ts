import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProvinceService],
  controllers: [ProvinceController],
})
export class ProvinceModule {}
