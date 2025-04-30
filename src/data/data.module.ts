import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from 'src/schemas/data.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Data.name,
        schema: DataSchema,
      },
    ]),
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
