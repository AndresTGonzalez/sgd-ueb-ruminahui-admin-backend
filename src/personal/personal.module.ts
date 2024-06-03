import { Module, forwardRef } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssistancePersonalIdentificatorModule } from 'src/assistance-personal-identificator/assistance-personal-identificator.module';
import { InstitutionalPersonalDataModule } from 'src/institutional-personal-data/institutional-personal-data.module';
import { MedicalPersonalDataModule } from 'src/medical-personal-data/medical-personal-data.module';
import { AssistanceModule } from 'src/assistance/assistance.module';
import { TitleModule } from 'src/title/title.module';
import { CertificationModule } from 'src/certification/certification.module';
import { PersonalSupabaseModule } from 'src/personal-supabase/personal-supabase.module';
import { PersonalScheduleModule } from 'src/personal-schedule/personal-schedule.module';
import { JustificationModule } from 'src/justification/justification.module';
import { JustificationSupabaseModule } from 'src/justification-supabase/justification-supabase.module';

@Module({
  imports: [
    PrismaModule,
    AssistancePersonalIdentificatorModule,
    InstitutionalPersonalDataModule,
    MedicalPersonalDataModule,
    AssistanceModule,
    TitleModule,
    CertificationModule,
    PersonalSupabaseModule,
    PersonalScheduleModule,
    JustificationModule,
    forwardRef(() => JustificationSupabaseModule),
  ],
  exports: [PersonalService],
  providers: [PersonalService],
  controllers: [PersonalController],
})
export class PersonalModule {}
