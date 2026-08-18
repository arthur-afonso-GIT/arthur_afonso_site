"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    let stopTimer: ReturnType<typeof setTimeout>;
    const root = document.documentElement;
    const onScroll = () => {
      root.classList.add("is-scrolling");
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => root.classList.remove("is-scrolling"), 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(stopTimer);
      root.classList.remove("is-scrolling");
    };
  }, []);
  return null;
}
