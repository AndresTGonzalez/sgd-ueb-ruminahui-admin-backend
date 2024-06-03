import { Module } from '@nestjs/common';
import { PersonalChildrenService } from './personal-children.service';
import { PersonalChildrenController } from './personal-children.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PersonalChildrenService],
  controllers: [PersonalChildrenController],
  exports: [PersonalChildrenService],
})
export class PersonalChildrenModule {}
