import { Module } from '@nestjs/common';
import { DiscordConfigService } from './services/discord.config.service';
import { BotGateway } from './bot.gateway';
import { DiscordModule } from 'discord-nestjs';
import {UsersModule} from '../users/users.module';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useClass: DiscordConfigService,
    }),
    UsersModule
  ],
  providers: [BotGateway],
})
export class BotModule {}
