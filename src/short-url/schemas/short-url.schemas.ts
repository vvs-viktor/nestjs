import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {generate} from 'shortid'

export type ShortUrlDocument = ShortUrl & Document;

@Schema()
export class ShortUrl {
  @Prop()
  full: string;

  @Prop({required: true, type: String, default: generate()})
  short: string;

}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
