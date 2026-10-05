import React from 'react';
import { Shield, BookOpen, MapPin, CheckCircle, ExternalLink } from 'lucide-react';
import articlesData from '../data/articles.json';
import sourcesData from '../data/sources.json';
import { getTotalStories, getTotalSources } from '../utils/computedMetrics';
import { Link } from 'react-router-dom';
import { Article } from '../types/article';
import { SourceItem } from '../types/source';
import { SteamingTeaCompanion } from './NortheastCulturalDetailing';

const articles = articlesData as Article[];
const sources = sourcesData as SourceItem[];

export const Footer: React.FC = () => {
  const totalStories = getTotalStories(articles);
  const totalSources = getTotalSources(sources);

  return (
    <footer className="border-t border-sand-300 bg-ivory-200 text-navy-950 mt-16" role="contentinfo">
      {/* Decorative Angami-inspired band */}
      <div className="h-1.5 w-full motif-angami-band" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-display font-extrabold text-navy-900 tracking-tight">
              NORTHEAST <span className="text-saffron-600 font-sans font-light">//</span> 30
            </h2>
            <p className="text-xs font-mono text-sand-500 mt-1 uppercase tracking-wider">
              "30 Days · 8 States · 50 Stories · One Region"
            </p>
            <p className="text-sm font-serif text-slate-700 mt-3 leading-relaxed max-w-md">
              A dignified, factual, and youthful editorial journal documenting the Indian Army and Assam Rifles in stability, peace, and national security across Northeast India. Formulated on strictly verifiable news dispatches published between 1 September and 3 October 2026.
            </p>

            <div className="flex items-center gap-3 mt-4 text-xs font-mono text-sand-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-forest-700" />
                {totalStories} Verified Stories
              </span>
              <span>·</span>
              <span>{totalSources} Accredited Sources</span>
              <span>·</span>
              <span>8 States</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono">
              <Link to="/appendices?tab=sources" className="text-forest-800 hover:text-navy-950 font-semibold hover:underline">
                Appendix 1: Sources & Story Counts →
              </Link>
              <span className="text-sand-400">·</span>
              <Link to="/appendices?tab=rationale" className="text-saffron-700 hover:text-saffron-900 font-semibold hover:underline">
                Appendix 2: Selection Reasoning Register →
              </Link>
            </div>
          </div>

          {/* Cartographic & Boundary Governance */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-navy-900 font-bold mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-forest-700" />
              Boundary Governance
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              All regional cartography adheres to official Survey of India boundary depictions via open-source repositories (DataMeet). The entire territory of Arunachal Pradesh and Sikkim is depicted as sovereign Indian territory.
            </p>
            <p className="text-[11px] font-mono text-saffron-700 mt-2 font-medium">
              [FLAGGED FOR MANUAL CHECK]
            </p>
          </div>

          {/* Standards & Transparency */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-navy-900 font-bold mb-3 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-navy-800" />
              Editorial Integrity
            </h3>
            <ul className="text-xs text-slate-700 space-y-1.5 font-sans">
              <li>✓ Paraphrased journalism (Zero copied text)</li>
              <li>✓ Strict quote limit (≤ 15 words)</li>
              <li>✓ Neutral statutory notification presentation</li>
              <li>✓ Zero speculative military threat claims</li>
              <li>✓ WCAG AA Contrast & Full Keyboard Access</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-sand-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-sand-500">
          <div>
            NORTHEAST // 30 · Issue 01 (September–October 2026) · Editorial Intelligence Project
          </div>
          <div className="flex items-center gap-4">
            <SteamingTeaCompanion />
            <a href="#root" className="hover:text-navy-900 transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
