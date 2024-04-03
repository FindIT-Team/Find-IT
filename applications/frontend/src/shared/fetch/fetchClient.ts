import { clientOnly$ } from 'vite-env-only';

export const fetchClient = clientOnly$(
  async (url: string, init?: RequestInit) => {
    const response = await fetch(
      new URL(
        url,
        (window as unknown as { ENV: Record<string, string> }).ENV.API_URL,
      ),
      {
        credentials: 'include',
        ...init,
      },
    );

    if (!response.status.toString().startsWith('2'))
      throw new Error(
        `Something went wrong during fetch: ${response.status}, ${response.statusText}`,
      );

    return response.json();
  },
)!;
