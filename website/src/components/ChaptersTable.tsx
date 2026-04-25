"use client";

import { useEffect, useState } from "react";
import ChapterModal from "./ChapterModal";

interface Chapter {
  chapter: number;
  chunks: number;
}

export default function ChaptersTable() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  useEffect(() => {
    fetch("/data/chapters.json")
      .then((res) => res.json())
      .then((data) => {
        setChapters(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChapterClick = (chapterNum: number) => {
    const ch = chapterMap.get(chapterNum);
    if (ch) {
      setSelectedChapter(chapterNum);
    }
  };

  const handleClose = () => {
    setSelectedChapter(null);
  };

  const handleNavigate = (chapterNum: number) => {
    setSelectedChapter(chapterNum);
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-stone-400">
        Loading chapters...
      </div>
    );
  }

  const chapterMap = new Map(chapters.map((ch) => [ch.chapter, ch]));
  const completion = Math.round((chapters.length / 91) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm px-4">
        <span className="text-stone-500">{chapters.length} / 91</span>
        <span className="text-stone-300 hidden sm:inline">•</span>
        <span className="text-amber-600 font-medium">{completion}%</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-stone-500 text-xs hidden sm:inline">ai_draft</span>
        </span>
      </div>

      {/* Mobile-first responsive grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-10 gap-1 md:gap-2">
        {Array.from({ length: 91 }, (_, i) => i + 1).map((num) => {
          const ch = chapterMap.get(num);
          const exists = !!ch;

          if (!exists) {
            return (
              <div
                key={num}
                className="py-2 md:py-4 px-1 md:px-2 text-center text-xs text-stone-300 bg-stone-100 rounded md:rounded-lg"
              >
                <span className="hidden sm:inline">Ch. {num}</span>
                <span className="sm:hidden">{num}</span>
              </div>
            );
          }

          return (
            <button
              key={num}
              onClick={() => handleChapterClick(num)}
              className="py-2 md:py-4 px-1 md:px-2 text-center text-xs text-white bg-gradient-to-br from-green-500 to-emerald-600 rounded md:rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <span className="font-medium">
                <span className="hidden sm:inline">Chapter </span>
                <span className="sm:hidden">{num}</span>
              </span>
              <div className="text-[10px] md:text-xs opacity-75 mt-0.5 hidden md:block">{ch.chunks}</div>
            </button>
          );
        })}
      </div>

      {/* Reading Modal */}
      <ChapterModal
        chapterNumber={selectedChapter || 0}
        isOpen={selectedChapter !== null}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </div>
  );
}