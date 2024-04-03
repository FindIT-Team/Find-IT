import { CacheProvider } from '@emotion/react';
import { createContext, ReactNode, useState } from 'react';
import { createEmotionCache, defaultCache } from './create-emotion-cache';

interface ClientStyleContextData {
  reset: () => void;
}

export const ClientStyleContext = createContext<ClientStyleContextData | null>(
  null,
);

export interface ClientCacheProviderProps {
  children: ReactNode;
}

export function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(defaultCache);

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}
