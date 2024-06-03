import { Module, forwardRef } from '@nestjs/common';
import { JustificationSupabaseService } from './justification-supabase.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JustificationSupabaseController } from './justification-supabase.controller';
import { PersonalModule } from 'src/personal/personal.module';
import { PersonalService } from 'src/personal/personal.service';

@Module({
  imports: [PrismaModule, forwardRef(() => PersonalModule)],
  exports: [JustificationSupabaseService],
  providers: [JustificationSupabaseService],
  controllers: [JustificationSupabaseController],
})
export class JustificationSupabaseModule {}
