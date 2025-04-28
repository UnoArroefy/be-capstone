import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  async transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const maxSize = 10 * 1024 * 1024

    if (file.size > maxSize) {
        throw new BadRequestException('Invalid file size.')
    }

    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'text/csv',
    ];

    const fileType = await fileTypeFromBuffer(file.buffer);

    if (!fileType || !allowedMimeTypes.includes(fileType.mime)) {
      throw new BadRequestException('Invalid file type.');
    }

    const fileRE = /^\d{4}-DATA-REKAPITULASI\.(xlsx|csv)$/;

    if (!fileRE.test(file.originalname)) {
      throw new BadRequestException('Invalid filename format.');
    }

    return file;
  }
}
