import { ScrollEffects } from "./ScrollEffects";

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <main className="home">
        <section className="intro">
          <h1>Arthur<br />Afonso<span>.</span></h1>
          <p className="lead">Estudante de Sistemas de Informação, atualmente no 2º período, com interesse em Inteligência Artificial, LLMs, Dados e Engenharia de Software. Entusiasta de tecnologia e desenvolvimento de software, busco aprofundar meus conhecimentos por meio de projetos práticos, explorando a construção de aplicações, soluções baseadas em IA e sistemas orientados a dados.</p>
        </section>
        <aside className="socials" aria-label="Redes sociais">
          <a href="https://github.com/arthur-afonso-GIT" target="_blank" rel="noreferrer"><b className="github-label"><img src="/github-mark.png" alt="" />GitHub</b><i>↗</i></a>
          <a href="https://www.linkedin.com/in/arthur-flor%C3%AAncio-afonso/" target="_blank" rel="noreferrer"><span>LinkedIn</span><i>↗</i></a>
          <img className="profile-photo" src="/arthur-afonso.jpg" alt="Arthur Afonso" />
        </aside>
      </main>
      <section className="project-scroll" aria-label="Projetos principais">
        <article className="project-panel dark prontu">
          <div className="project-content">
            <div className="project-meta"><span>01 / 04</span><a href="https://github.com/arthur-afonso-GIT/Prontu/tree/main" target="_blank" rel="noreferrer"><b className="github-label"><img src="/github-mark.png" alt="" />GitHub</b><i>↗</i></a></div>
            <h2>Prontu</h2>
            <div className="project-details">
              <div className="project-copy">
                <p>Um sistema desktop de gestão para clínicas e consultórios, desenvolvido para centralizar o fluxo operacional e clínico em uma única aplicação. O sistema reúne gestão de pacientes, prontuários, agenda inteligente, acompanhamento financeiro, retornos, geração de documentos e colaboração entre membros da equipe.</p>
                <p>O projeto foi desenvolvido em Python com PySide6, utilizando Supabase e PostgreSQL como infraestrutura de dados, além de autenticação, Row Level Security, Edge Functions em TypeScript/Deno e controle de acesso baseado em funções.</p>
              </div>
              <img src="/prontu-dashboard.png" alt="Painel principal do sistema Prontu" />
            </div>
          </div>
        </article>
        <article className="project-panel light prodtrack">
          <div className="project-content">
            <div className="project-meta"><span>02 / 04</span><a href="https://github.com/arthur-afonso-GIT/ProdTrack/tree/main" target="_blank" rel="noreferrer"><b className="github-label"><img src="/github-mark.png" alt="" />GitHub</b><i>↗</i></a></div>
            <h2>Prodtrack</h2>
            <div className="project-details">
              <div className="project-copy">
                <p>Uma aplicação desktop de produtividade e gestão de atividades de trabalho, desenvolvida para tornar simples e rápido o registro, acompanhamento e comprovação das horas trabalhadas.</p>
                <p>A aplicação funciona de forma totalmente local, sem depender de servidor, navegador ou criação de conta. Os dados são armazenados em SQLite, com sistema de backups automáticos e manuais. O ProdTrack também oferece geração de relatórios profissionais em PDF.</p>
                <p>Utiliza pandas, openpyxl e ReportLab, PySide6, Qt Quick e QML.</p>
              </div>
              <img src="/prodtrack-dashboard.png" alt="Tela inicial do sistema ProdTrack" />
            </div>
          </div>
        </article>
        <article className="project-panel dark"><div><span>03 / 04</span><h2>energiacerta</h2></div></article>
        <article className="project-panel light"><div><span>04 / 04</span><h2>dronevision</h2></div></article>
      </section>
    </>
  );
}
