import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Newspaper, Layers, Calendar } from 'lucide-react';
import articlesData from '../data/articles.json';
import sourcesData from '../data/sources.json';
import { getTotalStories, getTotalSources, getCategoryCounts, getStateStoryCounts } from '../utils/computedMetrics';
import { Article } from '../types/article';
import { SourceItem } from '../types/source';
const articles = articlesData as Article[];
const sources = sourcesData as SourceItem[];

export const Masthead: React.FC = () => {
  const totalStories = getTotalStories(articles);
  const totalSources = getTotalSources(sources);
  const stateCounts = getStateStoryCounts(articles);
  const categoryCounts = getCategoryCounts(articles);
  const activeStatesCount = Object.keys(stateCounts).filter(k => k !== 'Regional' && stateCounts[k as keyof typeof stateCounts] > 0).length;
  const activeSectionsCount = Object.keys(categoryCounts).length;

  return (
    <header className="border-b border-sand-300 bg-ivory-50 relative z-10 shadow-xs" role="banner">
      {/* Top Heritage Ribbon with Angami & Muga pattern motif */}
      <div className="h-1.5 w-full motif-angami-band" aria-hidden="true" />

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Editorial Title */}
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono tracking-wider bg-navy-900 text-ivory-100 uppercase">
                Issue 01 // Sep–Oct 2026
              </span>
              <span className="text-xs font-mono text-sand-500 tracking-wider">
                Published 04 Oct 2026 · Vol. 01
              </span>
            </div>
            
            <Link to="/" className="group inline-block mt-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-navy-900 tracking-tight flex items-baseline gap-2">
                <span>NORTHEAST</span>
                <span className="text-saffron-600 font-sans font-light text-2xl sm:text-3xl">//</span>
                <span className="text-saffron-600">30</span>
              </h1>
            </Link>

            <p className="text-xs sm:text-sm font-serif italic text-forest-800 mt-1 max-w-xl">
              "Securing the Northeast: Indian Army's Role in Stability, Peace & National Security"
            </p>
          </div>

          {/* Dynamic Computed Metrics Bar (Zero hardcoding) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white p-2.5 sm:p-3 rounded-lg border border-sand-300 shadow-xs self-start md:self-auto">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-ivory-200">
              <Calendar className="w-3.5 h-3.5 text-saffron-600" />
              <span className="text-xs font-mono font-medium text-navy-900">30 Days Window</span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-ivory-200">
              <MapPin className="w-3.5 h-3.5 text-forest-700" />
              <span className="text-xs font-mono font-medium text-navy-900">
                <strong className="text-forest-700 font-bold">{activeStatesCount}</strong> States
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-ivory-200">
              <Shield className="w-3.5 h-3.5 text-navy-700" />
              <span className="text-xs font-mono font-medium text-navy-900">
                <strong className="text-navy-900 font-bold">{totalStories}</strong> Stories
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-ivory-200">
              <Newspaper className="w-3.5 h-3.5 text-sand-500" />
              <span className="text-xs font-mono font-medium text-navy-900">
                <strong className="text-saffron-700 font-bold">{totalSources}</strong> Sources
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded bg-ivory-200">
              <Layers className="w-3.5 h-3.5 text-forest-700" />
              <span className="text-xs font-mono font-medium text-navy-900">
                <strong className="text-forest-700 font-bold">{activeSectionsCount}</strong> Sections
              </span>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
