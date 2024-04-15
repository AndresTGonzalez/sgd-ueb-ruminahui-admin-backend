import { Module } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CampusController } from './campus.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CampusService],
  controllers: [CampusController],
})
export class CampusModule {}
