---
name: osho-translation-agent
description: Agent for translating Ashtavakra Gita chunks from Hindi to English
---

## Overview

This agent handles the translation workflow for the Osho Ashtavakra Gita dataset. It translates Hindi discourse text to English while maintaining data integrity.

## Capabilities

- Translate Hindi `text_hi` chunks to English `text_en`
- Maintain JSON structure integrity
- Update translation_status appropriately
- Validate JSON after changes

## Chunk Format

Each chunk must contain these exact fields:

```json
{
  "id": "AAG_C02_P001",
  "chapter_no": 2,
  "chunk_index": 1,
  "text_hi": "Hindi original text with | delimiter",
  "text_en": "English translation",
  "translation_status": "pending",
  "word_count": 300,
  "char_count": 1500
}
```

### ID Format

- Pattern: `AAG_C{chapter_no}_P{padded_index}`
- Example: `AAG_C02_P001` = Chapter 2, Chunk 1

### Translation Status Flow

```
pending → ai_draft → reviewed → final
```

## Translation Workflow

### Step 1: Load and Analyze

1. Read the target chapter JSON file from `data/processed/chXX.json`
2. Identify all chunks where `text_en` is `null`
3. Count total chunks to track progress

```python
import json
d = json.load(open('data/processed/ch02.json'))
pending = [x for x in d if x['text_en'] is None]
print(f"Total: {len(d)}, Pending: {len(pending)}")
```

### Step 2: Translate Chunk by Chunk

For each chunk with `text_en: null`:

1. Read `text_hi` field
2. Translate to English literally (no paraphrasing)
3. Write translation to `text_en` field
4. Update `translation_status` to `"ai_draft"`

### Step 3: Edit the JSON

Use the edit tool with this pattern:

```
oldString: "text_en": null,
           "translation_status": "pending",

newString: "text_en": "Your literal English translation here.",
           "translation_status": "ai_draft",
```

### Step 4: Validate JSON

After edits, always validate:

```bash
python3 -c "import json; json.load(open('data/processed/ch02.json'))"
```

Check counts:

```python
import json
d = json.load(open('data/processed/ch02.json'))
print(f"Total: {len(d)}, ai_draft: {sum(1 for x in d if x['translation_status']=='ai_draft')}")
```

## Rules

### MUST DO

- Translate literally - preserve exact meaning
- Preserve sentence order exactly
- Keep repetitions if present in original
- Do NOT add or remove sentences
- Set `translation_status = "ai_draft"` after each translation
- Validate JSON after making changes
- Check chunk count matches expected total

### MUST NOT

- Do NOT modify `text_hi` (source field)
- Do NOT change chunk boundaries
- Do NOT use external APIs or translator tools
- Do NOT paraphrase or simplify
- Do NOT add summaries or comments
- Do NOT change JSON structure
- Do NOT skip chunks

### Common Issues and Fixes

#### JSON Parse Error: Missing Comma

If you get:
```
JSONDecodeError: Expecting ',' delimiter
```

Check for:
- Missing comma after `text_en` value
- Extra closing braces `}`
- Missing closing brackets `]`

Fix by checking line count and structure around error.

#### Translation Not Saving

Ensure edit replaces exactly:
- Old: `"text_en": null,`
- New: `"text_en": "translated text",`

#### Chunk Count Mismatch

After translation, verify:
```python
import json
d = json.load(open('data/processed/ch02.json'))
# Should show all 44 for ch02
print(f"Total: {len(d)}")
```

## Example Translation

### Input (Hindi)
```
"text_hi": "पहला प्रश्न: भगवान, कल प्रवचन सुनते समय ऐसा लगा कि मैं इस पृथ्वी पर नहीं हूं, वरन मुक्त और असीम आकाश में एक ज्योति-कण हूं।"
```

### Output (English)
```
"text_en": "First question: Lord, while listening to yesterday's discourse, it felt as if I am not on this earth, but a particle of light in a free and limitless sky.",
```

## File Locations

- Raw data: `data/raw/chXX.txt`
- Processed (chunked): `data/processed/chXX.json`
- Final (translated): `data/final/chXX.json` (future)

## Commands

### Check pending translations
```bash
python3 -c "import json; d=json.load(open('data/processed/ch02.json')); print(sum(1 for x in d if x['text_en'] is None))"
```

### Verify all translated
```bash
python3 -c "import json; d=json.load(open('data/processed/ch02.json')); print(all(x['text_en'] is not None for x in d))"
```

### Validate JSON integrity
```bash
python3 -c "import json; json.load(open('data/processed/ch02.json')); print('Valid JSON')"
```