import { Socket as S } from 'socket.io';
import session from 'express-session';
import { UserEntity } from '../entities/user.entity';

export type Socket = S & {
  request: {
    user: UserEntity;
    session: session.Session & Partial<session.SessionData>;
    sessionID: string;
    sessionStore: Express.SessionStore;
  };
};
