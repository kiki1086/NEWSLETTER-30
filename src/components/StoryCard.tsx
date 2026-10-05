import React, { useState } from 'react';
import { ExternalLink, Calendar, MapPin, HelpCircle, Shield, Compass, BookOpen, Building2, Users2, Trophy, Play } from 'lucide-react';
import { Article, SectionCategory } from '../types/article';
import { formatISODate } from '../utils/computedMetrics';
import { ThematicGraphic } from './ThematicGraphic';

interface StoryCardProps {
  article: Article;
  onOpenSlideOver: (article: Article) => void;
  className?: string;
}

const CATEGORY_STYLES: Record<SectionCategory, { border: string; badge: string; icon: React.ComponentType<{ className?: string }> }> = {
  'Security Pulse': {
    border: 'border-t-4 border-t-navy-900',
    badge: 'bg-navy-900 text-ivory-100',
    icon: Shield
  },
  'Frontier View': {
    border: 'border-t-4 border-t-forest-700',
    badge: 'bg-forest-800 text-ivory-100',
    icon: Compass
  },
  'Regional Currents': {
    border: 'border-t-4 border-t-sand-400',
    badge: 'bg-navy-700 text-ivory-100',
    icon: BookOpen
  },
  'Development & Infrastructure': {
    border: 'border-t-4 border-t-forest-900',
    badge: 'bg-forest-900 text-ivory-100',
    icon: Building2
  },
  'Society & Youth': {
    border: 'border-t-4 border-t-saffron-600',
    badge: 'bg-saffron-600 text-ivory-100',
    icon: Users2
  },
  'Sports & Achievements': {
    border: 'border-t-4 border-t-saffron-500',
    badge: 'bg-saffron-700 text-ivory-100',
    icon: Trophy
  }
};

const STATE_MASCOT_EMOJI: Record<string, string> = {
  'Assam': '🦏',
  'Nagaland': '🦤',
  'Manipur': '🦌',
  'Meghalaya': '🐆',
  'Mizoram': '🐵',
  'Arunachal Pradesh': '🐂',
  'Sikkim': '🐾',
  'Tripura': '🐒',
  'Regional': '🇮🇳'
};

export const StoryCard: React.FC<StoryCardProps> = ({ article, onOpenSlideOver, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const catStyle = CATEGORY_STYLES[article.category] || CATEGORY_STYLES['Security Pulse'];
  const CategoryIcon = catStyle.icon;

  return (
    <article
      className={`bg-white rounded-lg border border-sand-300 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group ${catStyle.border} ${className}`}
    >
      <div>
        {/* Media Header: Authentic Source Image or Thematic Vector Fallback */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-sand-200">
          {!imageError && article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.headline}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ThematicGraphic
              category={article.category}
              title={article.headline}
              sourceName={article.sourceName}
              className="w-full h-full"
            />
          )}

          {/* Video Dispatch Badge */}
          {article.videoUrl && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600 text-white font-mono text-[11px] font-bold shadow-md tracking-wider">
                <Play className="w-3 h-3 fill-current animate-pulse" />
                VIDEO DISPATCH
              </span>
            </div>
          )}

          {/* Source Photo Credit Overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950/85 via-navy-950/50 to-transparent p-2.5 pt-6 flex items-center justify-between text-[11px] font-mono text-ivory-100 pointer-events-none">
            <span className="truncate pr-2" title={`Credit: ${article.imageCredit}`}>
              📷 {article.imageCredit || article.sourceName}
            </span>
            <span className="shrink-0 text-[10px] text-sand-300 font-sans">
              {article.sourceName}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Magazine Folio Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap mb-2.5 pb-2 border-b border-sand-200">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide ${catStyle.badge}`}>
              <CategoryIcon className="w-3 h-3 text-saffron-300" />
              {article.category}
            </span>

            <div className="flex items-center gap-2 text-[11px] font-mono text-sand-500">
              <span className="font-bold text-navy-900 bg-sand-200 px-1.5 py-0.5 rounded">
                PAGE #{article.id.replace('ne30-', '')}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-saffron-600" />
                {formatISODate(article.publishedDate)}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h3 className="text-base sm:text-lg font-serif font-bold text-navy-900 leading-snug group-hover:text-saffron-700 transition-colors">
            {article.headline}
          </h3>

          {/* States & District Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            {article.states.map((st) => (
              <span
                key={st}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-ivory-200 text-navy-800 border border-sand-300"
              >
                <span className="text-xs">{STATE_MASCOT_EMOJI[st] || '📍'}</span>
                <span>{st}</span>
              </span>
            ))}
            {article.district && (
              <span className="text-xs font-mono text-sand-500">
                · {article.district}
              </span>
            )}
          </div>

          {/* Paraphrased Summary with Magazine Drop Cap */}
          <p className="drop-cap text-xs sm:text-sm text-slate-800 mt-3 leading-relaxed font-sans">
            {article.summary}
          </p>

          {article.quote && (
            <div className="mt-3.5 bg-ivory-200 border-l-4 border-l-saffron-600 pl-3 py-1.5 pr-2 rounded-r text-[11px] sm:text-xs font-serif italic text-navy-950 shadow-2xs">
              "{article.quote}"
            </div>
          )}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 sm:p-5 pt-0 mt-3 border-t border-sand-200 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenSlideOver(article)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium text-navy-900 bg-sand-200 hover:bg-sand-300 transition-colors"
          aria-label={`Open editorial rationale and media for ${article.headline}`}
        >
          {article.videoUrl ? (
            <>
              <Play className="w-3.5 h-3.5 text-red-600 fill-current" />
              <span>Story & Video</span>
            </>
          ) : (
            <>
              <HelpCircle className="w-3.5 h-3.5 text-saffron-600" />
              <span>Why This Story?</span>
            </>
          )}
        </button>

        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-navy-800 hover:text-saffron-600 transition-colors"
          title={`Read original article on ${article.sourceName}`}
        >
          <span>{article.sourceName}</span>
          <ExternalLink className="w-3 h-3 text-sand-500" />
        </a>
      </div>
    </article>
  );
};
