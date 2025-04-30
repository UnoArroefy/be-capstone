import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  async transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new BadRequestException('Invalid file size.');
    }

    const allowedMimeType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    const fileType = await fileTypeFromBuffer(file.buffer);

    if (!fileType || !(fileType.mime == allowedMimeType)) {
      throw new BadRequestException('Invalid file type.');
    }

    const fileRE = /^\[\d{4}\] REKAPITULASI\.xlsx$/;

    if (!fileRE.test(file.originalname)) {
      throw new BadRequestException('Invalid filename format.');
    }

    return file;
  }
}
