import { Module } from '@nestjs/common';
import { JustificationService } from './justification.service';
import { JustificationController } from './justification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JustificationSupabaseModule } from 'src/justification-supabase/justification-supabase.module';

@Module({
  imports: [PrismaModule, JustificationSupabaseModule],
  providers: [JustificationService],
  controllers: [JustificationController],
})
export class JustificationModule {}
