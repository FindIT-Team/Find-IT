import { SessionOptions } from 'express-session';

export const SessionConfig: SessionOptions = {
  saveUninitialized: false,
  resave: false,
  name: 'sid',
  rolling: true,
  unset: 'destroy',
  cookie: {
    domain: process.env.DOMAIN,
    signed: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'lax',
  },
  secret: '',
};
