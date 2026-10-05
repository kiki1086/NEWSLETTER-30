import React, { useState, useMemo } from 'react';
import { Trophy, Filter, Search, Medal, Award } from 'lucide-react';
import articlesData from '../data/articles.json';
import { StoryCard } from '../components/StoryCard';
import { StorySlideOver } from '../components/StorySlideOver';
import { Article, NortheastState } from '../types/article';
import { getArticlesByCategory } from '../utils/computedMetrics';

const articles = articlesData as Article[];

export const SportsView: React.FC = () => {
  const [selectedStoryForSlideOver, setSelectedStoryForSlideOver] = useState<Article | null>(null);
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sportsArticles = useMemo(() => getArticlesByCategory(articles, 'Sports & Achievements'), []);

  const filteredArticles = useMemo(() => {
    return sportsArticles.filter((a) => {
      const matchState = selectedState === 'All' || a.states.includes(selectedState as NortheastState);
      const matchQuery =
        searchQuery === '' ||
        a.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.district && a.district.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchState && matchQuery;
    });
  }, [sportsArticles, selectedState, searchQuery]);

  const uniqueStates = useMemo(() => {
    const s = new Set<string>();
    sportsArticles.forEach((a) => a.states.forEach((st) => s.add(st)));
    return ['All', ...Array.from(s).sort()];
  }, [sportsArticles]);

  return (
    <div className="min-h-screen bg-ivory-100 py-8 sm:py-12">
      <StorySlideOver
        article={selectedStoryForSlideOver}
        onClose={() => setSelectedStoryForSlideOver(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Saffron & Gold Athletic Styling */}
        <div className="bg-navy-950 text-ivory-100 rounded-xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-navy-800">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium tracking-wide bg-saffron-600 text-white">
                <Trophy className="w-3.5 h-3.5" />
                SECTION 06 // ATHLETICS & EXCELLENCE
              </span>
              <span className="text-xs font-mono text-sand-300">
                {sportsArticles.length} Verified Field Dispatches
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white mt-1">
              Sports & Achievements
            </h1>

            <p className="text-xs sm:text-sm font-serif text-sand-200 mt-2 max-w-2xl leading-relaxed">
              International athletic triumphs including Maibam Gulubi's gold medal at the Asian Bench Press Championships, alongside grassroots sports diplomacy through the Assam Rifles Sentinels Cup Football, Capt Kengurüse Memorial, and Kohima Inter-School Basketball.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none motif-muga" />
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-lg border border-sand-300 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <span className="text-xs font-mono text-sand-500 uppercase flex items-center gap-1">
              <Filter className="w-3 h-3 text-saffron-600" />
              State:
            </span>
            {uniqueStates.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedState(st)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors whitespace-nowrap ${
                  selectedState === st
                    ? 'bg-saffron-600 text-white font-bold'
                    : 'bg-ivory-200 text-navy-900 hover:bg-sand-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-sand-500 absolute left-2.5 top-3" />
            <input
              type="text"
              placeholder="Search sports & achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs font-sans rounded-md border border-sand-300 bg-ivory-50 focus:bg-white text-navy-900 focus:border-saffron-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mt-6">
          <div className="text-xs font-mono text-sand-500 mb-3">
            Showing {filteredArticles.length} of {sportsArticles.length} verified athletic dispatches
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
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
