import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from '../../utils/socket.type';
import { Session as S } from 'express-session';

export const Session = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): S => {
    const client: Socket = ctx.switchToWs().getClient();
    return client.request.session;
  },
);
