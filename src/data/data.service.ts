import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import { Data } from 'src/schemas/data.schemas';
import * as xlsx from 'node-xlsx';

@Injectable()
export class DataService {
  constructor(@InjectModel(Data.name) private dataModel: Model<Data>) {}

  async getData(year: number): Promise<Data[]> {
    return await this.dataModel.find({
      year: year
    });
  }

  async handleFile(file: Express.Multer.File): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'uploads');

    await this.saveFile(uploadDir, file.originalname, file.buffer);

    const content = xlsx.parse(file.buffer);

    console.log(content);

    console.log(content[0])


    return 'File uploaded successfully';
  }

  checkFile(date: string): string {
    const isTemplate = date === '0';
    const filename = isTemplate
      ? 'Template-DATA-REKAPITULASI.xlsx'
      : `${date}-DATA-REKAPITULASI.xlsx`;

    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(
        isTemplate ? 'Template file not found.' : `File for ${date} not found.`,
      );
    }

    return filePath;
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
