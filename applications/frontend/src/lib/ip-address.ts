'use server';

import { headers } from 'next/headers';

export async function ipAddress() {
  const FALLBACK_IP_ADDRESS = 'undefined';
  const forwardedFor = headers().get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
}
