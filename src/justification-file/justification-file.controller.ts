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
import { JustificationFileService } from './justification-file.service';
import { JustificationFile } from '@prisma/client';

@ApiTags('justification-file')
@Controller('justification-file')
export class JustificationFileController {
  constructor(
    private readonly justificationFileService: JustificationFileService,
  ) {}

  @Get(':justificationId')
  getJustificationFiles(
    @Param('justificationId', ParseIntPipe) justificationId: number,
  ) {
    return this.justificationFileService.getJustificationFiles(justificationId);
  }

  @Post(':justificationId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/justification-docs',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('justificationId', ParseIntPipe) justificationId: number,
  ) {
    const data = {
      justificationId: justificationId,
      documentRoute: `/justification-docs/${file.originalname}`,
      documentName: file.originalname,
    };

    return this.justificationFileService.createJustificationFile(
      data as JustificationFile,
    );
  }

  @Delete(':id')
  deleteFile(@Param('id', ParseIntPipe) id: number) {
    // return this.justificationFileService.deleteFile(id);
    return this.justificationFileService.deleteJustificationFile(id);
  }
}
