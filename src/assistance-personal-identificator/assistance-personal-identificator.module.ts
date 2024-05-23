import { Module } from '@nestjs/common';
import { AssistancePersonalIdentificatorService } from './assistance-personal-identificator.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssistancePersonalIdentificatorController } from './assistance-personal-identificator.controller';

@Module({
  imports: [PrismaModule],
  exports: [AssistancePersonalIdentificatorService],
  providers: [AssistancePersonalIdentificatorService],
  controllers: [AssistancePersonalIdentificatorController],
})
export class AssistancePersonalIdentificatorModule {}
