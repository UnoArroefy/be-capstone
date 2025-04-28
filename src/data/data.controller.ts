import {
  Controller,
  Get,
  Param,
  Post,
  Res,
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

  @Get(':date')
  getData(@Param('date') date : string): string {
    return this.dataService.test();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  ) {
    return await this.dataService.handleFile(file);
  }

  @Get('file/:date')
  getFile(@Param('date') date: string): StreamableFile {
    const filename = this.dataService.getFile(date);
    const file = createReadStream(filename);
    return new StreamableFile(file);
  }
}
