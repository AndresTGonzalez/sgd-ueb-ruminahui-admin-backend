import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CryptoModule } from './crypto/crypto.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProvincesModule } from './provinces/provinces.module';
import { CitiesModule } from './cities/cities.module';
import { MaritalStatusesModule } from './marital-statuses/marital-statuses.module';
import { AssistanceDispositiveModule } from './assistance-dispositive/assistance-dispositive.module';
import { AssistanceEmployeeIdentificatorModule } from './assistance-employee-identificator/assistance-employee-identificator.module';
import { CampusModule } from './campus/campus.module';
import { FunctionModule } from './function/function.module';
import { LaboralRegimeModule } from './laboral-regime/laboral-regime.module';
import { LaboralRelationshipModule } from './laboral-relationship/laboral-relationship.module';
import { SexsModule } from './sexs/sexs.module';
import { PersonalModule } from './personal/personal.module';
import { CategoriesModule } from './categories/categories.module';
import { AssistanceModule } from './assistance/assistance.module';
import { JournalModule } from './journal/journal.module';

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
    MaritalStatusesModule,
    AssistanceDispositiveModule,
    AssistanceEmployeeIdentificatorModule,
    CampusModule,
    FunctionModule,
    LaboralRegimeModule,
    LaboralRelationshipModule,
    SexsModule,
    PersonalModule,
    CategoriesModule,
    AssistanceModule,
    JournalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
