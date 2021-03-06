import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BotModule } from './bot/bot.module';
import {ScheduleModule} from '@nestjs/schedule';
import { ShortUrlModule } from './short-url/short-url.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://viktor:njh77889911@cluster0.37vqz.mongodb.net/products?retryWrites=true&w=majority`,
    ),
    ScheduleModule.forRoot(),
    ProductsModule,
    AuthModule,
    UsersModule,
    BotModule,
    ShortUrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
