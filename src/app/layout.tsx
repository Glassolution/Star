import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

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
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
