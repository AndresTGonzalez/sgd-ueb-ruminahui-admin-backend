import { Module } from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './title.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [TitleService],
  providers: [TitleService],
  controllers: [TitleController],
})
export class TitleModule {}
