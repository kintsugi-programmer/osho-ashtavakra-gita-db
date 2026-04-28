---
name: translate
description: Translate Hindi chunks to English where text_en is null
---

## What I Do

I translate Ashtavakra Gita Hindi discourse text to English in the JSON dataset. I work directly with the model's capabilities - no external tools or APIs.

## When to Use Me

Use this skill when:
- You need to translate `data/processed/chXX.json` files
- `text_en` field is `null` and needs translation
- `translation_status` is `"pending"`

## Chunk Format

Each chunk has this structure:
```json
{
  "id": "AAG_C02_P001",
  "chapter_no": 2,
  "chunk_index": 1,
  "text_hi": "Hindi text with | delimiter",
  "text_en": null,
  "translation_status": "pending",
  "word_count": 300,
  "char_count": 1500
}
```

## Translation Workflow

### Step 1: Find Pending Chunks

```bash
python3 -c "import json; d=json.load(open('data/processed/ch02.json')); print([x['id'] for x in d if x['text_en'] is None])"
```

### Step 2: Translate Each Chunk

For each chunk with `text_en: null`:

1. Read the `text_hi` content
2. Translate to English literally (word-for-word, preserving meaning)
3. Use the edit tool to replace `null` with translation

Example edit:
```
oldString: "text_en": null,
           "translation_status": "pending",

newString: "text_en": "Your literal English translation here.",
           "translation_status": "ai_draft",
```

### Step 3: Validate JSON

Always validate after edits:
```bash
python3 -c "import json; json.load(open('data/processed/ch02.json')); print('Valid JSON')"
```

### Step 4: Check Progress

```bash
python3 -c "import json; d=json.load(open('data/processed/ch02.json')); print(f'Total: {len(d)}, Translated: {sum(1 for x in d if x[\"translation_status\"]==\"ai_draft\")}')"
```

## Rules

### Translation Rules

- Translate literally - preserve exact meaning
- Preserve sentence order exactly  
- Keep repetitions if present in original
- Do NOT add or remove sentences
- Do NOT paraphrase or simplify
- No summaries, no explanations, no comments
- If unsure about a phrase, translate conservatively

### Data Integrity Rules

- Do NOT modify `text_hi` (source Hindi text)
- Do NOT change chunk boundaries
- Do NOT modify `id`, `chapter_no`, `chunk_index`
- Do NOT change word_count or char_count
- Output must remain valid JSON
- Set `translation_status = "ai_draft"` after translation

### What NOT to Use

- ❌ External translation APIs
- ❌ Google Translate or similar
- ❌ Scripts or automation tools
- ❌ Paraphrasing tools

## Common Issues

### JSON Parse Error

If you get `JSONDecodeError: Expecting ',' delimiter`:

- Check for missing commas after `text_en` strings
- Look for extra closing braces `}` or brackets `]`
- Read lines around the error to find the issue

### Chunk Not Saving

- Ensure edit replaces exactly `"text_en": null,`
- Check that translation string is properly quoted
- Verify translation_status is also updated

### Mismatched Chunk Count

- After edits, always verify: `len(d)` matches expected
- ch02.json should have 44 chunks
- If count is wrong, you may have accidentally deleted/duplicated

## Example Translation

### Hindi (text_hi)
```
"text_hi": "पहला प्रश्न: भगवान, कल प्रवचन सुनते समय ऐसा लगा कि मैं इस पृथ्वी पर नहीं हूं, वरन मुक्त और असीम आकाश में एक ज्योति-कण हूं।"
```

### English (text_en)
```
"text_en": "First question: Lord, while listening to yesterday's discourse, it felt as if I am not on this earth, but a particle of light in a free and limitless sky.",
```

## File Paths

- Project root: `/Users/bali-king/git/personal/osho-ashtavakra-gita-db`
- Data location: `data/processed/chXX.json`
- Chapter 2: `data/processed/ch02.json` (44 chunks)
- Chapter 1: `data/processed/ch01.json` (already translated)

## Workflow Summary

1. Load JSON file
2. Identify chunks where `text_en` is `null`
3. Translate each chunk manually
4. Update `text_en` and `translation_status`
5. Validate JSON after each chunk or batch
6. Verify final count matches expected total