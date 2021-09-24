import { Injectable, Logger } from '@nestjs/common';
import {Once, ClientProvider, Client, OnCommand, On} from 'discord-nestjs';
import {Message} from 'discord.js';
import {UsersService} from '../users/users.service';
import {Cron, Interval, SchedulerRegistry, Timeout} from '@nestjs/schedule';
import { parse } from "discord-command-parser";

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    private readonly userService: UsersService,
    private schedulerRegistry: SchedulerRegistry
  ) {}

  @Client()
  discordProvider: ClientProvider;

  // @Once({ event: 'ready' })
  // @Interval(60000)
  // onReady(): void {
  //   const channel = this.discordProvider.getClient().channels.cache.get('890194752778174468')
  //   if(channel.isText()) {
  //     channel.send('Hello. One minute passed!!!')
  //   }
  // }

  @OnCommand({ name: 'S' })
  async onCommand(message: Message): Promise<void> {
    const parsed = parse(message, "!S ", { allowSpaceBeforeCommand: true });
    if (!parsed.success) return;
    const number = parseInt(parsed.command)
    if (!number) return;
    setTimeout(() => {
      const channel = this.discordProvider.getClient().channels.cache.get('890194752778174468')
      if(channel.isText()) {
        channel.send('Hello!!!')
      }
    }, number)
  }


  // @On({ event: 'message' })
  // async onMessage(message: Message): Promise<void> {
  //   if (!message.author.bot) {
  //     const username = message.content.slice(1)
  //     const userInfo = await this.userService.findUser( username );
  //     if(userInfo) {
  //       const {password, __v, ...newUserInfo} = JSON.parse(JSON.stringify(userInfo));
  //       const products = newUserInfo.products.map(item => ({title: item.title, price: item.price}))
  //       await message.reply(JSON.stringify({...newUserInfo, products}));
  //     }else {
  //       await message.reply(JSON.stringify(`Sorry. There is no user with name "${username}"`));
  //     }
  //   }
  // }
}
