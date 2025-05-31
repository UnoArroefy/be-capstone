import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DataService } from './data.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './validation.pipe';
import { createReadStream } from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('/api/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  async getYears() {
    return await this.dataService.getYears();
  }

  @Get(':year')
  async getData(@Param('year', ParseIntPipe) year: number) {
    return await this.dataService.getData(year);
  }

  @UseGuards(RolesGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  ) {
    return await this.dataService.handleFile(file);
  }

  @Get('file/:year')
  getFile(@Param('year', ParseIntPipe) year: number): StreamableFile {
    const filename = this.dataService.checkFile(year);
    const file = createReadStream(filename);
    return new StreamableFile(file);
  }
}
