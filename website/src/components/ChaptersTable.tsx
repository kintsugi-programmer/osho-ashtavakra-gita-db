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
    } else {
      alert(`Chapter ${chapterNum} - Coming Soon!`);
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
      <div className="text-center py-8 text-stone-400 dark:text-stone-500">
        Loading chapters...
      </div>
    );
  }

  const chapterMap = new Map(chapters.map((ch) => [ch.chapter, ch]));
  const completion = Math.round((chapters.length / 91) * 100);

  return (
    <div className="space-y-6">
      {/* Guided instruction text */}
      <div className="text-center px-4">
        <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base">
          Click any chapter below to read its verses
        </p>
        <p className="text-stone-400 dark:text-stone-500 text-xs mt-1">
          Use ← → arrows or buttons to navigate between lessons
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm px-4">
        <span className="text-stone-500 dark:text-stone-400">{chapters.length} / 91</span>
        <span className="text-stone-300 dark:text-stone-600 hidden sm:inline">•</span>
        <span className="text-amber-600 font-medium">{completion}%</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-stone-500 dark:text-stone-400 text-xs hidden sm:inline">ai_draft</span>
        </span>
      </div>

      {/* Mobile-first responsive grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-10 gap-1 md:gap-2">
        {Array.from({ length: 91 }, (_, i) => i + 1).map((num) => {
          const ch = chapterMap.get(num);
          const exists = !!ch;

          if (!exists) {
            return (
                <button
                  key={num}
                  onClick={() => handleChapterClick(num)}
                  className="py-2 md:py-4 px-1 md:px-2 text-center text-xs text-stone-400 dark:text-stone-500 bg-stone-100/50 dark:bg-stone-800/60 border border-dashed border-stone-300 dark:border-stone-700 rounded md:rounded-lg cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-950/30 hover:border-amber-400 dark:hover:border-amber-700 hover:text-amber-700 dark:hover:text-amber-400 hover:border-double transition-all group"
                >
                  <span className="hidden sm:inline">
                    <span className="block text-[10px] text-stone-400 dark:text-stone-500 group-hover:text-amber-600 dark:group-hover:text-amber-400">Ch. {num}</span>
                    <span className="block text-[9px] mt-0.5 uppercase tracking-wider opacity-60 group-hover:opacity-100">Coming Soon</span>
                  </span>
                <span className="sm:hidden font-medium">Ch. {num}</span>
              </button>
            );
          }

          return (
            <button
              key={num}
              onClick={() => handleChapterClick(num)}
              className="py-2 md:py-4 px-1 md:px-2 text-center text-xs text-white bg-gradient-to-br from-green-500 to-emerald-600 rounded md:rounded-lg shadow-sm hover:shadow-md hover:scale-105 hover:brightness-110 transition-all cursor-pointer group"
            >
              <span className="font-medium">
                <span className="hidden sm:inline">Ch. {num}</span>
                <span className="sm:hidden">Ch. {num}</span>
              </span>
              <div className="text-[10px] md:text-xs opacity-75 mt-0.5 hidden md:block">{ch.chunks} verses</div>
            </button>
          );
        })}
      </div>

      {/* Reading Modal */}
      <ChapterModal
        key={selectedChapter ?? "none"}
        chapterNumber={selectedChapter || 0}
        isOpen={selectedChapter !== null}
        onClose={handleClose}
        onNavigate={handleNavigate}
        chaptersData={chapters}
      />
    </div>
  );
}
