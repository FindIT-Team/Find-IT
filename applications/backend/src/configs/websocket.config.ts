import { CorsConfig } from './cors.config';
import { GatewayMetadata } from '@nestjs/websockets';

export const websocketConfig = (namespace: string): GatewayMetadata => {
  return { cors: CorsConfig, path: '/api/websocket', cookie: true, namespace };
};
