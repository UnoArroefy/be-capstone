import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import { Data } from 'src/schemas/data.schemas';
import * as xlsx from 'node-xlsx';
import { DataEntry, DataFinal, DataRow } from 'src/schemas/data.dto';

@Injectable()
export class DataService {
  constructor(@InjectModel(Data.name) private dataModel: Model<Data>) {}

  async getData(year: number): Promise<Data[]> {
    const data = await this.dataModel.find({
      year: year
    });

    if (!data || data.length === 0) {
      throw new NotFoundException('Data Not Found');
    }

    return data
  }

  async handleFile(file: Express.Multer.File): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'uploads');
  
    const fileRE = /^\[(\d{4})\] REKAPITULASI\.xlsx$/;
    const match = file.originalname.match(fileRE);
    
    let year = NaN;
  
    if (match) {
      year = parseInt(match[1], 10);
    }
    
    const content = xlsx.parse(file.buffer);
    
    const expectedNames = [
      'KESELURUHAN (OTOMATIS)',
      'SBRC',
      'PS Sawit',
      'PSSP',
      'LRITM',
      'CREATA',
      'Biotech',
      'BRAIN'
    ];
    const extractedNames = content.flatMap(sheet => sheet['name'])

    const equal = expectedNames.length === extractedNames.length 
                  && expectedNames.every(name => extractedNames.includes(name)) 
                  && extractedNames.every(name => expectedNames.includes(name));
    
    if (!equal) {
      throw new BadRequestException("Invalid Data format.")
    }
    
    const result: DataRow[] = [];
    
    for (const value of content) {
      const headers = value['data'][0];
      
      const objs: DataEntry[] = [];
      
      for (const data of value['data'].slice(1, -1)) {
        const obj = Object.fromEntries(
          headers.map((key, i) => [key, data[i]])
        );
        objs.push(obj);
      }
      
      const data_obj = {
        name: value['name'],
        data: objs
      };
      
      result.push(data_obj);
    }
    
    const finalData: DataFinal = {
      year: year,
      data : result
    }
    
    await this.saveFile(uploadDir, file.originalname, file.buffer);
    await this.dataModel.replaceOne({year}, finalData, {upsert: true})

    return JSON.stringify(finalData);
  }  

  checkFile(date: string): string {
    const isTemplate = date === '0';
    const filename = isTemplate
      ? '[TEMPLATE] REKAPITULASI.xlsx'
      : `[${date}] REKAPITULASI.xlsx`;

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
