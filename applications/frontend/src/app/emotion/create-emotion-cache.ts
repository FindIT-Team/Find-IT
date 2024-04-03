import createCache from '@emotion/cache';

export const defaultCache = createEmotionCache();

export function createEmotionCache() {
  return createCache({ key: 'cha' });
}
