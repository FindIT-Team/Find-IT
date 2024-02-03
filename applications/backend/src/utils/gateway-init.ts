import session, { Store } from 'express-session';
import { SessionConfig } from '../configs/session.config';
import passport from 'passport';
import { Server } from 'socket.io';
import { Socket } from '../types/socket.type';

export const gatewayInit = (server: Server, store: Store, secret: string) => {
  const wrap =
    (middleware: any) => (socket: Socket, next: (err?: any) => void) =>
      middleware(socket.request, {} as any, next);
  server.use(
    wrap(
      session({
        ...SessionConfig,
        store,
        secret,
      }),
    ),
  );
  server.use(wrap(passport.session()));
};
