import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://oshogita.sbali.tech"),
  title: {
    default: "Osho Ashtavakra Gita | 91 Lessons of Wisdom",
    template: "%s | Osho Ashtavakra Gita",
  },
  description: "Read all 91 chapters of Ashtavakra MahaGita with Osho's profound teachings. A structured, AI-ready dataset for semantic search, AI/LLM applications, and bilingual Hindi-English study.",
  keywords: [
    "Osho",
    "Ashtavakra",
    "Ashtavakra Gita",
    "MahaGita",
    "Osho teachings",
    "Hindi spiritual text",
    "Yoga of knowledge",
    "Self-realization",
    "NLP dataset",
    "AI training data",
    "RAG",
    "bilingual",
    "91 chapters",
    "vedanta",
  ],
  authors: [{ name: "Siddhant Bali" }],
  creator: "Siddhant Bali",
  publisher: "Osho Ashtavakra Gita Project",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oshogita.sbali.tech",
    siteName: "Osho Ashtavakra Gita",
    title: "Osho Ashtavakra Gita | 91 Lessons of Wisdom",
    description: "Read all 91 chapters of Ashtavakra MahaGita with Osho's profound teachings. Structured for AI/LLM and bilingual study.",
    images: [
      {
        url: "/image-1.webp",
        width: 400,
        height: 400,
        alt: "Osho Ashtavakra Gita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osho Ashtavakra Gita | 91 Lessons",
    description: "Read all 91 chapters of Ashtavakra MahaGita with Osho's teachings. AI-ready dataset.",
    images: ["/image-1.webp"],
  },
  alternates: {
    canonical: "https://oshogita.sbali.tech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}