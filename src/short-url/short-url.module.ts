import { Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlService } from './short-url.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ShortUrl, ShortUrlSchema} from './schemas/short-url.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ShortUrl.name,
        schema: ShortUrlSchema,
      },
    ]),
  ],
  controllers: [ShortUrlController],
  providers: [ShortUrlService]
})
export class ShortUrlModule {}
