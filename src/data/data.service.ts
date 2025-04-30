import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DataService {
  test(): string {
    return 'Hello /api';
  }

  async handleFile(file: Express.Multer.File): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'uploads');

    await this.saveFile(uploadDir, file.originalname, file.buffer);

    return 'File uploaded successfully';
  }

  getFile(date: string): string {
    const filename = path.join(
      process.cwd(),
      'uploads',
      `${date}-DATA-REKAPITULASI.xlsx`,
    );
    if (!fs.existsSync(filename)) {
      throw new NotFoundException('File Not Found.');
    }
    return filename;
  }

  private async saveFile(
    directory: string,
    filename: string,
    buffer: Buffer,
  ): Promise<void> {
    await fs.promises.mkdir(directory, { recursive: true });
    const filePath = path.join(directory, filename);
    await fs.promises.writeFile(filePath, buffer);
  }
}
