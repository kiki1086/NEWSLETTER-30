import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Filter, ArrowRight } from 'lucide-react';
import articlesData from '../data/articles.json';
import { StoryCard } from '../components/StoryCard';
import { StorySlideOver } from '../components/StorySlideOver';
import { TimelineScrubber } from '../components/TimelineScrubber';
import { Article } from '../types/article';
import { getStoriesByDateMap, formatISODate } from '../utils/computedMetrics';

const articles = articlesData as Article[];

export const TimelineView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedStoryForSlideOver, setSelectedStoryForSlideOver] = useState<Article | null>(null);

  const dateMap = useMemo(() => getStoriesByDateMap(articles), []);

  const displayedArticles = useMemo(() => {
    if (selectedDate && dateMap.has(selectedDate)) {
      return dateMap.get(selectedDate)!;
    }
    // Return all articles sorted chronologically
    return [...articles].sort(
      (a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
    );
  }, [selectedDate, dateMap]);

  return (
    <div className="min-h-screen bg-ivory-100 py-8 sm:py-12">
      <StorySlideOver
        article={selectedStoryForSlideOver}
        onClose={() => setSelectedStoryForSlideOver(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-sand-300 pb-4 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-saffron-600 text-white">
            <Clock className="w-3.5 h-3.5" />
            CHRONOLOGICAL DOSSIER // 30-DAY WINDOW
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 mt-2">
            The 30-Day Operational Timeline
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-700 mt-1 max-w-2xl">
            A day-by-day verified chronological record from 1 September 2026 to 3 October 2026. Select any date along the scrubber to inspect localized dispatches.
          </p>
        </div>

        {/* 30-Day Interactive Scrubber */}
        <TimelineScrubber
          articles={articles}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Stories Listing */}
        <div className="mt-8">
          <div className="flex items-center justify-between pb-2 mb-4 border-b border-sand-300">
            <h3 className="text-base sm:text-lg font-serif font-bold text-navy-900">
              {selectedDate ? (
                <>
                  Dispatches for <strong>{formatISODate(selectedDate)}</strong> ({displayedArticles.length})
                </>
              ) : (
                <>
                  Full 30-Day Chronological Sequence ({displayedArticles.length} Stories)
                </>
              )}
            </h3>

            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate(null)}
                className="text-xs font-mono text-saffron-700 hover:underline"
              >
                Clear date filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((article) => (
              <StoryCard
                key={article.id}
                article={article}
                onOpenSlideOver={(a) => setSelectedStoryForSlideOver(a)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
