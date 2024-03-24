import React, { createContext } from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { EmotionCriticalToChunks } from "@emotion/server/create-instance";

interface ServerStyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}

export const ServerStyleContext = createContext<
  ServerStyleContextData[] | null
>(null);

export interface ServerCacheProviderProps {
  children: React.ReactNode;

  cache: EmotionCache;
  chunks: EmotionCriticalToChunks | null;
}

export function ServerCacheProvider({
  children,
  cache,
  chunks,
}: ServerCacheProviderProps) {
  return (
    <ServerStyleContext.Provider value={chunks?.styles || null}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ServerStyleContext.Provider>
  );
}
