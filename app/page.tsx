export default function Home() {
  return (
    <>
      <main className="home">
        <section className="intro">
          <h1>Arthur<br />Afonso<span>.</span></h1>
          <p className="lead">Estudante de Sistemas de Informação, atualmente no 2º período, com interesse em Inteligência Artificial, LLMs, Dados e Engenharia de Software. Entusiasta de tecnologia e desenvolvimento de software, busco aprofundar meus conhecimentos por meio de projetos práticos, explorando a construção de aplicações, soluções baseadas em IA e sistemas orientados a dados.</p>
        </section>
        <aside className="socials" aria-label="Redes sociais">
          <a href="https://github.com/arthur-afonso-GIT" target="_blank" rel="noreferrer"><span>GitHub</span><i>↗</i></a>
          <a href="https://www.linkedin.com/in/arthur-flor%C3%AAncio-afonso/" target="_blank" rel="noreferrer"><span>LinkedIn</span><i>↗</i></a>
          <img className="profile-photo" src="/arthur-afonso.jpg" alt="Arthur Afonso" />
        </aside>
      </main>
      <section className="project-scroll" aria-label="Projetos principais">
        <article className="project-panel dark"><div><span>01 / 04</span><h2>Prontu</h2></div></article>
        <article className="project-panel light"><div><span>02 / 04</span><h2>Prodtrack</h2></div></article>
        <article className="project-panel dark"><div><span>03 / 04</span><h2>energiacerta</h2></div></article>
        <article className="project-panel light"><div><span>04 / 04</span><h2>dronevision</h2></div></article>
      </section>
    </>
  );
}
