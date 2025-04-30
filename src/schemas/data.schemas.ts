import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DataRow } from './data.dto';

export type DataDocument = HydratedDocument<Data>;

@Schema()
export class Data {
  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  data: Array<DataRow>;
}

export const DataSchema = SchemaFactory.createForClass(Data);
