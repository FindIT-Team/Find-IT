async function f(url: string, init?: RequestInit) {
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
}

export { f as fetch };
