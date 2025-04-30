import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DataService } from './data.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './validation.pipe';
import { createReadStream } from 'fs';

@Controller('/api/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get(':year')
  async getData(@Param('year') year: number) {
    return await this.dataService.getData(year);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  ) {
    return await this.dataService.handleFile(file);
  }

  @Get('file/:year')
  getFile(@Param('year') year: string): StreamableFile {
    const filename = this.dataService.checkFile(year);
    const file = createReadStream(filename);
    return new StreamableFile(file);
  }
}
