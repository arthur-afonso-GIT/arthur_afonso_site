"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";

const photos = [
  { src: "/conecta-apresentacao.png", alt: "Arthur apresentando o Conecta+ no hackathon", caption: "Apresentação do Conecta+", shape: "portrait" },
  { src: "/conecta-entrevista.png", alt: "Arthur em entrevista sobre o hackathon", caption: "Entrevista sobre o projeto", shape: "wide" },
  { src: "/conecta-equipe.png", alt: "Equipe reunida durante a maratona de inovação", caption: "Desenvolvimento em equipe", shape: "landscape" },
  { src: "/conecta-grupo.png", alt: "Participantes reunidos no hackathon", caption: "Hackathon Recriando a Cidade", shape: "tall" },
] as const;

export function AwardsGallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activePhoto !== null && !dialog.open) dialog.showModal();
    if (activePhoto === null && dialog.open) dialog.close();
  }, [activePhoto]);

  return (
    <section className="awards-page" id="premiacoes" aria-labelledby="awards-title">
        <h2 id="awards-title">Premiações<span>.</span></h2>
        <div className="awards-layout">
          <article className="award-story" aria-labelledby="award-conecta-title">
            <p className="award-place">1º lugar</p>
            <h3 id="award-conecta-title">Hackathon<br />Recriando a Cidade<span>.</span></h3>
            <p className="award-organizer">Prefeitura da Cidade do Recife</p>
            <div className="award-copy">
              <strong>Conecta+</strong>
              <p>Integração ao Conecta Recife que unifica o recebimento de chamados, elimina a fragmentação de ocorrências e reduz o tempo de resolução com melhorias na experiência do usuário e no fluxo de envio.</p>
              <p>Atuei como desenvolvedor back-end na API, nos processos de otimização e na arquitetura de software.</p>
            </div>
          </article>
          {photos.map((photo, index) => (
            <Fragment key={photo.src}>
              <figure className={`award-item award-item-${photo.shape}`}>
                <div className="award-image">
                  <button className="award-image-trigger" type="button" onClick={() => setActivePhoto(index)} aria-label={`Ampliar foto: ${photo.caption}`}>
                    <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 88vw, 46vw" />
                  </button>
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
              {photo.shape === "wide" && (
                <p className="award-note award-note-interview">Durante o processo, representei o projeto em entrevista ao <strong>NE2, da Rede Globo</strong>, destacando a arquitetura da solução e os resultados alcançados.</p>
              )}
              {photo.shape === "landscape" && (
                <p className="award-note award-note-team">O melhor de encarar uma maratona destas é a troca técnica e construir uma solução real do zero ao lado de pessoas que dominam o que fazem e puxam o nível do projeto para cima.</p>
              )}
            </Fragment>
          ))}
        </div>
        <dialog className="award-lightbox" ref={dialogRef} onClose={() => setActivePhoto(null)} aria-label="Foto ampliada da premiação">
          <button className="award-lightbox-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Fechar foto">×</button>
          {activePhoto !== null && (
            <figure className="award-lightbox-figure">
              <div className="award-lightbox-image">
                <Image src={photos[activePhoto].src} alt={photos[activePhoto].alt} fill sizes="100vw" />
              </div>
              <figcaption>{photos[activePhoto].caption}</figcaption>
            </figure>
          )}
        </dialog>
    </section>
  );
}
