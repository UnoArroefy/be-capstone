import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Role } from 'src/schemas/user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  googleId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
