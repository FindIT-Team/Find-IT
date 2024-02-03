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
import { Socket } from '../../types/socket.type';
import { gatewayInit } from '../../utils/gateway-init';
import { websocketConfig } from '../../configs/websocket.config';

@WebSocketGateway(websocketConfig('/api/websocket'))
export class AuthGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  sessions: Record<string, string[]> = {};

  constructor(
    private readonly configService: ConfigService,
    private readonly storeService: StoreService,
    private readonly authService: AuthService,
  ) {}

  afterInit(server: Server) {
    gatewayInit(
      server,
      this.storeService.session,
      this.configService.get('SECRET'),
    );
  }

  async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
    const { user, sessionID } = client.request;
    const ip: string = (client.request.headers['ip'] as string) ?? undefined;
    await this.authService.login(user.id, sessionID, this.sessions, ip);
    client.join(user.id);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
    const { user, sessionID } = client.request;
    await this.authService.logout(user.id, sessionID, this.sessions);
  }
}
