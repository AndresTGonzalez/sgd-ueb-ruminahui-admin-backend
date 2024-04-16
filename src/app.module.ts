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
import { AssistanceModule } from './assistance/assistance.module';

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
    AssistanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
