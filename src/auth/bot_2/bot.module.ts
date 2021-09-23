import { Module } from '@nestjs/common';
import { DiscordConfigService } from './services/discord.config.service';
import { BotGateway } from './bot.gateway';
import { DiscordModule } from 'discord-nestjs';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useClass: DiscordConfigService,
    }),
  ],
  providers: [BotGateway],
})
export class BotModule {}
