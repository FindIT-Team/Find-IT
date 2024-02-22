import { createCookieSessionStorage } from '@remix-run/node';
import * as process from 'process';

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'sid',
      path: '/',
      secrets: [process.env.SECRET as string],
    },
  });
