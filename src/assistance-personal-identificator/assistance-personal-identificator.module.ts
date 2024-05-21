import { Module } from '@nestjs/common';
import { AssistancePersonalIdentificatorService } from './assistance-personal-identificator.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [AssistancePersonalIdentificatorService],
  providers: [AssistancePersonalIdentificatorService],
})
export class AssistancePersonalIdentificatorModule {}
