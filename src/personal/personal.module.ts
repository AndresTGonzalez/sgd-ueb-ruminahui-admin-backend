import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssistanceEmployeeIdentificatorModule } from 'src/assistance-employee-identificator/assistance-employee-identificator.module';

@Module({
  imports: [PrismaModule, AssistanceEmployeeIdentificatorModule],
  providers: [PersonalService],
  controllers: [PersonalController],
})
export class PersonalModule {}
