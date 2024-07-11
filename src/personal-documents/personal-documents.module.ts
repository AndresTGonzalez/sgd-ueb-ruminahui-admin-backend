import { Module } from '@nestjs/common';
import { PersonalDocumentsService } from './personal-documents.service';
import { PersonalDocumentsController } from './personal-documents.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PersonalDocumentsService],
  controllers: [PersonalDocumentsController],
  exports: [PersonalDocumentsService],
})
export class PersonalDocumentsModule {}
