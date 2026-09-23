"use client";

import { useEffect, useRef, type ReactNode } from "react";

const blend = (from: readonly number[], to: readonly number[], amount: number) =>
  `rgb(${from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount)).join(" ")})`;

export function HorizontalStory({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let distance = 0;
    let lightStart = 0.2;
    let lightEnd = 0.3;
    let zoomDistance = 0;
    let active = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!active || distance <= 0) {
        for (const name of ["--story-zoom", "--story-opacity", "--story-zoom-progress", "--story-bg", "--story-ink", "--story-soft", "--story-accent"]) section.style.removeProperty(name);
        return;
      }
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
      const zoomProgress = Math.min(1, Math.max(0, (-section.getBoundingClientRect().top - distance) / zoomDistance));
      const zoom = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
      const phase = Math.min(1, Math.max(0, (progress - lightStart) / (lightEnd - lightStart)));
      const light = phase * phase * (3 - 2 * phase);
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      section.style.setProperty("--story-zoom", String(1 - zoom * 0.34));
      section.style.setProperty("--story-opacity", String(1 - zoom));
      section.style.setProperty("--story-zoom-progress", String(zoom));
      section.style.setProperty("--story-bg", blend([10, 10, 10], [232, 232, 232], light));
      section.style.setProperty("--story-ink", blend([242, 242, 242], [10, 10, 10], light));
      section.style.setProperty("--story-soft", blend([176, 176, 176], [76, 76, 76], light));
      section.style.setProperty("--story-accent", blend([255, 26, 26], [181, 16, 16], light));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      active = (window.innerWidth < 900 || window.innerHeight >= 650) && !reducedMotion.matches;
      section.classList.toggle("story-horizontal", active);
      track.style.removeProperty("transform");
      distance = active ? Math.max(0, track.scrollWidth - section.clientWidth) : 0;
      zoomDistance = active ? Math.max(window.innerHeight * 1.15, window.innerWidth < 900 ? 480 : 850) : 0;
      const prodtrack = track.querySelector<HTMLElement>(".prodtrack");
      const prontuIntro = track.querySelector<HTMLElement>(".prontu .story-intro");
      const prontu = track.querySelector<HTMLElement>(".prontu");
      if (active && distance > 0 && prodtrack && prontuIntro && prontu) {
        lightEnd = Math.max(0.1, (prodtrack.offsetLeft - section.clientWidth) / distance);
        lightStart = Math.min(lightEnd - 0.02, (prontu.offsetLeft + prontuIntro.offsetLeft + prontuIntro.offsetWidth) / distance);
      }
      if (distance === 0) active = false;
      section.classList.toggle("story-horizontal", active);
      section.style.height = active ? `${window.innerHeight + distance + zoomDistance}px` : "";
      update();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("load", measure);
    reducedMotion.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("load", measure);
      reducedMotion.removeEventListener("change", measure);
      section.classList.remove("story-horizontal");
      section.style.removeProperty("height");
      for (const name of ["--story-zoom", "--story-opacity", "--story-zoom-progress"]) section.style.removeProperty(name);
      for (const name of ["--story-bg", "--story-ink", "--story-soft", "--story-accent"]) section.style.removeProperty(name);
      track.style.removeProperty("transform");
    };
  }, []);

  return (
    <section className="project-story" id="projetos" aria-label="Projetos" ref={sectionRef}>
      <div className="story-sticky">
        <div className="story-stage"><div className="story-track" ref={trackRef}>{children}</div></div>
      </div>
    </section>
  );
}
