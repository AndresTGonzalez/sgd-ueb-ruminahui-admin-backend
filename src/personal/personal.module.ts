import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssistancePersonalIdentificatorModule } from 'src/assistance-personal-identificator/assistance-personal-identificator.module';

@Module({
  imports: [PrismaModule, AssistancePersonalIdentificatorModule],
  providers: [PersonalService],
  controllers: [PersonalController],
})
export class PersonalModule {}
