import { serverOnly$ } from 'vite-env-only';

export const fetchServer = serverOnly$(
  async (url: string, cookie: string | null, init?: RequestInit) => {
    const response = await fetch(new URL(url, process.env.API_URL), {
      headers: {
        Cookie: cookie ?? '',
      },
      ...init,
    });

    if (!response.status.toString().startsWith('2'))
      throw new Error(
        `Something went wrong during fetch: ${response.status}, ${response.statusText}`,
      );

    const setCookieHeader = response.headers.get('Set-Cookie');

    const headers = new Headers();
    headers.append('Set-Cookie', setCookieHeader ?? '');

    return { headers, response: await response.json() };
  },
)!;
