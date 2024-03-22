async function fetchSid(url: string, init?: RequestInit) {
  const response = await fetch(new URL(url, 'http://api.findit.test:3000'), {
    credentials: 'include',
    ...init,
  });

  if (!response.status.toString().startsWith('2'))
    throw new Error(
      `Something went wrong during fetch: ${response.status}, ${response.statusText}`,
    );

  return response.json();
}

export { fetchSid as fetch };
