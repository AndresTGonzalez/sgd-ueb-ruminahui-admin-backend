import { Module } from '@nestjs/common';
import { LaboralRelationshipService } from './laboral-relationship.service';
import { LaboralRelationshipController } from './laboral-relationship.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LaboralRelationshipService],
  controllers: [LaboralRelationshipController],
})
export class LaboralRelationshipModule {}
