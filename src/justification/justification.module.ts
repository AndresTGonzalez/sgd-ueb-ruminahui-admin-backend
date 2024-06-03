import { Module, forwardRef } from '@nestjs/common';
import { JustificationService } from './justification.service';
import { JustificationController } from './justification.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JustificationSupabaseModule } from 'src/justification-supabase/justification-supabase.module';
import { JustificationFileModule } from 'src/justification-file/justification-file.module';

@Module({
  imports: [
    PrismaModule,
    JustificationFileModule,
    forwardRef(() => JustificationSupabaseModule),
  ],
  providers: [JustificationService],
  controllers: [JustificationController],
  exports: [JustificationService],
})
export class JustificationModule {}
