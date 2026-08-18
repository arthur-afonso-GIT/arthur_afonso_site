"use client";

import { useState } from "react";

const projects = [
  { number: "01", title: "Atlas Finance", description: "Dashboard financeiro que transforma movimentações complexas em decisões simples.", tags: ["React", "TypeScript", "Node.js"], tone: "coral" },
  { number: "02", title: "Nômade", description: "Uma experiência de planejamento de viagens feita para quem gosta de sair do roteiro.", tags: ["Next.js", "PostgreSQL", "Figma"], tone: "blue" },
  { number: "03", title: "Lume UI", description: "Design system acessível para acelerar produtos sem apagar a personalidade da marca.", tags: ["React", "Storybook", "A11y"], tone: "yellow" },
];

const books = [
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", rating: "5.0", note: "Mudou minha forma de pensar sistemas." },
  { title: "Roube como um artista", author: "Austin Kleon", rating: "4.5", note: "Curto, prático e sempre revisitado." },
  { title: "O homem que confundiu sua mulher com um chapéu", author: "Oliver Sacks", rating: "4.8", note: "Ciência contada com humanidade." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Arthur Afonso — início"><span>AA</span><span className="brand-dot">.</span></a>
        <button className="menu-button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Fechar" : "Menu"}</button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a><a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos</a><a href="#livros" onClick={() => setMenuOpen(false)}>Estante</a><a className="nav-cta" href="mailto:oi@arthurafonso.dev">Vamos conversar ↗</a>
        </nav>
      </header>
      <section className="hero" id="inicio">
        <div className="eyebrow"><span className="status-dot" /> Disponível para boas ideias</div>
        <h1>Eu desenho e<br />construo <em>produtos</em><br />para pessoas.</h1>
        <div className="hero-footer"><p>Olá, eu sou Arthur — desenvolvedor full-stack com um pé em design e a cabeça sempre no próximo problema interessante.</p><a className="round-link" href="#projetos" aria-label="Ver projetos">↓</a></div>
        <span className="scribble scribble-one" aria-hidden="true">✦</span><span className="scribble scribble-two" aria-hidden="true">(código + café)</span>
      </section>
      <section className="marquee" aria-label="Tecnologias"><div>React <b>✳</b> TypeScript <b>✳</b> Node.js <b>✳</b> Next.js <b>✳</b> PostgreSQL <b>✳</b> Design Systems <b>✳</b></div></section>
      <section className="about section" id="sobre">
        <div className="section-label">01 / SOBRE</div>
        <div className="about-content"><h2>Tecnologia boa é aquela que <span>quase desaparece.</span></h2><div className="about-grid"><p>Gosto de pegar ideias ainda meio bagunçadas e transformá-las em experiências claras, rápidas e agradáveis. Trabalho do banco de dados ao último pixel.</p><p>Fora da tela, provavelmente estou lendo alguma coisa, testando um café novo ou colecionando fatos inúteis para conversas futuras.</p></div><div className="principles"><span>Curiosidade &gt; ego</span><span>Clareza &gt; esperteza</span><span>Feito &gt; perfeito</span></div></div>
      </section>
      <section className="projects section" id="projetos">
        <div className="section-head"><div className="section-label">02 / PROJETOS</div><h2>Trabalhos selecionados</h2><p>Algumas ideias que saíram do papel — e o que aprendi construindo cada uma.</p></div>
        <div className="project-list">{projects.map((project) => <article className={`project-card ${project.tone}`} key={project.title}><div className="project-number">{project.number}</div><div className="project-body"><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><a href="#contato" className="project-link" aria-label={`Conhecer ${project.title}`}>↗</a></article>)}</div>
      </section>
      <section className="books section" id="livros">
        <div className="books-intro"><div className="section-label">03 / ESTANTE</div><h2>O que anda ocupando minha cabeça.</h2><p>Livros que li, marquei, emprestei e talvez nunca mais tenha visto.</p></div>
        <div className="book-list">{books.map((book, index) => <article className="book-row" key={book.title}><span className="book-index">0{index + 1}</span><div><h3>{book.title}</h3><p>{book.author}</p></div><blockquote>“{book.note}”</blockquote><div className="rating"><b>{book.rating}</b><span>★★★★★</span></div></article>)}</div>
      </section>
      <footer id="contato"><div className="footer-kicker">Tem um projeto, uma ideia ou uma boa indicação de livro?</div><h2>Vamos criar algo<br /><em>memorável.</em></h2><a href="mailto:oi@arthurafonso.dev" className="email-link">oi@arthurafonso.dev <span>↗</span></a><div className="footer-bottom"><span>Arthur Afonso © 2026</span><div><a href="#">GitHub</a><a href="#">LinkedIn</a><a href="#inicio">Voltar ao topo ↑</a></div></div></footer>
    </main>
  );
}
