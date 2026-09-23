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
    let whiteAt = 0.5;
    let active = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!active || distance <= 0) return;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
      const light = Math.min(1, Math.max(0, progress / whiteAt));
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      section.style.setProperty("--story-progress", String(progress));
      section.style.setProperty("--story-bg", blend([17, 19, 15], [232, 235, 227], light));
      section.style.setProperty("--story-ink", blend([245, 245, 237], [21, 23, 19], light));
      section.style.setProperty("--story-soft", blend([216, 218, 206], [70, 77, 68], light));
      section.style.setProperty("--story-accent", blend([210, 246, 90], [49, 92, 70], light));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      active = window.innerWidth >= 900 && window.innerHeight >= 650 && !reducedMotion.matches;
      section.classList.toggle("story-horizontal", active);
      track.style.removeProperty("transform");
      distance = active ? Math.max(0, track.scrollWidth - section.clientWidth) : 0;
      const prodtrack = track.querySelector<HTMLElement>(".prodtrack");
      if (active && distance > 0 && prodtrack) {
        const start = prodtrack.getBoundingClientRect().left - track.getBoundingClientRect().left;
        whiteAt = Math.max(0.1, (start - section.clientWidth) / distance);
      }
      if (distance === 0) active = false;
      section.classList.toggle("story-horizontal", active);
      section.style.height = active ? `${window.innerHeight + distance}px` : "";
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
      section.style.removeProperty("--story-progress");
      for (const name of ["--story-bg", "--story-ink", "--story-soft", "--story-accent"]) section.style.removeProperty(name);
      track.style.removeProperty("transform");
    };
  }, []);

  return (
    <section className="project-story" id="projetos" aria-label="Projetos" ref={sectionRef}>
      <div className="story-sticky">
        <div className="story-track" ref={trackRef}>{children}</div>
        <div className="story-progress" aria-hidden="true" />
      </div>
    </section>
  );
}
