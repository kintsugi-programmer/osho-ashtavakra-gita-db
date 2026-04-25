import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Osho Ashtavakra Gita - AI-Ready Dataset",
  description: "A structured, AI-ready dataset of Ashtavakra MahaGita teachings based on Osho's discourses. Designed for semantic search, AI/LLM applications, and bilingual study.",
  keywords: ["Osho", "Ashtavakra", "Gita", "NLP", "dataset", "RAG", "AI"],
  openGraph: {
    title: "Osho Ashtavakra Gita Project",
    description: "A structured, AI-ready dataset of Ashtavakra MahaGita teachings",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}