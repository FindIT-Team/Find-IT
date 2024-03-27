import { Express } from 'express';

declare module 'express-session' {
  interface SessionData {
    passport: { user: Express.User };
  }
}
