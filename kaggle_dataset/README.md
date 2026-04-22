# Osho Ashtavakra Gita Dataset (Hindi + English)

## Overview
This dataset contains structured discourse text from Osho’s Ashtavakra Gita.

It is processed into ~300-word sentence-safe chunks for AI/NLP use.

## Structure

Each JSON file contains:

- Hindi text (text_hi)
- English translation (text_en)
- Chunk metadata

Example:

{
  "id": "AAG_C01_P001",
  "chapter_no": 1,
  "chunk_index": 1,
  "text_hi": "...",
  "text_en": "...",
  "translation_status": "ai_draft",
  "word_count": 300
}

## Use Cases

- Semantic search
- RAG pipelines
- NLP research
- Philosophical analysis

## Notes

- Translations are AI-generated
- Chunking is sentence-safe

## Source

https://oshoworld.com/maha-geeta-by-osho-01-91