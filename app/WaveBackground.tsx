"use client";

import { useEffect, useRef } from "react";

const fields = [
  { x: 0.12, y: 0.18, size: 0.42, phase: 0.4 },
  { x: 0.78, y: 0.13, size: 0.35, phase: 2.1 },
  { x: 0.43, y: 0.7, size: 0.49, phase: 4.2 },
  { x: 1.01, y: 0.8, size: 0.4, phase: 1.3 },
  { x: -0.12, y: 0.93, size: 0.31, phase: 5.4 },
];

function rgb(value: string): [number, number, number] {
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    return hex.length === 3
      ? [0, 1, 2].map((index) => parseInt(hex[index] + hex[index], 16)) as [number, number, number]
      : [0, 2, 4].map((index) => parseInt(hex.slice(index, index + 2), 16)) as [number, number, number];
  }
  return (value.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [247, 247, 244]) as [number, number, number];
}

const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
const mixColor = (from: readonly number[], to: readonly number[], amount: number) =>
  from.map((channel, index) => Math.round(mix(channel, to[index], amount))).join(", ");

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;

    const draw = (time: number) => {
      if (!width || !height) return;
      const story = document.querySelector<HTMLElement>(".project-story");
      const bounds = story?.getBoundingClientRect();
      const inStory = bounds && bounds.top < height / 2 && bounds.bottom > height / 2;
      const bodyColor = getComputedStyle(document.body).backgroundColor;
      const background = inStory && story
        ? getComputedStyle(story).getPropertyValue("--story-bg").trim()
        : bodyColor === "transparent" || bodyColor.endsWith(", 0)")
          ? getComputedStyle(document.documentElement).backgroundColor
          : bodyColor;
      const [red, green, blue] = rgb(background);
      const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
      const light = Math.min(1, Math.max(0, (luminance - 18) / 214));
      const ink = mixColor([171, 216, 125], [42, 99, 74], light);
      const secondary = mixColor([99, 154, 137], [91, 129, 105], light);
      const opacity = mix(0.15, 0.17, light) + (inStory ? 0.025 : 0);

      context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      context.fillRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * 0.09;
      pointer.y += (pointer.targetY - pointer.y) * 0.09;
      const elapsed = time * 0.00022;
      const unit = Math.max(width, height);

      fields.forEach((field, index) => {
        let x = field.x * width + Math.sin(elapsed + field.phase) * width * 0.06;
        let y = field.y * height + Math.cos(elapsed * 0.8 + field.phase) * height * 0.07;
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / (unit * 0.55));
        x += (dx / (distance || 1)) * influence * 95;
        y += (dy / (distance || 1)) * influence * 95;
        const radius = field.size * unit;
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${index % 2 ? secondary : ink}, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(${index % 2 ? secondary : ink}, ${opacity * 0.43})`);
        gradient.addColorStop(1, `rgba(${ink}, 0)`);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      });

      if (pointer.x > -100 && pointer.x < width + 100) {
        const radius = unit * 0.25;
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius);
        glow.addColorStop(0, `rgba(${ink}, ${mix(0.14, 0.16, light)})`);
        glow.addColorStop(1, `rgba(${ink}, 0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(0);
    };
    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (time - lastFrame < 30) return;
      lastFrame = time;
      draw(time);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      if (document.hidden || motion.matches) draw(0);
      else frame = requestAnimationFrame(animate);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      if (motion.matches) draw(0);
    };
    const leave = () => {
      pointer.targetX = -1000;
      pointer.targetY = -1000;
      if (motion.matches) draw(0);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", restart, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", restart);
    motion.addEventListener("change", restart);
    resize();
    restart();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", restart);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", restart);
      motion.removeEventListener("change", restart);
    };
  }, []);

  return <canvas className="site-waves" ref={canvasRef} aria-hidden="true" />;
}
