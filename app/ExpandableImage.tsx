"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  draggable?: boolean;
};

export function ExpandableImage({ src, alt, caption, className, width, height, loading, draggable }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button className="expandable-photo-trigger" type="button" onClick={() => setOpen(true)} aria-label={`Ampliar foto: ${alt}`}>
        <img src={src} alt={alt} className={className} width={width} height={height} loading={loading} draggable={draggable} />
      </button>
      <dialog className="award-lightbox" ref={dialogRef} onClose={() => setOpen(false)} aria-label={`Foto ampliada: ${alt}`}>
        <button className="award-lightbox-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Fechar foto">×</button>
        <figure className="award-lightbox-figure">
          <div className="award-lightbox-image"><img src={src} alt={alt} /></div>
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      </dialog>
    </>
  );
}
