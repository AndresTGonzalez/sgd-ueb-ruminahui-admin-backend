import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('justification-file')
export class JustificationFileController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', { dest: './public/justification-docs' }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
