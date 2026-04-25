"use client";

import { useEffect, useState } from "react";

interface Chapter {
  chapter: number;
  chunks: number;
}

export default function ChaptersTable() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/chapters.json")
      .then((res) => res.json())
      .then((data) => {
        setChapters(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-stone-400">
        Loading chapters...
      </div>
    );
  }

  const chapterMap = new Map(chapters.map((ch) => [ch.chapter, ch]));
  const completion = Math.round((chapters.length / 91) * 100);

  const rows: number[][] = [];
  for (let i = 0; i < 91; i += 7) {
    rows.push(Array.from({ length: 7 }, (_, j) => i + j + 1));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4 text-sm">
        <span className="text-stone-500">{chapters.length} / 91 chapters</span>
        <span className="text-stone-300">•</span>
        <span className="text-amber-600 font-medium">{completion}% complete</span>
        <span className="ml-4 inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-stone-500 text-xs">ai_draft</span>
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 91 }, (_, i) => i + 1).map((num) => {
          const ch = chapterMap.get(num);
          const exists = !!ch;

          if (!exists) {
            return (
              <div
                key={num}
                className="py-4 px-2 text-center text-xs text-stone-300 bg-stone-100 rounded-lg"
              >
                Chapter {num}
              </div>
            );
          }

          return (
            <div
              key={num}
              className="py-4 px-2 text-center text-xs text-white bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="font-medium">Chapter {num}</span>
              <div className="text-[10px] opacity-75 mt-0.5">{ch.chunks} chunks</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}