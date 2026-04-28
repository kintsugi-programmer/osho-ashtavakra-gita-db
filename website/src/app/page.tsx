"use client";

const features = [
  {
    title: "Semantic Search",
    description: "Find teachings instantly with AI-powered search across all chapters",
  },
  {
    title: "Bilingual Reading",
    description: "Study in Hindi and English with side-by-side translations",
  },
  {
    title: "RAG Ready",
    description: "Structured data optimized for AI and LLM applications",
  },
  {
    title: "Open Source",
    description: "Free for everyone - researchers, developers, and seekers",
  },
];

const stages = [
  { status: "done", text: "Raw Hindi text ingestion" },
  { status: "done", text: "Text normalization" },
  { status: "done", text: "Sentence-safe chunking" },
  { status: "done", text: "Structured JSON generation" },
  { status: "progress", text: "AI-assisted translation" },
  { status: "pending", text: "Embeddings & semantic search" },
  { status: "pending", text: "Web reader interface" },
];

import Image from "next/image";
import ChaptersTable from "@/components/ChaptersTable";
import { ThemeToggle } from "@/components/ThemeProvider";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100">
      {/* Mobile Navigation */}
      <nav className="sticky top-0 z-50 lg:hidden border-b border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
            <span className="font-light text-sm tracking-wide">Osho Ashtavakra</span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <details className="relative">
            <summary className="list-none cursor-pointer p-2 -m-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-stone-600 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-stone-800 rounded-lg shadow-lg border border-stone-200 dark:border-stone-700 py-2 space-y-1">
              <a href="#about" className="block px-4 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700">About</a>
              <a href="#chapters" className="block px-4 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700">91 Lessons</a>
              <a href="#features" className="block px-4 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700">Features</a>
              <a href="#roadmap" className="block px-4 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700">Roadmap</a>
              <hr className="my-2 border-stone-100 dark:border-stone-700" />
              <a href="https://github.com/kintsugi-programmer/osho-ashtavakra-gita-db" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700">GitHub</a>
              <a href="https://www.kaggle.com/datasets/siddhantbaliwork/osho-ashtavakra-gita-nlp-dataset" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700">Kaggle</a>
            </div>
          </details>
          </div>
        </div>
      </nav>

      {/* Desktop Header */}
      <header className="sticky top-0 z-50 hidden lg:block border-b border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
            <span className="font-light tracking-wide">Osho&apos;s Ashtavakra MahaGita</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-stone-500 dark:text-stone-400">
            <a href="#about" className="hover:text-stone-800 dark:hover:text-stone-100 transition-colors">About</a>
            <a href="#chapters" className="hover:text-stone-800 dark:hover:text-stone-100 transition-colors">91 Lessons</a>
            <a href="#features" className="hover:text-stone-800 dark:hover:text-stone-100 transition-colors">Features</a>
            <a href="#roadmap" className="hover:text-stone-800 dark:hover:text-stone-100 transition-colors">Roadmap</a>
            <a href="https://github.com/kintsugi-programmer/osho-ashtavakra-gita-db" target="_blank" rel="noopener noreferrer" className="hover:text-stone-800 dark:hover:text-stone-100 transition-colors">GitHub</a>
            <a href="https://www.kaggle.com/datasets/siddhantbaliwork/osho-ashtavakra-gita-nlp-dataset" target="_blank" rel="noopener noreferrer" className="hover:text-stone-800 dark:hover:text-stone-100 transition-colors">Kaggle</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border border-stone-200 dark:border-stone-700 text-xs text-stone-500 dark:text-stone-400 mb-6 md:mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="hidden sm:inline">Now building Phase 2 — Translation Layer</span>
            <span className="sm:hidden">Phase 2: Translation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 md:mb-6">
            The Osho&apos;s Ashtavakra Gita Project
          </h1>
          <div className="flex justify-center items-end gap-2 md:gap-4 mb-6 md:mb-8">
            <Image src="/image-1.webp" alt="Ashtavakra" width={100} height={100} className="rounded-xl h-[80px] md:h-[120px] lg:h-[150px] w-auto object-contain" />
            <Image src="/image.png" alt="Osho" width={100} height={100} className="rounded-xl h-[80px] md:h-[120px] lg:h-[150px] w-auto object-contain" />
          </div>
          <p className="text-base md:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto mb-4 font-light px-4">
            A structured, AI-ready dataset of Ashtavakra MahaGita teachings based on the discourses of Osho.
          </p>
          <p className="text-stone-400 max-w-xl mx-auto mb-8 md:mb-12 px-4">
            Designed for semantic search, AI/LLM applications, knowledge graph construction, and bilingual study.
          </p>

          <div className="flex flex-wrap gap-2 md:gap-3 justify-center px-4">
            <a
              href="#chapters"
              className="px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              <span>Read Lessons</span>
            </a>
            <a
              href="#features"
               className="px-5 md:px-6 py-2.5 md:py-3 bg-stone-800 dark:bg-stone-700 text-white rounded-full text-sm font-medium hover:bg-stone-900 dark:hover:bg-stone-600 transition-colors"
            >
              <span>Features</span>
            </a>
            <a
              href="https://www.kaggle.com/datasets/siddhantbaliwork/osho-ashtavakra-gita-nlp-dataset"
              target="_blank"
              rel="noopener noreferrer"
               className="px-5 md:px-6 py-2.5 md:py-3 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 rounded-full text-sm font-medium hover:border-stone-400 dark:hover:border-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              <span>Kaggle Data</span>
            </a>
            <a
              href="https://github.com/kintsugi-programmer/osho-ashtavakra-gita-db"
              target="_blank"
              rel="noopener noreferrer"
               className="px-5 md:px-6 py-2.5 md:py-3 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 rounded-full text-sm font-medium hover:border-stone-400 dark:hover:border-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              <span>GitHub Code</span>
            </a>
          </div>
        </section>

        <section id="about" className="border-t border-stone-200 dark:border-stone-700 py-8 md:py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4 md:mb-6">About the Project</h2>
                 <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4 md:mb-6">
                  This project transforms raw Hindi discourse text into a clean, structured corpus 
                  suitable for modern AI applications. Based on Osho&apos;s profound teachings on the 
                  Ashtavakra MahaGita.
                </p>
                 <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  The current focus is on building a robust data foundation layer — ensuring 
                  high-quality chunking and consistency before moving to translation and AI layers.
                </p>
              </div>
               <div className="bg-white dark:bg-stone-800 rounded-2xl p-4 md:p-8 border border-stone-200 dark:border-stone-700 shadow-sm overflow-x-auto">
                 <pre className="text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre">{`{
  "id": "AAG_C01_P001",
  "chapter_no": 1,
  "chunk_index": 1,
  "text_hi": "जनक उवाच...",
  "text_en": "Janaka said...",
  "translation_status": "ai_draft"
}`}</pre>
              </div>
            </div>
          </div>
        </section>

        <section id="chapters" className="border-t border-stone-200 dark:border-stone-700 py-12 md:py-20 bg-gradient-to-b from-white to-amber-50/30 dark:from-stone-900 dark:to-stone-800/40">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-center mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600">91 Lessons</span>
            </h2>
             <p className="text-stone-500 dark:text-stone-400 text-center mb-8 md:mb-12 max-w-lg mx-auto">
              Dive into the profound wisdom of Ashtavakra MahaGita through 91 transformative chapters
            </p>
            <ChaptersTable />
          </div>
        </section>

        <section id="features" className="border-t border-stone-200 dark:border-stone-700 py-8 md:py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8 md:mb-12 text-center">Features</h2>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                   className="p-4 md:p-6 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-shadow"
                 >
                   <h3 className="text-base md:text-lg font-medium mb-2">{feature.title}</h3>
                   <p className="text-stone-500 dark:text-stone-400 text-sm">{feature.description}</p>
                 </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="border-t border-stone-200 dark:border-stone-700 py-8 md:py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8 md:mb-12 text-center">Roadmap</h2>
            <div className="max-w-xl mx-auto space-y-3 md:space-y-4">
              {stages.map((stage, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  <div
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full flex-shrink-0 ${
                      stage.status === "done"
                        ? "bg-green-500"
                        : stage.status === "progress"
                        ? "bg-amber-500"
                        : "bg-stone-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      stage.status === "done"
                        ? "text-stone-700 dark:text-stone-200"
                        : stage.status === "progress"
                        ? "text-amber-700 dark:text-amber-400"
                        : "text-stone-400 dark:text-stone-500"
                    }`}
                  >
                    {stage.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 dark:border-stone-700 py-8 md:py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4 md:mb-6">Architecture Vision</h2>
            <p className="text-stone-500 dark:text-stone-400 mb-6 md:mb-8 px-4">Consistency at the data layer is critical for everything downstream.</p>
            <div className="inline-flex flex-wrap items-center justify-center gap-1 md:gap-3 px-4 md:px-6 py-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm font-mono text-xs md:text-sm">
              <span className="text-stone-400 dark:text-stone-500">RAW TEXT</span>
              <span className="text-stone-300 dark:text-stone-600">→</span>
              <span className="text-stone-400 dark:text-stone-500">DATA</span>
              <span className="text-stone-300 dark:text-stone-600">→</span>
              <span className="text-stone-400 dark:text-stone-500">EMBED</span>
              <span className="text-stone-300 dark:text-stone-600">→</span>
              <span className="text-amber-600">AI</span>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-stone-200 dark:border-stone-700">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-3 md:space-y-4">
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm">
            <span className="text-stone-400">Open Source • MIT License</span>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <span className="text-stone-400">Not affiliated with Osho org</span>
          </div>
          <div className="text-center text-xs md:text-sm text-stone-400 px-4">
            Original texts: <a href="https://oshoworld.com/maha-geeta-by-osho-01-91" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-600 dark:hover:text-stone-200">oshoworld.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
