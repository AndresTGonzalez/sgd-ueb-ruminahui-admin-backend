import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { PersonalPhotoService } from './personal-photo.service';
import { PersonalPhoto } from '@prisma/client';

@ApiTags('personal-photo')
@Controller('personal-photo')
export class PersonalPhotoController {
  constructor(private readonly personalPhotoService: PersonalPhotoService) {}

  @Get(':personalId')
  getPhoto(@Param('personalId', ParseIntPipe) personalId: number) {
    return this.personalPhotoService.getPhoto(personalId);
  }

  @Post(':personalId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/personal-photos',
        filename: (req, file, cb) => {
          const fileExtention = file.originalname.split('.').pop();

          // FileName sin extension y los espacios remplazados por _
          const fileNameNoExtension = file.originalname
            .split('.')
            .slice(0, -1)
            .join('.')
            .replace(/[^a-zA-Z0-9]/g, '_');

          const fileName =
            fileNameNoExtension +
            '__' +
            Date.now() +
            req.params.personalId +
            '.' +
            fileExtention;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('personalId', ParseIntPipe) personalId: number,
  ) {
    // Verificar si el empleado ya tiene una foto
    const photo = await this.personalPhotoService.getPhoto(personalId);

    console.log('photo', photo);

    // Si el empleado ya tiene una foto, se elimina
    if (photo) {
      await this.personalPhotoService.deletePhoto(personalId);
    }

    const data = {
      personalId,
      photoName: file.filename,
      photoRoute: file.path,
    };

    return this.personalPhotoService.createPhoto(data as PersonalPhoto);

  }


  @Delete(':personalId')
  deletePhoto(@Param('personalId', ParseIntPipe) personalId: number) {
    return this.personalPhotoService.deletePhoto(personalId);
  }
}
