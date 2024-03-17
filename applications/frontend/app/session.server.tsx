import { createCookieSessionStorage } from '@remix-run/node';

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      domain: process.env.DOMAIN,
      name: 'token',
      path: '/',
      secrets: [process.env.SECRET ?? 'secret'],
    },
  });
