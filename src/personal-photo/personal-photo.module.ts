import { Module } from '@nestjs/common';
import { PersonalPhotoService } from './personal-photo.service';
import { PersonalPhotoController } from './personal-photo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PersonalPhotoService],
  controllers: [PersonalPhotoController],
  exports: [PersonalPhotoService],
})
export class PersonalPhotoModule {}
