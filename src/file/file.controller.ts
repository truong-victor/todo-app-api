import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  // Get,
  // Param,
  // Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { editFileName, imageFileFilter } from './upload.utils';
// import { Response } from 'express';
import { FileService } from './file.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
// import { readFileSync } from 'fs';
@Controller('/api/v1/file')
@ApiTags('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      // storage: diskStorage({
      //   destination: './files',
      //   filename: editFileName,
      // }),
      // fileFilter: imageFileFilter,
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )

  //swagger
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  //
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // const fileContent = readFileSync(file.path);

    const params = {
      Bucket: 'product',
      Key: editFileName(file),
      Body: file.buffer,
    };

    return this.fileService.uploadToS3(params);
  }

  // @Get(':fileName')
  // async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
  //   return this.fileService.getFile(fileName, res);
  // }
}
