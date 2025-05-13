import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';
export type DataDocument = HydratedDocument<Data>;

@Schema()
export class DataRow {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [MongooseSchema.Types.Mixed], required: true })
  data: Array<Record<string, number | string>>;
}

@Schema({
  toJSON: {
    virtuals: false,
    versionKey: false,
    transform: (_, ret) => {
      delete ret._id;
      return ret;
    },
  },
})
export class Data {
  @Prop({ required: true, unique: true })
  year: number;

  @Prop({ type: [DataRow], required: true, _id: false })
  data: DataRow[];
}
export const DataSchema = SchemaFactory.createForClass(Data);
