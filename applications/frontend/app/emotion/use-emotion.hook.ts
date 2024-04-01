import { useContext, useEffect } from "react";
import { ServerStyleContext } from "~/emotion/server-cache.provider";
import { ClientStyleContext } from "~/emotion/client-cache.provider";
import { EmotionCache } from "@emotion/react";

export function useEmotion(cache: EmotionCache) {
  const serverStyleData = useContext(ServerStyleContext);
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    cache.sheet.container = document.head;
    // re-inject tags
    const tags = cache.sheet.tags;
    cache.sheet.flush();
    tags.forEach((tag) => {
      (cache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData?.reset();
  }, []);

  return { serverStyleData, clientStyleData };
}
