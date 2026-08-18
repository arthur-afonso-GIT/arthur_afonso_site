import type { Metadata } from "next";
import livros from "./livros.json";

type Livro = {
  titulo: string;
  autor?: string;
  nota?: number;
  status?: string;
  categoria?: string;
  comentario?: string;
  capa?: string;
  link?: string;
};

export const metadata: Metadata = {
  title: "Livros",
  description: "Livros e avaliações de Arthur Afonso.",
  openGraph: { title: "Livros — Arthur Afonso", description: "Livros e avaliações de Arthur Afonso.", images: [] },
  twitter: { title: "Livros — Arthur Afonso", description: "Livros e avaliações de Arthur Afonso.", images: [] },
};

export default function Livros() {
  const catalogo = livros as Livro[];

  return (
    <main className="index-page">
      <header className="page-title"><p className="overline">02 / Livros</p><h1>Livros<span>.</span></h1></header>
      <section className="books-grid" aria-label="Livros">
        {catalogo.map((livro, index) => (
          <article className="book-card" key={livro.titulo}>
            {livro.capa ? (
              <img className="book-cover" src={livro.capa} alt={`Capa de ${livro.titulo}`} />
            ) : (
              <div className="book-cover book-cover-type" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{livro.titulo}</strong>
              </div>
            )}
            <div className="book-info">
              <p className="book-number">{String(index + 1).padStart(2, "0")}</p>
              <h2>{livro.titulo}</h2>
              {livro.autor && <p className="book-author">{livro.autor}</p>}
              {(livro.status || livro.categoria || livro.nota) && (
                <div className="book-meta">
                  {livro.status && <span>{livro.status}</span>}
                  {livro.categoria && <span>{livro.categoria}</span>}
                  {livro.nota && <span aria-label={`Nota ${livro.nota} de 5`}>{livro.nota}/5</span>}
                </div>
              )}
              {livro.comentario && <p className="book-review">{livro.comentario}</p>}
              {livro.link && <a className="book-link" href={livro.link} target="_blank" rel="noreferrer">Onde encontrar <span>↗</span></a>}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
