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
import { PersonalDocumentsService } from './personal-documents.service';
import { PersonalFile } from '@prisma/client';

@ApiTags('personal-documents')
@Controller('personal-documents')
export class PersonalDocumentsController {
  constructor(
    private readonly personalDocumentsService: PersonalDocumentsService,
  ) {}

  @Get(':personalId')
  getPersonalDocuments(@Param('personalId', ParseIntPipe) personalId: number) {
    return this.personalDocumentsService.getPersonalDocuments(personalId);
  }

  @Post(':personalId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/personal-docs',
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
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('personalId', ParseIntPipe) personalId: number,
  ) {
    const data = {
      personalId: personalId,
      documentRoute: `/personal-docs/${file.filename}`,
      documentName: file.filename,
    };

    return this.personalDocumentsService.createPersonalDocument(
      data as PersonalFile,
    );
  }

  @Delete(':id')
  deleteFile(@Param('id', ParseIntPipe) id: number) {
    return this.personalDocumentsService.deletePersonalDocument(id);
  }

  @Get('file/:id')
  getFile(@Param('id', ParseIntPipe) id: number) {
    return this.personalDocumentsService.getPersonalDocumentById(id);
  }
}
