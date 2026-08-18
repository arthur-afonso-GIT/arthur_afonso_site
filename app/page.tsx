export default function Home() {
  return (
    <main className="home">
      <section className="intro">
        <p className="overline"><span aria-hidden="true">●</span> Olá, eu sou</p>
        <h1>Arthur<br />Afonso<span>.</span></h1>
        <p className="lead">Estudante de Sistemas de Informação, atualmente no 2º período, com interesse em Inteligência Artificial, LLMs, Dados e Engenharia de Software. Entusiasta de tecnologia e desenvolvimento de software, busco aprofundar meus conhecimentos por meio de projetos práticos, explorando a construção de aplicações, soluções baseadas em IA e sistemas orientados a dados.</p>
      </section>
      <aside className="socials" aria-label="Redes sociais">
        <p>Encontre-me</p>
        <a href="https://github.com/arthur-afonso-GIT" target="_blank" rel="noreferrer"><span>GitHub</span><i>↗</i></a>
        <a href="https://www.linkedin.com/in/arthur-flor%C3%AAncio-afonso/" target="_blank" rel="noreferrer"><span>LinkedIn</span><i>↗</i></a>
      </aside>
    </main>
  );
}
