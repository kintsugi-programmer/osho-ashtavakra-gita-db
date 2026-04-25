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

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
            <span className="font-light tracking-wide">Osho's Ashtavakra MahaGita</span>
          </div>
          <nav className="flex gap-6 text-sm text-stone-500">
            <a href="#about" className="hover:text-stone-800 transition-colors">About</a>
            <a href="#features" className="hover:text-stone-800 transition-colors">Features</a>
            <a href="#roadmap" className="hover:text-stone-800 transition-colors">Roadmap</a>
            <a href="https://github.com/kintsugi-programmer/osho-ashtavakra-gita-db" target="_blank" rel="noopener noreferrer" className="hover:text-stone-800 transition-colors">GitHub</a>
            <a href="https://www.kaggle.com/datasets/siddhantbaliwork/osho-ashtavakra-gita-nlp-dataset" target="_blank" rel="noopener noreferrer" className="hover:text-stone-800 transition-colors">Kaggle</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-200 text-xs text-stone-500 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Now building Phase 2 — Translation Layer
          </div>

          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            The Osho&apos;s Ashtavakra Gita Project
          </h1>
          <div className="flex justify-center items-end gap-4 mb-8">
            <Image src="/image-1.webp" alt="Ashtavakra" width={150} height={150} className="rounded-xl h-[150px] w-auto object-contain" />
            <Image src="/image.png" alt="Osho" width={150} height={150} className="rounded-xl h-[150px] w-auto object-contain" />
          </div>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-4 font-light">
            A structured, AI-ready dataset of Ashtavakra MahaGita teachings based on the discourses of Osho.
          </p>
          <p className="text-stone-400 max-w-xl mx-auto mb-12">
            Designed for semantic search, AI/LLM applications, knowledge graph construction, and bilingual study.
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="#features"
              className="px-6 py-3 bg-stone-800 text-white rounded-full text-sm font-medium hover:bg-stone-900 transition-colors"
            >
              Explore Features
            </a>
            <a
              href="https://github.com/kintsugi-programmer/osho-ashtavakra-gita-db"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-stone-300 rounded-full text-sm hover:border-stone-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.kaggle.com/datasets/siddhantbaliwork/osho-ashtavakra-gita-nlp-dataset"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-stone-300 rounded-full text-sm hover:border-stone-400 transition-colors"
            >
              Kaggle
            </a>
          </div>
        </section>

        <section id="about" className="border-t border-stone-200 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-6">About the Project</h2>
                <p className="text-stone-600 leading-relaxed mb-6">
                  This project transforms raw Hindi discourse text into a clean, structured corpus 
                  suitable for modern AI applications. Based on Osho&apos;s profound teachings on the 
                  Ashtavakra MahaGita.
                </p>
                <p className="text-stone-600 leading-relaxed">
                  The current focus is on building a robust data foundation layer — ensuring 
                  high-quality chunking and consistency before moving to translation and AI layers.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
                <pre className="text-sm text-stone-600 leading-relaxed">{`{
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

        <section id="features" className="border-t border-stone-200 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-light tracking-tight mb-12 text-center">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-stone-500 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="border-t border-stone-200 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-light tracking-tight mb-12 text-center">Roadmap</h2>
            <div className="max-w-xl mx-auto space-y-4">
              {stages.map((stage, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
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
                        ? "text-stone-700"
                        : stage.status === "progress"
                        ? "text-amber-700"
                        : "text-stone-400"
                    }`}
                  >
                    {stage.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light tracking-tight mb-6">Architecture Vision</h2>
            <p className="text-stone-500 mb-8">Consistency at the data layer is critical for everything downstream.</p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-stone-200 shadow-sm font-mono text-sm">
              <span className="text-stone-400">RAW TEXT</span>
              <span className="text-stone-300">→</span>
              <span className="text-stone-400">STRUCTURED DATA</span>
              <span className="text-stone-300">→</span>
              <span className="text-stone-400">EMBEDDINGS</span>
              <span className="text-stone-300">→</span>
              <span className="text-stone-400">SEARCH</span>
              <span className="text-stone-300">→</span>
              <span className="text-amber-600">AI SYSTEM</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-4">
          <div className="text-center">
            <span className="text-sm text-stone-400">Open Source • MIT License</span>
            <span className="mx-2 text-stone-300">•</span>
            <span className="text-sm text-stone-400">Not affiliated with any official Osho organization</span>
          </div>
          <div className="text-center text-xs text-stone-400">
            Original Hindi/Sanskrit texts: <a href="https://oshoworld.com/maha-geeta-by-osho-01-91" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-600">oshoworld.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}