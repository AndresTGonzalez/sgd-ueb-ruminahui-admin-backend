import { Module } from '@nestjs/common';
import { PersonalSupabaseService } from './personal-supabase.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [PersonalSupabaseService],
  providers: [PersonalSupabaseService],
})
export class PersonalSupabaseModule {}
