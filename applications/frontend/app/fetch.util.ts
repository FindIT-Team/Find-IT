import { CookieSerializeOptions, Session, SessionData } from '@remix-run/node';
import setCookie from 'set-cookie-parser';
import { commitSession } from '~/session.server';

async function fetchSession(
  url: string,
  session: Session<SessionData, SessionData>,
  init?: RequestInit,
) {
  const response = await fetch(new URL(url, process.env.API_URL), {
    headers: {
      Cookie: Object.entries(session.data)
        .map(([key, value]) => `${key}=${value}`)
        .join('; '),
    },
    ...init,
  });

  if (!response.status.toString().startsWith('2'))
    throw new Error(
      `Something went wrong during fetch: ${response.status}, ${response.statusText}`,
    );

  const setCookieHeader = response.headers.get('Set-Cookie');

  if (!setCookieHeader) throw new Error(`Set-Cookie header wasn't found`);

  const parsedResponseCookies = setCookie.parse(
    setCookie.splitCookiesString(setCookieHeader as string),
  );
  const authCookie = parsedResponseCookies.find(({ name }) => name === 'sid');

  if (!authCookie) throw new Error(`No cookie was found`);

  const { name, value, ...sessionIdCookieSerializeOptions } = authCookie;

  session.set(name, value);

  const headers = new Headers();
  headers.append(
    'Set-Cookie',
    await commitSession(
      session,
      sessionIdCookieSerializeOptions as CookieSerializeOptions,
    ),
  );

  return { headers, response };
}
export { fetchSession as fetch };
