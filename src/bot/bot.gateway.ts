import { Injectable, Logger } from '@nestjs/common';
import {Once, ClientProvider, Client, OnCommand, On} from 'discord-nestjs';
import {Message} from 'discord.js';

import {UsersService} from '../users/users.service';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    private readonly userService: UsersService,
  ) {}

  @Client()
  discordProvider: ClientProvider;

  @Once({ event: 'ready' })
  onReady(): void {
    this.logger.log(
      `Logged in as ${this.discordProvider.getClient().user.tag}!`,
    );
  }

  @OnCommand({ name: 'version' })
  async onCommand(message: Message): Promise<void> {
    await message.reply(`Execute command: ${message.content}`);
  }

  @On({ event: 'message' })
  async onMessage(message: Message): Promise<void> {
    if (!message.author.bot) {
      const username = message.content.slice(1)
      const userInfo = await this.userService.findOne( username );
      if(userInfo) {
        // @ts-ignore
        const {password, __v, ...newUserInfo} = userInfo.toJSON();
        await message.reply(JSON.stringify(newUserInfo));
      }else {
        await message.reply(JSON.stringify(`Sorry. There is no user with name "${username}"`));
      }
    }
  }
}
