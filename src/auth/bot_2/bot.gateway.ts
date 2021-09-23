import {Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import { Once, ClientProvider, Client } from 'discord-nestjs';

@Injectable()
export class BotGateway implements OnApplicationBootstrap{
  onApplicationBootstrap(): any {
  }
  private readonly logger = new Logger(BotGateway.name);

  @Client()
  discordProvider: ClientProvider;

  @Once({ event: 'ready' })
  onReady(): void {
    this.logger.log(
      `Logged in as ${this.discordProvider.getClient().user.tag}!`,
    );
  }
}
