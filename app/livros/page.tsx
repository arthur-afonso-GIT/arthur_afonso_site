import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livros",
  description: "Livros e avaliações de Arthur Afonso.",
  openGraph: { title: "Livros — Arthur Afonso", description: "Livros e avaliações de Arthur Afonso.", images: [] },
  twitter: { title: "Livros — Arthur Afonso", description: "Livros e avaliações de Arthur Afonso.", images: [] },
};

export default function Livros() {
  return (
    <main className="index-page">
      <header className="page-title"><p className="overline">02 / Livros</p><h1>Livros<span>.</span></h1></header>
      <section className="empty-state"><span>Em construção</span><p>Minhas leituras e avaliações serão apresentadas aqui.</p></section>
    </main>
  );
}
