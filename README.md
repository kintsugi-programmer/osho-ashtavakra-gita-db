# osho-ashtavakra-gita-db

- https://github.com/kintsugi-programmer/osho-ashtavakra-gita-db

A structured, AI-ready dataset of Ashtavakra Gita teachings based on the discourses of Osho, designed for search, analysis, and intelligent systems.

---

## Overview

This project transforms raw Hindi discourse text into a clean, structured corpus suitable for:

- Semantic search
- AI/LLM applications (RAG, personas)
- Knowledge graph construction
- Bilingual study (Hindi ↔ English)

The current focus is on building a robust data foundation layer — ensuring high-quality chunking and consistency before moving to translation and AI layers.

---

## Current Stage

✅ Raw Hindi text ingestion
✅ Text normalization
✅ Sentence-safe chunking (~300 words)
✅ Structured JSON dataset generation

🚧 Upcoming:

- AI-assisted translation (Hindi → English)
- Embeddings + semantic search
- API layer
- Web reader interface
- Knowledge graph & AI persona

---

## Project Structure

```
osho-ashtavakra-gita-db/
│
├── data/
│   ├── raw/                # original Hindi discourse (ch01.txt, ...)
│   ├── processed/          # structured chunked output (JSON)
│   └── final/              # future: cleaned + translated dataset
│
├── scripts/
│   └── chunker.py          # core processing pipeline
│
├── notebooks/              # future analysis / Kaggle notebooks
│
├── README.md
└── requirements.txt
```

---

## Chunking Strategy

The dataset is built using a deterministic, sentence-aware chunking pipeline:

- Target size: ~300 words per chunk
- Never breaks sentences (। ! ? ।।)
- Extends to nearest sentence boundary
- Hard limit to avoid runaway chunks
- Appends delimiter | for downstream processing

### Example Output

```json
{
  "id": "AAG_C01_P001",
  "chapter_no": 1,
  "chunk_index": 1,
  "text_hi": "... |",
  "text_en": null,
  "translation_status": "pending",
  "word_count": 303,
  "char_count": 1694
}
```

---

---

## 🔒 Data Integrity Rules

To maintain dataset quality and consistency, all processing must follow strict rules:

### General
- Never modify `text_hi` once generated
- Never change chunk boundaries after creation
- Each chunk is immutable except for translation fields
- JSON structure must remain consistent across all chapters

### Chunk Format Contract

Every chunk must contain:

```json
{
  "id": "AAG_C01_P001",
  "chapter_no": 1,
  "chunk_index": 1,
  "text_hi": "... |",
  "text_en": null,
  "translation_status": "pending",
  "word_count": 300,
  "char_count": 1600
}
```

No additional fields unless versioned explicitly.

---

## 🤖 AI Translation Workflow

Translation is performed incrementally on chunked data.

### Translation Rules

- Only update chunks where `text_en == null`
- Do NOT modify:
  - `text_hi`
  - `id`
  - `chapter_no`
  - `chunk_index`
- Write translation strictly into `text_en`
- Set:
```json
"translation_status": "ai_draft"
```

---

## 🧠 AI Prompt Standard (MANDATORY)

Use this exact prompt for AI-based translation:

```text
Translate all chunks where text_en is null.

Strict rules:
- Do NOT use scripts, tools, libraries, or external translators
- Perform translation directly using the model (in-place edit)
- Do NOT change JSON structure
- Do NOT modify text_hi
- Write translation into text_en
- Keep translation literal and faithful to meaning
- Do NOT paraphrase, simplify, or reinterpret
- Preserve sentence order exactly
- Keep repetitions if present
- Do NOT add or remove sentences
- No summaries, no explanations, no comments
- Output must remain valid JSON
- Set translation_status = "ai_draft"
- If unsure about a phrase, translate conservatively rather than creatively
```

---

## ⚠️ Common Failure Modes

Avoid these mistakes:

- ❌ Using Google Translate or APIs (breaks consistency)
- ❌ Paraphrasing instead of translating
- ❌ Editing `text_hi`
- ❌ Re-chunking after translation
- ❌ Running scripts that overwrite JSON blindly

---

## 🔄 Workflow Loop (Daily)

```
1. Add new chXX.txt → data/raw/
2. Run chunker.py
3. Verify JSON output
4. Run AI translation
5. Commit changes
```

---

## 📦 Versioning Strategy

- `processed/` → chunked source of truth
- `final/` → cleaned + translated dataset

Future:
- translation states: `pending → ai_draft → reviewed → final`

---

## 🧭 Architecture Vision

```
RAW TEXT → STRUCTURED DATA → EMBEDDINGS → SEARCH → AI SYSTEM
```

Consistency at the data layer is critical for everything downstream.

---

## 🚀 Future Extensions

- Embeddings (FAISS / Pinecone)
- Semantic search
- FastAPI backend
- Web reader (Next.js)
- Knowledge graph
- Osho-style AI persona

---

## Usage

Run the chunking pipeline from project root:

```bash
python3 scripts/chunker.py --all
```

Or process a single chapter:

```bash
python3 scripts/chunker.py --chapter 1
```

Output will be generated in:

```
data/processed/ch01.json
```

---

## Design Philosophy

This project prioritizes:

- Simplicity over premature complexity
- Deterministic pipelines over heuristic guesswork
- Data quality as the core asset

Rather than over-engineering structure early, the system focuses on creating a clean, scalable base dataset that can power multiple downstream applications.

---

## Roadmap

### Phase 1 — Data Foundation (current)

- Chunking pipeline
- Dataset consistency

### Phase 2 — Translation Layer

- AI-assisted Hindi → English translation
- Human review workflow

### Phase 3 — Intelligence Layer

- Embeddings (vector search)
- Semantic retrieval

### Phase 4 — Applications

- REST API (FastAPI)
- Web reader (Next.js)
- Daily teaching generator

### Phase 5 — Advanced

- Knowledge graph (concept mapping)
- AI persona (Osho-style conversational system)

---

## Disclaimer

This project is an independent effort to structure and analyze discourse text for educational and research purposes. It is not affiliated with any official organization related to Osho.

- resource: https://oshoworld.com/maha-geeta-by-osho-01-91

---

## Contributing

Contributions are welcome in:

- Translation (Hindi ↔ English)
- Text cleaning & validation
- NLP / search improvements

---

## License

TBD

---

## Vision

To build a high-quality, open, machine-readable corpus of philosophical discourse that enables deeper exploration, understanding, and interaction through modern AI systems.