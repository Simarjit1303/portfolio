"use client";

import { useEffect } from "react";

/**
 * Disables browser scroll restoration and jumps to top on every page load.
 * Without this, browsers restore the last scroll position on refresh — which
 * causes the canvas background to be out of sync with the visible content.
 */
export default function ScrollReset() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
