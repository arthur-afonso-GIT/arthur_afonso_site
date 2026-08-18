import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <section className="intro">
        <p className="overline">Olá, eu sou</p>
        <h1>Arthur<br />Afonso<span>.</span></h1>
        <p className="lead">Estudante de Sistemas de Informação, atualmente no segundo período.</p>
      </section>
      <section className="home-links" aria-label="Outras páginas">
        <Link href="/projetos"><span>01</span><strong>Projetos</strong><i>↗</i></Link>
        <Link href="/livros"><span>02</span><strong>Livros</strong><i>↗</i></Link>
      </section>
    </main>
  );
}
