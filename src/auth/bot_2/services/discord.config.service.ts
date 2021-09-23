import { Injectable } from '@nestjs/common';
import {
  DiscordModuleOption,
  DiscordOptionsFactory,
  TransformPipe,
  ValidationPipe,
} from 'discord-nestjs';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  createDiscordOptions(): DiscordModuleOption {
    return {
      token: 'ODkwMTk1MzYzMzU1NTc0MzAy.YUsRCQ.jM0nMUt0SRLwaS-l3gsXPMzMCds',
      commandPrefix: '!',
      // intents: ["GUILDS"]
    } as DiscordModuleOption;
  }
}
