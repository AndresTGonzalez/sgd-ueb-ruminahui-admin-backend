import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CryptoModule } from './crypto/crypto.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProvincesModule } from './provinces/provinces.module';
import { CitiesModule } from './cities/cities.module';
import { GendersModule } from './genders/genders.module';
import { MaritalStatusesModule } from './marital-statuses/marital-statuses.module';
import { EmployeesModule } from './employees/employees.module';
import { AssistanceDispositiveModule } from './assistance-dispositive/assistance-dispositive.module';
import { AssistanceEmployeeIdentificatorModule } from './assistance-employee-identificator/assistance-employee-identificator.module';
import { CampusModule } from './campus/campus.module';
import { FunctionModule } from './function/function.module';
import { LaboralRegimeModule } from './laboral-regime/laboral-regime.module';
import { LaboralRelationshipModule } from './laboral-relationship/laboral-relationship.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CryptoModule,
    PrismaModule,
    ProvincesModule,
    CitiesModule,
    GendersModule,
    MaritalStatusesModule,
    EmployeesModule,
    AssistanceDispositiveModule,
    AssistanceEmployeeIdentificatorModule,
    CampusModule,
    FunctionModule,
    LaboralRegimeModule,
    LaboralRelationshipModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
