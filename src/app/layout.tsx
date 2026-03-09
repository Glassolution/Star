import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-syne",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-mono",
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${syne.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
