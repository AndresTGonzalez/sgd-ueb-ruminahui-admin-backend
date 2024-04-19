import { Module } from '@nestjs/common';
import { SexsService } from './sexs.service';
import { SexsController } from './sexs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SexsService],
  controllers: [SexsController],
})
export class SexsModule {}
