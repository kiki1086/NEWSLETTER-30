import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  ExternalLink,
  MapPin,
  Calendar,
  Shield,
  Compass,
  BookOpen,
  Building2,
  Users2,
  Trophy,
  HelpCircle,
  Sparkles,
  Layers,
  CheckCircle2,
  Quote
} from 'lucide-react';
import { Article, NortheastState, SectionCategory } from '../types/article';
import { formatISODate } from '../utils/computedMetrics';
import { ThematicGraphic } from './ThematicGraphic';
import { CulturalPostmark } from './NortheastCulturalDetailing';

interface MagazineAlbumShowcaseProps {
  articles: Article[];
  onOpenSlideOver: (article: Article) => void;
  initialArticleId?: string;
}

// Cultural motifs and state heritage descriptions
const STATE_HERITAGE: Record<string, { tag: string; motif: string; accent: string }> = {
  'Arunachal Pradesh': {
    tag: 'Land of Dawn-Lit Mountains · Himalayan Sentinels',
    motif: 'Wancho Diamond & Alpine Ridge',
    accent: 'border-l-4 border-l-forest-700'
  },
  'Assam': {
    tag: 'Brahmaputra Heartlands · Golden Muga Weave',
    motif: 'Muga Silk Geometric Brocade',
    accent: 'border-l-4 border-l-saffron-600'
  },
  'Manipur': {
    tag: 'Jeweled Land of Valor · Kangla Heritage',
    motif: 'Moirang Phee & Temple Border',
    accent: 'border-l-4 border-l-navy-900'
  },
  'Meghalaya': {
    tag: 'Abode of Clouds · Laitkor & Khasi Bastion',
    motif: 'Ryndia Organic Silk Weave',
    accent: 'border-l-4 border-l-forest-800'
  },
  'Mizoram': {
    tag: 'Blue Mountains · Vigilant Southern Frontier',
    motif: 'Puanchei Ceremonial Chevron',
    accent: 'border-l-4 border-l-saffron-700'
  },
  'Nagaland': {
    tag: 'Land of Warriors · Sentinels of the Hills',
    motif: 'Angami & Ao Warrior Shawl',
    accent: 'border-l-4 border-l-navy-950'
  },
  'Sikkim': {
    tag: 'Himalayan Citadel · Kangchenjunga Bulwark',
    motif: 'Lepcha Sacred Mountain Weave',
    accent: 'border-l-4 border-l-forest-900'
  },
  'Tripura': {
    tag: 'Ancient Royal March · Gomati River Valleys',
    motif: 'Risa & Rikutu Indigenous Handloom',
    accent: 'border-l-4 border-l-saffron-600'
  }
};

const CATEGORY_ICONS: Record<SectionCategory, React.ComponentType<{ className?: string }>> = {
  'Security Pulse': Shield,
  'Frontier View': Compass,
  'Regional Currents': BookOpen,
  'Development & Infrastructure': Building2,
  'Society & Youth': Users2,
  'Sports & Achievements': Trophy
};

export const MagazineAlbumShowcase: React.FC<MagazineAlbumShowcaseProps> = ({
  articles,
  onOpenSlideOver,
  initialArticleId
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialArticleId) {
      const idx = articles.findIndex((a) => a.id === initialArticleId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const [direction, setDirection] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('All');
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const filmstripRef = useRef<HTMLDivElement>(null);

  // Filter articles if a state filter is selected
  const activeArticles = useMemo(() => {
    if (selectedStateFilter === 'All') return articles;
    return articles.filter((a) => a.states.includes(selectedStateFilter as NortheastState));
  }, [articles, selectedStateFilter]);

  // Ensure current index is within bounds of active list
  const currentArticle = activeArticles[currentIndex] || activeArticles[0] || articles[0];

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % activeArticles.length);
    }, 8500);

    return () => clearInterval(timer);
  }, [isPlaying, activeArticles.length]);

  // Scroll active thumbnail into view in filmstrip
  useEffect(() => {
    if (!filmstripRef.current) return;
    const activeEl = filmstripRef.current.children[currentIndex] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentIndex]);

  // Keyboard navigation (Left / Right / Space for Play/Pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticles.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeArticles.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + activeArticles.length) % activeArticles.length);
  };

  const primaryState = currentArticle.states[0] || 'Nagaland';
  const heritage = STATE_HERITAGE[primaryState] || STATE_HERITAGE['Assam'];
  const CategoryIcon = CATEGORY_ICONS[currentArticle.category] || Shield;

  // Extract YouTube ID if video is present
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };
  const ytId = getYouTubeId(currentArticle.videoUrl);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <div className="relative w-full bg-sand-100 rounded-2xl border border-sand-300 shadow-xl overflow-hidden flex flex-col justify-between">
      
      {/* Patriotic Tricolor Subtle Header Bar */}
      <div className="tricolor-ribbon" aria-hidden="true" />

      {/* Top Album Controls Bar */}
      <div className="p-3 sm:p-4 bg-white border-b border-sand-300 flex flex-wrap items-center justify-between gap-3">
        {/* Album Folio & Counter */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-950 text-ivory-100 font-mono text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
            PRESENTATION ALBUM // ISSUE 01
          </span>
          <span className="font-mono text-xs text-navy-900 font-bold bg-ivory-200 px-2 py-1 rounded border border-sand-300">
            SLIDE {currentIndex + 1} OF {activeArticles.length}
          </span>
        </div>

        {/* State Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {['All', 'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => {
                setSelectedStateFilter(st);
                setCurrentIndex(0);
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors whitespace-nowrap ${
                selectedStateFilter === st
                  ? 'bg-forest-800 text-white font-bold'
                  : 'bg-sand-200 text-navy-900 hover:bg-sand-300'
              }`}
            >
              {st === 'All' ? 'All 8 States' : st.replace(' Pradesh', '')}
            </button>
          ))}
        </div>

        {/* Autoplay & Navigation Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all shadow-2xs ${
              isPlaying
                ? 'bg-saffron-600 text-white animate-pulse'
                : 'bg-ivory-200 text-navy-900 hover:bg-sand-200'
            }`}
            title={isPlaying ? 'Pause auto-play slideshow' : 'Start auto-play presentation slideshow'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY ALBUM</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 rounded-md bg-ivory-200 hover:bg-sand-300 text-navy-900 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 rounded-md bg-navy-900 hover:bg-navy-800 text-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar for Autoplay */}
      {isPlaying && (
        <motion.div
          key={currentIndex}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 8.5, ease: 'linear' }}
          className="h-1 bg-saffron-500 w-full"
        />
      )}

      {/* Main Presentation Stage: Double-Page Magazine Spread */}
      <div className="relative min-h-[520px] lg:min-h-[560px] p-4 sm:p-6 lg:p-8 bg-ivory-100 overflow-hidden flex items-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentArticle.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
          >
            {/* ============================================================== */}
            {/* LEFT / VISUAL HERITAGE CANVAS (60% on desktop)                 */}
            {/* ============================================================== */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              {/* Media Container with Cultural Frame & Ken Burns Effect */}
              <div className="relative rounded-xl overflow-hidden border-2 border-sand-300 bg-sand-200 shadow-md group min-h-[300px] sm:min-h-[380px] flex items-center justify-center">
                
                {/* Cultural Textile Corner Flourish */}
                <div className="absolute top-0 left-0 w-8 h-8 motif-angami-band z-20 pointer-events-none rounded-br" />
                <div className="absolute bottom-0 right-0 w-8 h-8 motif-muga z-20 pointer-events-none rounded-tl" />

                {/* Video Dispatch Player (if available and user chooses to watch) */}
                {currentArticle.videoUrl && ytId ? (
                  <div className="relative w-full h-full aspect-video z-10">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                      title={currentArticle.videoTitle || currentArticle.headline}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : !imageError[currentArticle.id] && currentArticle.imageUrl ? (
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={currentArticle.imageUrl}
                      alt={currentArticle.headline}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageError((prev) => ({ ...prev, [currentArticle.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <ThematicGraphic
                    category={currentArticle.category}
                    title={currentArticle.headline}
                    sourceName={currentArticle.sourceName}
                    className="w-full h-full min-h-[320px]"
                  />
                )}

                {/* State Cultural & Territorial Heritage Badge */}
                <div className="absolute top-3 left-10 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-navy-950/90 text-ivory-100 backdrop-blur-xs font-mono text-[11px] font-bold shadow-md border border-navy-800">
                    <MapPin className="w-3 h-3 text-saffron-400" />
                    <span>{primaryState.toUpperCase()}</span>
                    {currentArticle.district && (
                      <span className="text-sand-300">· {currentArticle.district}</span>
                    )}
                  </span>
                </div>

                {/* Video Indicator Badge */}
                {currentArticle.videoUrl && !ytId && (
                  <div className="absolute top-3 right-3 z-20">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600 text-white font-mono text-[11px] font-bold shadow-md tracking-wider">
                      <Play className="w-3 h-3 fill-current animate-pulse" />
                      VIDEO DISPATCH
                    </span>
                  </div>
                )}

                {/* Bottom Source & Photo Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950/90 via-navy-950/60 to-transparent p-3 pt-8 flex items-center justify-between text-xs font-mono text-ivory-100 z-20 pointer-events-none">
                  <span className="truncate pr-2 font-serif italic text-sand-200">
                    📷 Photo: {currentArticle.imageCredit || currentArticle.sourceName}
                  </span>
                  <span className="shrink-0 text-[11px] text-saffron-300 font-mono">
                    {currentArticle.location?.name || primaryState}
                  </span>
                </div>
              </div>

              {/* Cultural Tagline Bar */}
              <div className="mt-3 p-2.5 rounded-lg bg-white border border-sand-300 flex items-center justify-between text-xs font-mono text-slate-700 shadow-2xs">
                <span className="font-bold text-forest-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                  {heritage.tag}
                </span>
                <span className="hidden sm:inline text-sand-500 text-[11px]">
                  Textile Motif: {heritage.motif}
                </span>
              </div>
            </div>

            {/* ============================================================== */}
            {/* RIGHT / EDITORIAL BROADSIDE (40% on desktop)                   */}
            {/* ============================================================== */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-xl border border-sand-300 p-5 sm:p-6 shadow-md">
              <div>
                
                {/* Editorial Folio Header */}
                <div className="flex items-center justify-between pb-3 border-b border-sand-200">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-medium tracking-wide bg-navy-900 text-ivory-100">
                      <CategoryIcon className="w-3.5 h-3.5 text-saffron-400" />
                      {currentArticle.category}
                    </span>
                    <span className="text-xs font-mono text-sand-500 font-bold">
                      #{currentArticle.id.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-sand-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-saffron-600" />
                      {formatISODate(currentArticle.publishedDate)}
                    </span>
                    <div className="hidden sm:block scale-90 origin-right">
                      <CulturalPostmark
                        state={currentArticle.states[0] || 'Northeast'}
                        category={currentArticle.category}
                        dispatchId={currentIndex + 1}
                      />
                    </div>
                  </div>
                </div>

                {/* Stately Headline */}
                <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-navy-900 mt-3 leading-snug tracking-tight">
                  {currentArticle.headline}
                </h3>

                {/* Deck Sub-headline */}
                <p className="text-xs font-serif italic text-sand-500 mt-1 border-b border-sand-200 pb-2">
                  "Verified defense dispatch for September–October 2026 monograph"
                </p>

                {/* Summary with Magazine Drop-Cap */}
                <p className="drop-cap text-xs sm:text-sm text-slate-800 mt-3 leading-relaxed font-sans">
                  {currentArticle.summary}
                </p>

                {/* Magazine Style Pull Quote */}
                {currentArticle.quote && (
                  <div className="mt-4 p-3.5 rounded-lg bg-ivory-100 border-l-4 border-l-saffron-600 border border-sand-200 shadow-2xs">
                    <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-saffron-800 uppercase tracking-wider mb-1">
                      <Quote className="w-3 h-3 text-saffron-600" />
                      OFFICIAL DISPATCH CALLOUT (≤ 15 WORDS)
                    </div>
                    <blockquote className="text-xs sm:text-sm font-serif italic text-navy-950 font-medium">
                      "{currentArticle.quote}"
                    </blockquote>
                  </div>
                )}
              </div>

              {/* Action Buttons: Why This Story & Live Publisher Link */}
              <div className="mt-5 pt-3.5 border-t border-sand-200 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onOpenSlideOver(currentArticle)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-sand-200 hover:bg-sand-300 text-navy-900 font-mono text-xs font-bold transition-colors"
                  aria-label={`Open editorial selection dossier for ${currentArticle.headline}`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-saffron-600" />
                  <span>Why This Story?</span>
                </button>

                <a
                  href={currentArticle.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-navy-900 text-ivory-100 hover:bg-navy-800 font-sans text-xs font-semibold transition-colors"
                >
                  <span>Read on {currentArticle.sourceName}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-saffron-400" />
                </a>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM INTERACTIVE FILMSTRIP SCRUBBER (All 50 Slides)         */}
      {/* ============================================================== */}
      <div className="p-3 sm:p-4 bg-white border-t border-sand-300">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-sand-500 font-bold flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-navy-900" />
            Interactive 50-Story Filmstrip Tray (Click Any Slide to View)
          </span>
          <span className="text-[11px] font-mono text-forest-800 font-bold">
            ← Use Left / Right Keyboard Arrows to Navigate →
          </span>
        </div>

        {/* Filmstrip Horizontal Scrolling Reel */}
        <div
          ref={filmstripRef}
          className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth"
        >
          {activeArticles.map((article, index) => {
            const isActive = index === currentIndex;
            const itemHeritage = STATE_HERITAGE[article.states[0]] || STATE_HERITAGE['Assam'];

            return (
              <button
                key={article.id}
                type="button"
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`shrink-0 text-left p-1.5 rounded-lg border transition-all duration-300 w-36 sm:w-40 flex flex-col justify-between ${
                  isActive
                    ? 'filmstrip-active bg-saffron-50 border-saffron-600 shadow-md scale-102'
                    : 'bg-ivory-100 border-sand-300 hover:bg-white hover:border-navy-400'
                }`}
              >
                {/* Mini Thumbnail */}
                <div className="h-16 w-full rounded overflow-hidden bg-sand-200 relative mb-1.5">
                  {!imageError[article.id] && article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={article.headline}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageError((prev) => ({ ...prev, [article.id]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-[9px] text-sand-500 bg-sand-200">
                      {article.category.slice(0, 10)}
                    </div>
                  )}

                  {article.videoUrl && (
                    <div className="absolute top-1 right-1 p-0.5 bg-red-600 rounded text-white text-[8px] font-mono">
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </div>
                  )}
                </div>

                {/* ID & State Tag */}
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={`font-bold ${isActive ? 'text-saffron-700' : 'text-navy-900'}`}>
                    #{article.id.replace('ne30-', '')}
                  </span>
                  <span className="text-sand-500 truncate max-w-[75px]">
                    {article.states[0]}
                  </span>
                </div>

                {/* Headline Snippet */}
                <p className="text-[11px] font-serif font-semibold text-navy-900 line-clamp-1 mt-0.5">
                  {article.headline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};