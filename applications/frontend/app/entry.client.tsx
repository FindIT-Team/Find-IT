/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import createEmotionCache, {
  defaultCache,
} from '~/emotion/create-emotion-cache';
import { ClientStyleContext } from './emotion/context';
import { CacheProvider } from '@emotion/react';
import { clearBrowserExtensionInjectionsBeforeHydration } from '~/utils/clear-browser-extension-injection.util';

function ClientCacheProvider({ children }: { children: React.ReactNode }) {
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

// TODO: Must be removed, when React fix hydration issue
clearBrowserExtensionInjectionsBeforeHydration();

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ClientCacheProvider>
        <RemixBrowser />
      </ClientCacheProvider>
    </StrictMode>,
  );
});
