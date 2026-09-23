"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = document.querySelector<HTMLElement>(".home");
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".story-reveal"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const available = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--reading-progress", `${available > 0 ? window.scrollY / available : 0}`);
      if (preference.matches) return;
      if (hero) hero.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.13, 100)}px`);

    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    for (const reveal of reveals) observer.observe(reveal);
    root.classList.add("motion-ready");
    const onPointer = (event: PointerEvent) => {
      if (!hero || preference.matches || event.pointerType !== "mouse") return;
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}px`);
      hero.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 12}px`);
    };
    const resetPointer = () => {
      hero?.style.setProperty("--pointer-x", "0px");
      hero?.style.setProperty("--pointer-y", "0px");
    };
    const onPreference = () => { resetPointer(); schedule(); };
    hero?.addEventListener("pointermove", onPointer);
    hero?.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", onPreference);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.classList.remove("motion-ready");
      root.style.removeProperty("--reading-progress");
      hero?.removeEventListener("pointermove", onPointer);
      hero?.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", onPreference);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}
