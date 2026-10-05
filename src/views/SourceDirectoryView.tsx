import React, { useState, useMemo } from 'react';
import { BookOpen, ExternalLink, CheckCircle2, ShieldCheck, Filter, Search, AlertCircle } from 'lucide-react';
import sourcesData from '../data/sources.json';
import articlesData from '../data/articles.json';
import { SourceItem } from '../types/source';
import { Article } from '../types/article';
import { getSourceFrequencyMap, getTotalSources } from '../utils/computedMetrics';

const sources = sourcesData as SourceItem[];
const articles = articlesData as Article[];

export const SourceDirectoryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const freqMap = useMemo(() => getSourceFrequencyMap(articles), []);
  const totalSources = getTotalSources(sources);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    sources.forEach((s) => cats.add(s.category));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  const filteredSources = useMemo(() => {
    return sources.filter((s) => {
      const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-ivory-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-sand-300 pb-4 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-forest-800 text-white">
            <BookOpen className="w-3.5 h-3.5 text-saffron-400" />
            APPENDIX 01 // ACCREDITED SOURCE DIRECTORY
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 mt-2">
            Interactive Source Directory
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-700 mt-1 max-w-2xl">
            A comprehensive index of all {totalSources} accredited news publications and official gazettes referenced in this issue. Story frequencies are dynamically computed from verified dispatches.
          </p>
        </div>

        {/* Audit Disclaimer Banner */}
        <div className="bg-white p-4 rounded-xl border-l-4 border-l-forest-700 border border-sand-300 shadow-xs mb-6 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2 font-mono font-bold text-forest-800 mb-1">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            DISQUALIFICATION & VERIFICATION AUDIT PASSED
          </div>
          <p>
            In strict compliance with our verification protocols, unaccredited aggregator blogs (such as SSBCrack), out-of-window flood reports from July 2026, general shooting schedules outside the region, static Wikipedia entries, and polemical opinion blogs were <strong>strictly audited and removed</strong>. Full details are documented in <code className="bg-sand-200 px-1 py-0.5 rounded">/reports/dossier-corrections.md</code>.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-lg border border-sand-300 shadow-xs mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <span className="text-xs font-mono text-sand-500 uppercase flex items-center gap-1">
              <Filter className="w-3 h-3 text-navy-800" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-navy-900 text-white font-bold'
                    : 'bg-ivory-200 text-navy-900 hover:bg-sand-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-sand-500 absolute left-2.5 top-3" />
            <input
              type="text"
              placeholder="Search sources by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs font-sans rounded-md border border-sand-300 bg-ivory-50 focus:bg-white text-navy-900 focus:border-navy-900 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSources.map((source) => {
            const count = freqMap.get(source.name) || 0;

            return (
              <div
                key={source.id}
                className="bg-white rounded-lg border border-sand-300 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-ivory-200 text-navy-900 border border-sand-300">
                      {source.category}
                    </span>

                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-saffron-100 text-saffron-800 border border-saffron-300">
                      {count} {count === 1 ? 'Dispatch' : 'Dispatches'}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-navy-900 mt-2.5">
                    {source.name}
                  </h3>

                  <p className="text-xs font-mono text-sand-500 mt-0.5">
                    {source.domain} · {source.location}
                  </p>

                  <p className="text-xs text-slate-700 mt-2.5 leading-relaxed font-sans">
                    {source.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-navy-900 hover:text-saffron-700 transition-colors"
                  >
                    <span>Visit Publisher Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-sand-500" />
                  </a>

                  <span className="text-[11px] font-mono text-forest-700 font-medium">
                    Verified Desk
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
