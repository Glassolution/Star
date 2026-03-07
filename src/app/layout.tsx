import type { Metadata } from "next";
import { Space_Mono, Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
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
      className={`${spaceMono.variable} ${syne.variable} ${dmSans.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
