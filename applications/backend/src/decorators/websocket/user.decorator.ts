import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'src/types/socket.type';
import { UserEntity } from 'src/entities/user.entity';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const client: Socket = ctx.switchToWs().getClient();
    return client.request.user;
  },
);
