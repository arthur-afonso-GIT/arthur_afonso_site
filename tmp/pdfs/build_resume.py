from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

OUT = r"output/pdf/Curriculo_Arthur_Florencio_Afonso.pdf"
NAVY = HexColor("#17365D")
TEXT = HexColor("#262626")
MUTED = HexColor("#555555")

doc = SimpleDocTemplate(
    OUT, pagesize=A4, rightMargin=15*mm, leftMargin=15*mm,
    topMargin=9*mm, bottomMargin=8*mm,
    title="Curriculo - Arthur Florencio Afonso de Albuquerque",
    author="Arthur Florencio Afonso de Albuquerque",
)
styles = getSampleStyleSheet()
name = ParagraphStyle("Name", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=16,
                      leading=19, alignment=TA_CENTER, textColor=NAVY, spaceAfter=3)
contact = ParagraphStyle("Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=9.1,
                         leading=12, alignment=TA_CENTER, textColor=MUTED, spaceAfter=5)
section = ParagraphStyle("Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=10.8,
                         leading=12.5, textColor=NAVY, spaceBefore=4, spaceAfter=3,
                         borderWidth=0, borderBottomWidth=.7, borderColor=NAVY, borderPadding=(0,0,2,0))
body = ParagraphStyle("Body", parent=styles["Normal"], fontName="Helvetica", fontSize=8.7,
                      leading=10.8, textColor=TEXT, spaceAfter=1.5)
role = ParagraphStyle("Role", parent=body, fontName="Helvetica-Bold", fontSize=9.2,
                      leading=11, spaceBefore=1.5, spaceAfter=.5)
bullet = ParagraphStyle("Bullet", parent=body, leftIndent=9, firstLineIndent=-6, bulletIndent=0,
                        bulletFontName="Helvetica", bulletFontSize=6.5, spaceAfter=1)
compact = ParagraphStyle("Compact", parent=body, fontSize=8.4, leading=10.3, spaceAfter=.5)

story = []
story.append(Paragraph("ARTHUR FLORENCIO AFONSO DE ALBUQUERQUE", name))
story.append(Paragraph("Recife, PE | Disponibilidade para trabalho presencial, híbrido ou remoto", contact))
story.append(Paragraph(
    '<link href="mailto:arthurafonsodev@gmail.com" color="#17365D">arthurafonsodev@gmail.com</link> | '
    '(81) 99212-4670 | '
    '<link href="https://www.linkedin.com/in/arthur-flor%C3%AAncio-afonso/" color="#17365D">LinkedIn</link> | '
    '<link href="https://github.com/arthur-afonso-GIT" color="#17365D">GitHub</link> | '
    '<link href="https://arthur-afonso-site.vercel.app/" color="#17365D">Portfólio</link>', contact))

def sec(title): story.append(Paragraph(title, section))
def p(text, style=body): story.append(Paragraph(text, style))
def b(text): story.append(Paragraph(text, bullet, bulletText="-"))

sec("RESUMO PROFISSIONAL")
p("Estudante do 2º período de Sistemas de Informação com experiência prática em desenvolvimento frontend e aplicações de software. Desenvolvimento do Pacer com React, TypeScript, Tailwind CSS e Supabase, incluindo autenticação, segurança de dados, testes automatizados e CI/CD. Experiência adicional em projetos com Python e SQL entregues a clientes. Interesse em oportunidades para ampliar a experiência em engenharia de software e desenvolvimento web.")

sec("COMPETÊNCIAS")
p("<b>Frontend:</b> TypeScript, JavaScript, React, Vite, Tailwind CSS, React Query, React Hook Form, Zod, Storybook e PWA", compact)
p("<b>Backend e dados:</b> Python, C, SQL, PostgreSQL, SQLite e Supabase | <b>Bibliotecas:</b> PySide6, QML, Pandas, OpenCV e MediaPipe", compact)
p("<b>Qualidade e DevOps:</b> Vitest, Playwright, testes de banco, Git, GitHub Actions, CI/CD e deploy na Vercel", compact)
p("<b>Ferramentas:</b> Visual Studio Code, Figma, ChatGPT e Codex | <b>Práticas:</b> responsividade, acessibilidade e pull requests", compact)

sec("EXPERIÊNCIA PROFISSIONAL")
p("Monitor de Fundamentos de Programação | CESAR School | 2026 - atual", role)
b("Orientação e apoio a estudantes na compreensão de lógica de programação, algoritmos e fundamentos de desenvolvimento.")
p("Desenvolvedor freelancer | Projeto ProdTrack | 2026", role)
b("Condução do levantamento de necessidades, desenvolvimento e entrega de aplicação para registro de horários, evidências de tarefas e acompanhamento da produção.")
b("Implementação de persistência local com SQLite e geração de relatórios em PDF com ReportLab.")

sec("PROJETOS")
p("Pacer - Plataforma Social de Hábitos e Desafios | React, TypeScript, Supabase | 2026", role)
b("Desenvolvimento de aplicação web responsiva para hábitos e desafios em grupo, com feed, calendário, rankings, sequências de dias e atividades com fotos.")
b("Implementação de validação colaborativa de atividades por aprovação da maioria, negociação de pontuação e publicação direcionada por grupo.")
b("Uso de PostgreSQL, autenticação, armazenamento de imagens, Row-Level Security e funções SQL por meio do Supabase.")
b("Interface mobile-first e PWA, com Vitest, testes de banco, Playwright, Storybook, CI/CD pelo GitHub Actions e deploy na Vercel.")
p("Prontu - Sistema de Gestão Clínica | Python, PySide6, QML, Supabase, PDFReader | 2026", role)
b("Desenvolvimento individual de aplicação de gestão clínica, incluindo pacientes, agenda, prontuários e documentos.")
b("Implementação da digitalização automática de PDFs e fotos, com extração de conteúdo via PDFReader para reduzir o cadastro manual.")
b("Desenvolvimento da interface em QML, integração ao Python com PySide6 e uso do Supabase para persistência dos dados.")
b("Solução colocada em uso real e adquirida por duas clínicas, com mais de 200 pacientes reais registrados.")
p("EnergiaCerta - Monitoramento de Energia | Python, PySide6, Arduino, PySerial | 2026", role)
b("Desenvolvimento integral da aplicação desktop do projeto acadêmico para monitoramento da geração e do consumo de energia.")
b("Implementação da comunicação entre o Arduino e a aplicação via USB com PySerial para aquisição de dados.")
b("Desenvolvimento de dashboard em PySide6 para visualização dos dados recebidos em tempo real.")
p("Tracking - Visão Computacional e Drones | Python, OpenCV, MediaPipe | 2026", role)
b("Desenvolvimento de sistema de rastreamento de mãos e rostos em tempo real com webcam, OpenCV e MediaPipe.")
b("Uso dos dados de rastreamento para controle de drone, conectando visão computacional à automação de um sistema físico.")
b("Aplicação de processamento de imagens e interação em tempo real entre software e hardware.")
p("ProdTrack - Gerenciamento de Produção | Python, SQLite, ReportLab | 2026", role)
b("Desenvolvimento individual de aplicação para registro de horários, evidências de tarefas e acompanhamento da produção.")
b("Implementação de persistência local com SQLite e geração de relatórios em PDF e documentos.")
b("Atuação como freelancer desde o levantamento das necessidades até o desenvolvimento e a entrega da solução.")

sec("FORMAÇÃO ACADÊMICA")
p("<b>Bacharelado em Sistemas de Informação</b> | CESAR School | jan. 2026 - dez. 2029 (previsão) | 2º período")

sec("PREMIAÇÕES")
p("<b>1º lugar - Ideathon DSE Talks</b> | ago. 2026", compact)
p("Criação do Kairos, solução de inteligência artificial para identificar lacunas educacionais e gerar planos de ensino personalizados.", compact)

sec("CERTIFICAÇÕES")
p("Lógica de Programação e Algoritmos com C - Udemy | Python 3+ Completo - Udemy", compact)

sec("IDIOMAS")
p("Inglês - Fluente | Espanhol - Iniciante", compact)

doc.build(story)
print(OUT)
