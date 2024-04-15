import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssistanceEmployeeIdentificatorModule } from 'src/assistance-employee-identificator/assistance-employee-identificator.module';
import { AssistanceDispositiveModule } from 'src/assistance-dispositive/assistance-dispositive.module';

@Module({
  imports: [
    PrismaModule,
    AssistanceEmployeeIdentificatorModule,
    AssistanceDispositiveModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
