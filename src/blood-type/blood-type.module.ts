import { Module } from '@nestjs/common';
import { BloodTypeService } from './blood-type.service';
import { BloodTypeController } from './blood-type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BloodTypeService],
  controllers: [BloodTypeController],
})
export class BloodTypeModule {}
