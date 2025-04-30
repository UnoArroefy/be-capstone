import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Data>;

@Schema()
export class Data {
  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  data: JSON;
}

export const DataSchema = SchemaFactory.createForClass(Data);
