import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { StoreService } from '../store/store.service';
import { AuthService } from './auth.service';
import { Socket } from '../../utils/socket.type';
import { gatewayInit } from '../../utils/gateway-init.util';
import { websocketConfig } from '../../configs/websocket.config';

@WebSocketGateway(websocketConfig('auth'))
export class AuthGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  static path = 'auth';
  @WebSocketServer() server!: Server;
  sessions: Record<string, string[]>;

  constructor(
    private readonly configService: ConfigService,
    private readonly storeService: StoreService,
    private readonly authService: AuthService,
  ) {
    this.sessions = this.storeService.websocketSessions;
  }

  afterInit(server: Server) {
    gatewayInit(
      server,
      this.storeService.session,
      this.configService.get('SECRET') ?? '',
    );
  }

  async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
    const { user, sessionID } = client.request;
    // const ip: string = (client.request.headers['ip'] as string) ?? undefined;

    await this.authService.login(
      user.id,
      sessionID,
      this.sessions,
      // ip
    );

    client.join(`user:${user.id}`);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
    const { user, sessionID } = client.request;

    await this.authService.logout(user.id, sessionID, this.sessions);
  }
}
