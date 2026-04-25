"use client";

import { useEffect, useState, useCallback } from "react";

interface Chunk {
  id: string;
  chapter_no: number;
  chunk_index: number;
  text_hi: string;
  text_en: string;
  translation_status: string;
  word_count: number;
}

interface ChapterModalProps {
  chapterNumber: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (chapter: number) => void;
}

type ViewMode = "both" | "hindi" | "english";

export default function ChapterModal({
  chapterNumber,
  isOpen,
  onClose,
  onNavigate,
}: ChapterModalProps) {
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("both");
  const [activeTab, setActiveTab] = useState<"hindi" | "english">("hindi");

  // Fetch chapter data
  useEffect(() => {
    if (!isOpen || !chapterNumber) return;

    setLoading(true);
    fetch(`/data/ch${chapterNumber.toString().padStart(2, "0")}.json`)
      .then((res) => res.json())
      .then((data) => {
        setChunks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isOpen, chapterNumber]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePrevChapter = useCallback(() => {
    if (chapterNumber > 1) {
      onNavigate(chapterNumber - 1);
    }
  }, [chapterNumber, onNavigate]);

  const handleNextChapter = useCallback(() => {
    if (chapterNumber < 91) {
      onNavigate(chapterNumber + 1);
    }
  }, [chapterNumber, onNavigate]);

  if (!isOpen) return null;

  const totalWords = chunks.reduce((sum, ch) => sum + (ch.word_count || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header - Fixed */}
      <header className="flex-shrink-0 flex items-center justify-between px-3 md:px-4 py-2 md:py-3 bg-white border-b border-stone-200">
        <div className="flex items-center gap-2 md:gap-3">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 md:p-2 -ml-1 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex-shrink-0" />
            <div>
              <h1 className="text-sm md:text-base font-medium text-stone-800">
                Chapter {chapterNumber}
              </h1>
              <p className="text-xs text-stone-500 hidden sm:block">
                {chunks.length} chunks • ~{totalWords} words
              </p>
            </div>
          </div>
        </div>

        {/* View Toggle - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-1 bg-stone-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("both")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              viewMode === "both" ? "bg-white shadow text-stone-800" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Both
          </button>
          <button
            onClick={() => setViewMode("hindi")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              viewMode === "hindi" ? "bg-white shadow text-stone-800" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Hindi
          </button>
          <button
            onClick={() => setViewMode("english")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              viewMode === "english" ? "bg-white shadow text-stone-800" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            English
          </button>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevChapter}
            disabled={chapterNumber <= 1}
            className="p-1.5 md:p-2 hover:bg-stone-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous chapter"
          >
            <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-xs md:text-sm text-stone-500 min-w-[60px] text-center hidden sm:inline">
            {chapterNumber}/91
          </span>
          
          <button
            onClick={handleNextChapter}
            disabled={chapterNumber >= 91}
            className="p-1.5 md:p-2 hover:bg-stone-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next chapter"
          >
            <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Tab Bar - Only visible on mobile */}
      <div className="md:hidden flex-shrink-0 flex border-b border-stone-200 bg-stone-50">
        <button
          onClick={() => { setViewMode("both"); setActiveTab("hindi"); }}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            viewMode === "both"
              ? "text-amber-600 border-b-2 border-amber-500 bg-white"
              : "text-stone-500"
          }`}
        >
          Both
        </button>
        <button
          onClick={() => { setViewMode("hindi"); setActiveTab("hindi"); }}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            viewMode === "hindi"
              ? "text-amber-600 border-b-2 border-amber-500 bg-white"
              : "text-stone-500"
          }`}
        >
          Hindi Only
        </button>
        <button
          onClick={() => { setViewMode("english"); setActiveTab("english"); }}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            viewMode === "english"
              ? "text-amber-600 border-b-2 border-amber-500 bg-white"
              : "text-stone-500"
          }`}
        >
          English Only
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-stone-400">Loading chapter {chapterNumber}...</div>
          </div>
        ) : (
          <div className="p-3 md:p-4 space-y-3 md:space-y-4">
            {/* Hindi Only View */}
            {viewMode === "hindi" && chunks.map((chunk) => (
              <div key={chunk.id} className="bg-stone-50 rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-stone-400">Chunk {chunk.chunk_index}</span>
                  <span className="text-xs text-stone-400">{chunk.word_count} words</span>
                </div>
                <p className="text-base md:text-lg leading-relaxed text-stone-800 font-serif">
                  {chunk.text_hi}
                </p>
              </div>
            ))}

            {/* English Only View */}
            {viewMode === "english" && chunks.map((chunk) => (
              <div key={chunk.id} className="bg-stone-50 rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-stone-400">Chunk {chunk.chunk_index}</span>
                  <span className="text-xs text-stone-400">{chunk.word_count} words</span>
                </div>
                <p className="text-base md:text-lg leading-relaxed text-stone-700">
                  {chunk.text_en}
                </p>
              </div>
            ))}

            {/* Both View - Stack of horizontal pairs */}
            {viewMode === "both" && chunks.map((chunk) => (
              <div key={chunk.id} className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <span className="text-xs font-medium text-amber-600">Chunk {chunk.chunk_index}</span>
                  <span className="text-xs text-stone-300">•</span>
                  <span className="text-xs text-stone-400">{chunk.word_count} words</span>
                </div>
                <div className="grid md:grid-cols-2 gap-2 md:gap-3">
                  <div className="bg-stone-50 rounded-lg p-3 md:p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-sm">📜</span>
                      <span className="text-xs font-medium text-stone-500">Hindi</span>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-stone-800 font-serif">
                      {chunk.text_hi}
                    </p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-3 md:p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-sm">📖</span>
                      <span className="text-xs font-medium text-stone-500">English</span>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-stone-700">
                      {chunk.text_en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}