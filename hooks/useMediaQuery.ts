"use client";

import { useCallback, useSyncExternalStore } from "react";

function getMediaQuerySnapshot(query: string) {
  return window.matchMedia(query).matches;
}

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => getMediaQuerySnapshot(query),
    () => false,
  );
}
