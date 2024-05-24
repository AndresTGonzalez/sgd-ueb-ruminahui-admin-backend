import { Module } from '@nestjs/common';
import { JustificationFileService } from './justification-file.service';
import { JustificationFileController } from './justification-file.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [JustificationFileService],
  controllers: [JustificationFileController],
})
export class JustificationFileModule {}
