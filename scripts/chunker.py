import re
import json
import argparse
from pathlib import Path

RAW_DIR = Path("data/raw")
OUT_DIR = Path("data/processed")

CHUNK_SIZE = 300
HARD_LIMIT = 600

SENTENCE_ENDS = ("।", "!", "?", "॥")


# ─────────────────────────────────────────────
# CLEAN TEXT
# ─────────────────────────────────────────────

def normalize(text: str) -> str:
    text = text.replace("\n", " ")
    text = text.replace("...", "…")
    text = text.replace("।।", "।")
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


# ─────────────────────────────────────────────
# SENTENCE CHECK
# ─────────────────────────────────────────────

def is_sentence_end(word: str) -> bool:
    return word.rstrip('”"’\'').endswith(SENTENCE_ENDS)


# ─────────────────────────────────────────────
# CHUNKING CORE
# ─────────────────────────────────────────────

def chunk_text(text: str, chapter_no: int):
    words = text.split()
    chunks = []

    i = 0
    idx = 1
    n = len(words)

    while i < n:
        j = min(i + CHUNK_SIZE, n - 1)

        # extend to sentence boundary
        while j < n - 1 and not is_sentence_end(words[j]):
            j += 1
            if (j - i) >= HARD_LIMIT:
                break

        chunk_words = words[i:j + 1]
        i = j + 1

        chunk_text = " ".join(chunk_words)

        chunks.append({
            "id": f"AAG_C{chapter_no:02d}_P{idx:03d}",
            "chapter_no": chapter_no,
            "chunk_index": idx,
            "text_hi": chunk_text + " |",
            "text_en": None,
            "translation_status": "pending",
            "word_count": len(chunk_words),
            "char_count": len(chunk_text),
        })

        idx += 1

    return chunks


# ─────────────────────────────────────────────
# MERGE WITH EXISTING (SAFE MODE)
# ─────────────────────────────────────────────

def merge_chunks(existing, new_chunks):
    existing_map = {c["id"]: c for c in existing}
    merged = []
    has_changes = False

    for chunk in new_chunks:
        cid = chunk["id"]

        if cid in existing_map:
            old = existing_map[cid]
            old_text_en = old.get("text_en")
            old_status = old.get("translation_status", "pending")

            # Check if we need to preserve (don't overwrite if already translated)
            if old_text_en is not None:
                chunk["text_en"] = old_text_en
                chunk["translation_status"] = old_status
                has_changes = True
            else:
                chunk["text_en"] = old_text_en
                chunk["translation_status"] = old_status

        merged.append(chunk)

    return merged, has_changes


# ─────────────────────────────────────────────
# PROCESS ONE FILE
# ─────────────────────────────────────────────

def process_chapter(chapter_no: int, force=False):
    file_path = RAW_DIR / f"ch{chapter_no:02d}.txt"

    if not file_path.exists():
        print(f"✗ Missing: {file_path}")
        return None

    print(f"📖 ch{chapter_no:02d}.txt →", end=" ")

    raw = file_path.read_text(encoding="utf-8")
    text = normalize(raw)

    new_chunks = chunk_text(text, chapter_no)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_file = OUT_DIR / f"ch{chapter_no:02d}.json"

    if out_file.exists() and not force:
        existing = json.loads(out_file.read_text(encoding="utf-8"))
        chunks, has_changes = merge_chunks(existing, new_chunks)
        mode = "merged"
        
        if not has_changes:
            print(f"{len(new_chunks)} chunks | {sum(c['word_count'] for c in new_chunks)} words | unchanged")
            return {"chapter": chapter_no, "chunks": len(new_chunks), "words": sum(c['word_count'] for c in new_chunks)}
    else:
        chunks = new_chunks
        mode = "overwritten" if force else "new"
        has_changes = True

    out_file.write_text(
        json.dumps(chunks, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    total_words = sum(c["word_count"] for c in chunks)

    print(f"{len(chunks)} chunks | {total_words} words | {mode}")

    return {
        "chapter": chapter_no,
        "chunks": len(chunks),
        "words": total_words
    }


# ─────────────────────────────────────────────
# PROCESS ALL
# ─────────────────────────────────────────────

def process_all(force=False):
    files = sorted(RAW_DIR.glob("ch*.txt"))

    if not files:
        print("No files found in data/raw/")
        return

    summary = []

    for f in files:
        m = re.search(r'ch(\d+)', f.stem)
        if m:
            result = process_chapter(int(m.group(1)), force=force)
            if result:
                summary.append(result)

    total_chunks = sum(s["chunks"] for s in summary)
    total_words = sum(s["words"] for s in summary)

    print("\n✅ DONE")
    print(f"{len(summary)} chapters | {total_chunks} chunks | {total_words} words")


# ─────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--chapter", type=int)
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--force", action="store_true", help="overwrite existing JSON")
    args = ap.parse_args()

    if args.chapter:
        process_chapter(args.chapter, force=args.force)
    elif args.all:
        process_all(force=args.force)
    else:
        ap.print_help()