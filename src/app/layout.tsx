import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "STAR — Sua IA técnica por trás do código",
  description:
    "Segurança, pagamentos, webhooks e arquitetura — analisados e corrigidos com um prompt.",
  keywords: [
    "GitHub",
    "security",
    "code analysis",
    "AI",
    "code review",
    "webhooks",
    "payments",
  ],
  authors: [{ name: "STAR" }],
  openGraph: {
    title: "STAR — Sua IA técnica por trás do código",
    description:
      "Segurança, pagamentos, webhooks e arquitetura — analisados e corrigidos com um prompt.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable} ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
