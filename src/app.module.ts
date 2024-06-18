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
import { InstitutionalPersonalDataModule } from './institutional-personal-data/institutional-personal-data.module';
import { MedicalPersonalDataModule } from './medical-personal-data/medical-personal-data.module';
import { TitleModule } from './title/title.module';
import { CertificationModule } from './certification/certification.module';
import { PersonalSupabaseModule } from './personal-supabase/personal-supabase.module';
import { BloodTypeModule } from './blood-type/blood-type.module';
import { JustificationModule } from './justification/justification.module';
import { JustificationFileModule } from './justification-file/justification-file.module';
import { JustificationSupabaseModule } from './justification-supabase/justification-supabase.module';
import { PersonalChildrenModule } from './personal-children/personal-children.module';
import { PrismaBiotimeModule } from './prisma-biotime/prisma-biotime.module';
import { AssistanceBiotimeModule } from './assistance-biotime/assistance-biotime.module';
import { PrismaIvmsModule } from './prisma-ivms/prisma-ivms.module';
import { AssistanceIvmsModule } from './assistance-ivms/assistance-ivms.module';

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
    InstitutionalPersonalDataModule,
    MedicalPersonalDataModule,
    TitleModule,
    CertificationModule,
    PersonalSupabaseModule,
    BloodTypeModule,
    JustificationModule,
    JustificationFileModule,
    JustificationSupabaseModule,
    PersonalChildrenModule,
    PrismaBiotimeModule,
    AssistanceBiotimeModule,
    PrismaIvmsModule,
    AssistanceIvmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
