import { Module } from '@nestjs/common';
import { AssistanceEmployeeIdentificatorService } from './assistance-employee-identificator.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [AssistanceEmployeeIdentificatorService],
  providers: [AssistanceEmployeeIdentificatorService],
})
export class AssistanceEmployeeIdentificatorModule {}
