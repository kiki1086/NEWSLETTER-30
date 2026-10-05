import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, MapPin, CheckCircle2, Shield, Compass, BookOpen, Quote, Play, Video, Image as ImageIcon } from 'lucide-react';
import { Article } from '../types/article';
import { formatISODate } from '../utils/computedMetrics';
import { ThematicGraphic } from './ThematicGraphic';

interface StorySlideOverProps {
  article: Article | null;
  onClose: () => void;
}

export const StorySlideOver: React.FC<StorySlideOverProps> = ({ article, onClose }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [article?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  // Extract YouTube video ID if present
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const ytId = article ? getYouTubeId(article.videoUrl) : null;

  if (!article) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="slideover-title">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-lg bg-ivory-100 border-l border-sand-300 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-sand-300 bg-white">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium tracking-wide bg-sand-200 text-navy-900 border border-sand-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                    EDITORIAL SELECTION DOSSIER
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-md text-sand-500 hover:text-navy-900 hover:bg-sand-100 transition-colors"
                    aria-label="Close slide-over"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h2 id="slideover-title" className="text-lg sm:text-xl font-serif font-bold text-navy-900 mt-3 leading-snug">
                  {article.headline}
                </h2>

                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-sand-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-saffron-600" />
                    {formatISODate(article.publishedDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-forest-700" />
                    {article.states.join(', ')} {article.district ? `(${article.district})` : ''}
                  </span>
                </div>
              </div>

              {/* Scrollable Content: Media Banner & Detailed Rationale */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-ivory-50">
                
                {/* Video Dispatch Player (if available) */}
                {article.videoUrl && (
                  <div className="bg-navy-950 rounded-xl overflow-hidden border border-navy-800 shadow-md">
                    <div className="p-3 bg-navy-900 text-ivory-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-400">
                        <Play className="w-3.5 h-3.5 fill-current animate-pulse text-red-500" />
                        VERIFIED VIDEO DISPATCH
                      </span>
                      <a
                        href={article.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-sand-300 hover:text-white"
                      >
                        <span>Open on Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    {ytId ? (
                      <div className="relative aspect-video w-full">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                          title={article.videoTitle || article.headline}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <a
                          href={article.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-red-600 text-white font-mono text-xs font-bold hover:bg-red-700"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>Watch Video Dispatch on Publisher Platform</span>
                        </a>
                      </div>
                    )}
                    {article.videoTitle && (
                      <div className="p-3 text-xs font-mono text-sand-300 bg-navy-900/90 border-t border-navy-800">
                        {article.videoTitle}
                      </div>
                    )}
                  </div>
                )}

                {/* Authentic News Visual Asset Banner */}
                <div className="rounded-xl overflow-hidden border border-sand-300 bg-white shadow-xs">
                  {article.imageUrl && !imgError ? (
                    <img
                      src={article.imageUrl}
                      alt={article.headline}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-52 sm:h-56 object-cover"
                    />
                  ) : (
                    <ThematicGraphic
                      category={article.category}
                      title={article.headline}
                      sourceName={article.sourceName}
                      className="w-full h-44 sm:h-48"
                    />
                  )}
                  <div className="p-2.5 bg-ivory-100 border-t border-sand-200 flex items-center justify-between text-xs font-mono text-slate-700">
                    <span className="truncate pr-2" title={`Credit: ${article.imageCredit}`}>
                      📷 {article.imageCredit || article.sourceName}
                    </span>
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-navy-900 font-bold hover:text-saffron-600 transition-colors inline-flex items-center gap-1 font-sans"
                    >
                      <span>View Source</span>
                      <ExternalLink className="w-3 h-3 text-sand-500" />
                    </a>
                  </div>
                </div>
                
                {/* Strategic Relevance Metric */}
                <div className="bg-white p-4 rounded-lg border border-sand-300 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-sand-500">
                      Editorial Relevance Tier
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                        article.whyThisStory.relevance === 'High'
                          ? 'bg-saffron-100 text-saffron-700 border border-saffron-400'
                          : 'bg-navy-100 text-navy-800 border border-navy-300'
                      }`}
                    >
                      {article.whyThisStory.relevance} Relevance
                    </span>
                  </div>
                  <p className="text-sm font-sans text-navy-900 mt-2 font-medium">
                    {article.whyThisStory.reason}
                  </p>
                </div>

                {/* Paraphrased Summary */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-sand-500 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-navy-800" />
                    Verified Event Summary (Paraphrased)
                  </h3>
                  <p className="text-sm text-slate-800 leading-relaxed bg-white p-3.5 rounded-lg border border-sand-300">
                    {article.summary}
                  </p>
                </div>

                {/* Sourced Quote Callout (Max 15 words) */}
                {article.quote && (
                  <div className="bg-sand-100 border-l-4 border-saffron-600 p-3.5 rounded-r-lg">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-saffron-700 font-semibold mb-1">
                      <Quote className="w-3.5 h-3.5" />
                      OFFICIAL DISPATCH CALLOUT (≤ 15 WORDS)
                    </div>
                    <blockquote className="text-xs sm:text-sm font-serif italic text-navy-950">
                      "{article.quote}"
                    </blockquote>
                  </div>
                )}

                {/* Recency & Verification Details */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-sand-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-saffron-600" />
                    Verification & Publication Window
                  </h3>
                  <div className="bg-white p-3.5 rounded-lg border border-sand-300 text-xs text-slate-700 font-mono space-y-1">
                    <div><strong>Page Published:</strong> {article.publishedDate}</div>
                    <div className="text-slate-600 font-sans mt-1">{article.whyThisStory.recencyNote}</div>
                  </div>
                </div>

                {/* Geographic & Border Context */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-sand-500 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-forest-700" />
                    Geographic & Territorial Context
                  </h3>
                  <div className="bg-white p-3.5 rounded-lg border border-sand-300 text-xs sm:text-sm text-slate-700">
                    {article.whyThisStory.geographicRelevance}
                  </div>
                </div>

                {/* Thematic Connection */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-sand-500 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-navy-800" />
                    Strategic Theme Connection
                  </h3>
                  <div className="bg-white p-3.5 rounded-lg border border-sand-300 text-xs sm:text-sm text-slate-700">
                    {article.whyThisStory.themeConnection}
                  </div>
                </div>

              </div>

              {/* Footer: Direct Verified Source Link */}
              <div className="p-4 sm:p-5 border-t border-sand-300 bg-white">
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-navy-900 text-ivory-100 font-sans text-xs sm:text-sm font-semibold hover:bg-navy-800 transition-colors shadow-xs"
                >
                  <span>Read Original Dispatch on {article.sourceName}</span>
                  <ExternalLink className="w-4 h-4 text-saffron-400" />
                </a>
                <p className="text-[11px] text-center font-mono text-sand-500 mt-2">
                  Verified URL · Live-checked for September–October 2026 issue
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>,
      document.body
    );
  };
