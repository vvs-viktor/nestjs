import { Injectable } from '@nestjs/common';
import {
  DiscordModuleOption,
  DiscordOptionsFactory,
} from 'discord-nestjs';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  createDiscordOptions(): DiscordModuleOption {
    return {
      token: 'ODkwMTk1MzYzMzU1NTc0MzAy.YUsRCQ.dVuG-j1aU3BV9Hf26qsRdXZmBA4',
      commandPrefix: '!',
    };
  }
}
