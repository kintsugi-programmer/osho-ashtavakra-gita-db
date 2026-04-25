---
name: translate
description: Translate Hindi chunks to English where text_en is null
---

## Rules

- Translate all chunks where text_en is null.
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
