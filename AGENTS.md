# Osho Ashtavakra Gita — Agent Guide

## Key Commands

| Action | Command | Notes |
|--------|---------|-------|
| Chunk a chapter | `python3 scripts/chunker.py --chapter <N>` | Run from repo root |
| Chunk all pending | `python3 scripts/chunker.py --all` | Use `--force` to overwrite existing |
| Dev server (website) | `cd website && bun run dev` | Syncs data, then starts Next.js 16 |
| Build (static export) | `cd website && bun run build` | Output to `out/` |
| Sync data to website | `cd website && bun run sync` | Copies `kaggle_dataset/` → `public/data/` |

Package manager for website is **bun** (not npm/pnpm).

## Data Pipeline

```
data/raw/chXX.txt  --[chunker.py]-->  data/processed/chXX.json  --[sync-data.ts]-->  website/public/data/chXX.json
                                                                       ↑ copies from kaggle_dataset/ (not processed/)
```

- `data/processed/` is the source-of-truth for chunked text
- `kaggle_dataset/` is a publishable snapshot (copied from processed for Kaggle)
- `website/public/data/` is generated from `kaggle_dataset/` (not from `processed/`)

## Data Integrity Rules

- **Never modify `text_hi`** or chunk boundaries after creation
- Chunk ID format: `AAG_C{chapter:02d}_P{index:03d}` (e.g., `AAG_C01_P001`)
- Each chunk ends with ` |` delimiter (appended by chunker)
- Translation status flow: `pending` → `ai_draft` → `reviewed` → `final`
- Only `text_en` and `translation_status` should ever change after chunking

## Translation Workflow

- Manual AI translation (no APIs, no scripts, no external tools)
- Translate literally — no paraphrasing, no summaries, no explanations
- See `.opencode/AGENTS.md` for the full translation agent spec
- See `.opencode/skills/translate/SKILL.md` for the reusable translate skill

## Website

- `website/AGENTS.md` warns about Next.js 16 breaking changes — read before editing
- Static export (`next.config.ts`: `output: "export"`)
- Tailwind v4 (`@import "tailwindcss"`), dark mode via `.dark` class
- Vercel-deployed (see `website/vercel.json`)
- No tests, no CI, no linter at root; website has eslint config
