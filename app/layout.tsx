import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Arthur Afonso", template: "%s — Arthur Afonso" },
  description: "Portfólio de Arthur Afonso, estudante de Sistemas de Informação.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="header">
          <Link className="wordmark" href="/">Arthur Afonso</Link>
          <nav aria-label="Navegação principal">
            <Link href="/">Início</Link>
            <Link href="/livros">Livros</Link>
          </nav>
        </header>
        {children}
        <footer><span>Arthur Afonso</span><span>2026</span></footer>
      </body>
    </html>
  );
}
