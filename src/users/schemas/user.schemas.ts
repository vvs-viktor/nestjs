import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from '../../products/schemas/product.schemas';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  })
  products: Product[];
}

export const UserSchema = SchemaFactory.createForClass(User);
