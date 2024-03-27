import session, { Store } from 'express-session';
import { SessionConfig } from '../configs/session.config';
import passport from 'passport';
import { Server } from 'socket.io';
import { sessionRefresherMiddleware } from '../middlewares/websocket/session-refresher.middleware';
import { authenticationMiddleware } from '../middlewares/websocket/authentication.middleware';

export const gatewayInit = (server: Server, store: Store, secret: string) => {
  const wrap = (middleware: any) => (socket: any, next: (err?: any) => void) =>
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
  server.use(wrap(sessionRefresherMiddleware()));
  server.use(wrap(authenticationMiddleware()));
};
