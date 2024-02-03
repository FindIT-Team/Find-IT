import { UserEntity } from '../entities/user.entity';

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}

declare module 'express-session' {
  interface SessionData {
    passport: { user: Express.User };
  }
}
