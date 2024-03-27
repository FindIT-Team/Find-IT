import createEmotionCache, {
  defaultCache,
} from "~/emotion/create-emotion-cache";
import React, { createContext, useState } from "react";
import { CacheProvider } from "@emotion/react";

interface ClientStyleContextData {
  reset: () => void;
}

export const ClientStyleContext = createContext<ClientStyleContextData | null>(
  null
);

export interface ClientCacheProviderProps {
  children: React.ReactNode;
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
