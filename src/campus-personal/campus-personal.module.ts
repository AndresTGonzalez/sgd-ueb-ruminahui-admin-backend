import { Module } from '@nestjs/common';
import { CampusPersonalService } from './campus-personal.service';
import { CampusPersonalController } from './campus-personal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CampusPersonalService],
  controllers: [CampusPersonalController],
})
export class CampusPersonalModule {}
