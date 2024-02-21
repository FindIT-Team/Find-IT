import { createCookieSessionStorage } from '@remix-run/node';

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'sid',
      path: '/',
      secrets: ['some-secret-for-remix-cookie-session-please-change-me'],
    },
  });
