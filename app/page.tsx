import { ScrollEffects } from "./ScrollEffects";
import { HorizontalStory } from "./HorizontalStory";
import { AwardsGallery } from "./AwardsGallery";
import { ExpandableImage } from "./ExpandableImage";

const projects = [
  {
    id: "prontu",
    name: "Prontu",
    eyebrow: "GESTÃO CLÍNICA / DESKTOP",
    description: "Um sistema desktop para clínicas e consultórios que reúne pacientes, prontuários, agenda inteligente, financeiro e colaboração da equipe em uma única aplicação.",
    detail: "Construído com Python e PySide6, Supabase e PostgreSQL, com autenticação, Row Level Security e Edge Functions.",
    href: "https://github.com/arthur-afonso-GIT/Prontu/tree/main",
    media: [
      { type: "image", src: "/prontu-dashboard.png", alt: "Painel principal do sistema Prontu", caption: "O FLUXO CLÍNICO EM UM SÓ LUGAR", placement: "wide" },
      { type: "image", src: "/prontu-pacientes.png", alt: "Lista de pacientes e formulário de cadastro do Prontu", caption: "PACIENTES E CADASTROS", placement: "left" },
      { type: "image", src: "/prontu-fichas-clinicas.png", alt: "Ficha clínica e histórico de atendimento do Prontu", caption: "FICHAS CLÍNICAS", placement: "right" },
    ],
  },
  {
    id: "prodtrack",
    name: "ProdTrack",
    eyebrow: "PRODUTIVIDADE / DESKTOP",
    description: "Uma aplicação local para registrar e acompanhar horas trabalhadas, organizar atividades e gerar relatórios profissionais em PDF.",
    detail: "Desenvolvida com Python, PySide6, Qt Quick e QML, SQLite, pandas, openpyxl e ReportLab. Sem conta e sem servidor.",
    href: "https://github.com/arthur-afonso-GIT/ProdTrack/tree/main",
    media: [
      { type: "image", src: "/prodtrack-dashboard.png", alt: "Tela inicial do sistema ProdTrack", caption: "TRABALHO ORGANIZADO, SEM FRICÇÃO", placement: "wide" },
    ],
  },
  {
    id: "energiacerta",
    name: "EnergiaCerta",
    eyebrow: "ENERGIA SOLAR / AUTOMAÇÃO",
    description: "Monitoramento de geração e consumo de energia solar residencial, com gerenciamento automático de cargas e comunicação serial com Arduino.",
    detail: "Python e PySide6 para a interface, Matplotlib para os gráficos, PySerial para o hardware e um modo de simulação para explorar o sistema.",
    media: [
      { type: "image", src: "/energiacerta-monitoramento.png", alt: "Monitoramento geral e gerenciamento de cargas do EnergiaCerta", caption: "MONITORAMENTO EM TEMPO REAL", placement: "wide" },
      { type: "image", src: "/energiacerta-baterias.png", alt: "Estado e histórico do banco de baterias do EnergiaCerta", caption: "BANCO DE BATERIAS", placement: "left" },
      { type: "image", src: "/energiacerta-desempenho.png", alt: "Gráficos de desempenho e eficiência energética do EnergiaCerta", caption: "DESEMPENHO E EFICIÊNCIA", placement: "right" },
      { type: "image", src: "/energiacerta-hardware.jpeg", alt: "Protótipo físico do EnergiaCerta com Arduino", caption: "DO SOFTWARE AO HARDWARE", placement: "small" },
      { type: "video", src: "/energiacerta-demo.mp4", alt: "Demonstração do EnergiaCerta", caption: "SISTEMA EM AÇÃO", placement: "medium" },
    ],
  },
  {
    id: "dronevision",
    name: "DroneVision",
    eyebrow: "VISÃO COMPUTACIONAL / ROBÓTICA",
    description: "Visão computacional e automação para o drone DJI Tello, com reconhecimento facial, leitura de QR Codes e planejamento de rotas.",
    detail: "Um projeto acadêmico em Python que explora processamento de imagens, arquitetura modular e integração entre software e hardware.",
    href: "https://github.com/arrudacaua/DroneVision",
    media: [
      { type: "video", src: "/dronevision-demo.mp4", alt: "Primeira demonstração do DroneVision", caption: "VISÃO QUE SAI DO CÓDIGO", placement: "wide" },
      { type: "video", src: "/dronevision-demo-2.mp4", alt: "Segunda demonstração do DroneVision", caption: "EXPLORANDO O VOO AUTÔNOMO", placement: "right" },
    ],
  },
] as const;

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <main className="home" id="inicio">
        <div className="hero-topline"><span>SISTEMAS DE INFORMAÇÃO</span></div>
        <section className="intro">
          <h1><span className="name-line">Arthur</span><span className="name-line name-outline">Afonso<span>.</span></span></h1>
          <p className="lead">Estudante de Sistemas de Informação, atualmente no 2º período, com interesse em Inteligência Artificial, LLMs, Dados e Engenharia de Software. Entusiasta de tecnologia e desenvolvimento de software, busco aprofundar meus conhecimentos por meio de projetos práticos, explorando a construção de aplicações, soluções baseadas em IA e sistemas orientados a dados.</p>
        </section>
        <aside className="socials" aria-label="Redes sociais">
          <a href="https://github.com/arthur-afonso-GIT" target="_blank" rel="noreferrer"><b className="github-label"><img src="/github-mark.png" alt="" />GitHub</b><i>↗</i></a>
          <a href="https://www.linkedin.com/in/arthur-flor%C3%AAncio-afonso/" target="_blank" rel="noreferrer"><span>LinkedIn</span><i>↗</i></a>
          <div className="portrait-frame portrait-cutout"><ExpandableImage className="profile-photo" src="/arthur-cutout.png" alt="Arthur Afonso" width={1168} height={1346} /></div>
        </aside>
        <a className="scroll-indicator" href="#projetos" aria-label="Ir para os projetos"><span className="scroll-indicator-art" aria-hidden="true" /></a>
      </main>
      <HorizontalStory>
        <div className="story-opening story-reveal"><span>UMA SELEÇÃO DE PROJETOS</span><p>Ideias que saíram<br />do papel<span>.</span></p></div>
        {projects.map((project) => (
          <article className={`story-chapter ${project.id}`} key={project.id}>
            <div className="story-intro story-reveal">
              <p className="story-eyebrow">{project.eyebrow}</p>
              <h2>{project.name}<span>.</span></h2>
              <p className="story-description">{project.description}</p>
              <p className="story-detail">{project.detail}</p>
              {"href" in project && <a className="story-link" href={project.href} target="_blank" rel="noreferrer">Ver código no GitHub <span aria-hidden="true">↗</span></a>}
            </div>
            <div className="story-media">
              {project.media.map((item) => (
                <figure className={`story-figure ${item.placement} story-reveal`} key={item.src}>
                  <div className="story-image-wrap">
                    {item.type === "video" ? <video controls playsInline preload="metadata" aria-label={item.alt}><source src={item.src} type="video/mp4" /></video> : <ExpandableImage src={item.src} alt={item.alt} caption={item.caption} loading="lazy" />}
                  </div>
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </HorizontalStory>
      <AwardsGallery />
    </>
  );
}
