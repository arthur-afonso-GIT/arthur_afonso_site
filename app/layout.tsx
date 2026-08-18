import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Arthur Afonso", template: "%s — Arthur Afonso" },
  description: "Portfólio de Arthur Afonso, estudante de Sistemas de Informação.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <header className="header">
          <Link className="wordmark" href="/">Arthur Afonso</Link>
          <nav aria-label="Navegação principal">
            <Link href="/">Início</Link>
            <Link href="/projetos">Projetos</Link>
            <Link href="/livros">Livros</Link>
          </nav>
        </header>
        {children}
        <footer><span>Arthur Afonso</span><span>2026</span></footer>
      </body>
    </html>
  );
}
