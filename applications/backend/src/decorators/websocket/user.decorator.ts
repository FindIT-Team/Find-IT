import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'src/utils/socket.type';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Express.User => {
    const client: Socket = ctx.switchToWs().getClient();
    return client.request.user;
  },
);
