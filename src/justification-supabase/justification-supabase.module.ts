import { Module } from '@nestjs/common';
import { JustificationSupabaseService } from './justification-supabase.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PersonalModule } from 'src/personal/personal.module';

@Module({
  imports: [PrismaModule, PersonalModule],
  exports: [JustificationSupabaseService],
  providers: [JustificationSupabaseService],
})
export class JustificationSupabaseModule {}
