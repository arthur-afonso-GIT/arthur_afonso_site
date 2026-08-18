import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos de Arthur Afonso.",
  openGraph: { title: "Projetos — Arthur Afonso", description: "Projetos de Arthur Afonso.", images: [] },
  twitter: { title: "Projetos — Arthur Afonso", description: "Projetos de Arthur Afonso.", images: [] },
};

export default function Projetos() {
  return (
    <main className="index-page">
      <header className="page-title"><p className="overline">01 / Projetos</p><h1>Projetos<span>.</span></h1></header>
      <section className="empty-state"><span>Em construção</span><p>Meus projetos serão apresentados aqui.</p></section>
    </main>
  );
}
