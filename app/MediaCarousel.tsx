"use client";

import { useRef, useState } from "react";

const energiaCertaMedia = [
  { type: "image", src: "/energiacerta-dashboard.jpeg", alt: "Dashboard do EnergiaCerta" },
  { type: "video", src: "/energiacerta-demo.mp4", alt: "Demonstração do EnergiaCerta" },
  { type: "image", src: "/energiacerta-hardware.jpeg", alt: "Protótipo físico do EnergiaCerta com Arduino" },
] as const;

type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
};

type MediaCarouselProps = {
  items?: readonly MediaItem[];
  label?: string;
};

export function MediaCarousel({ items = energiaCertaMedia, label = "Galeria do projeto EnergiaCerta" }: MediaCarouselProps) {
  const media = items;
  const [current, setCurrent] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const go = (direction: number) => setCurrent((current + direction + media.length) % media.length);

  return (
    <div
      className="media-carousel"
      role="region"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
      }}
      onPointerDown={(event) => { pointerStart.current = event.clientX; }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        if (Math.abs(distance) > 45) go(distance > 0 ? -1 : 1);
        pointerStart.current = null;
      }}
    >
      <div className="carousel-progress" aria-hidden="true">
        {media.map((item, index) => <span className={index === current ? "active" : ""} key={item.src} />)}
      </div>
      <div className="carousel-stage" aria-live="polite">
        {media[current].type === "video" ? (
          <video key={media[current].src} src={media[current].src} controls playsInline preload="metadata" aria-label={media[current].alt} />
        ) : (
          <img src={media[current].src} alt={media[current].alt} draggable={false} />
        )}
      </div>
      <button className="carousel-arrow previous" type="button" onClick={() => go(-1)} aria-label="Mídia anterior">←</button>
      <button className="carousel-arrow next" type="button" onClick={() => go(1)} aria-label="Próxima mídia">→</button>
      <div className="carousel-dots" aria-label="Selecionar mídia">
        {media.map((item, index) => <button className={index === current ? "active" : ""} type="button" onClick={() => setCurrent(index)} aria-label={`Mostrar mídia ${index + 1}`} aria-current={index === current ? "true" : undefined} key={item.src} />)}
      </div>
    </div>
  );
}
