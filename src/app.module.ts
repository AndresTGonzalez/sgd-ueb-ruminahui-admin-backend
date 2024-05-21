import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CryptoModule } from './crypto/crypto.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { MaritalStatusesModule } from './marital-status/marital-status.module';
import { AssistanceDispositiveModule } from './assistance-dispositive/assistance-dispositive.module';
import { AssistancePersonalIdentificatorModule } from './assistance-personal-identificator/assistance-personal-identificator.module';
import { CampusModule } from './campus/campus.module';
import { FunctionModule } from './function/function.module';
import { LaboralRegimeModule } from './laboral-regime/laboral-regime.module';
import { LaboralRelationshipModule } from './laboral-relationship/laboral-relationship.module';
import { PersonalModule } from './personal/personal.module';
import { CategoryModule } from './category/category.module';
import { AssistanceModule } from './assistance/assistance.module';
import { JournalModule } from './journal/journal.module';
import { GenderModule } from './gender/gender.module';
import { CampusPersonalModule } from './campus-personal/campus-personal.module';
import { PersonalScheduleModule } from './personal-schedule/personal-schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CryptoModule,
    PrismaModule,
    ProvinceModule,
    CityModule,
    MaritalStatusesModule,
    AssistanceDispositiveModule,
    AssistancePersonalIdentificatorModule,
    CampusModule,
    FunctionModule,
    LaboralRegimeModule,
    LaboralRelationshipModule,
    PersonalModule,
    CategoryModule,
    AssistanceModule,
    JournalModule,
    GenderModule,
    CampusPersonalModule,
    PersonalScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
