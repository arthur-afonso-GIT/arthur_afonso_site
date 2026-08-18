import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = { title: "Arthur Afonso — Desenvolvedor & Designer", description: "Portfólio de Arthur Afonso, desenvolvedor full-stack que transforma ideias em produtos digitais claros, rápidos e humanos.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>{children}</body></html>; }
