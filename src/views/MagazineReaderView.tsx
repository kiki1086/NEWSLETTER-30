import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, BookOpen, Layers, MapPin, Shield, Calendar, ArrowRight } from 'lucide-react';
import articlesData from '../data/articles.json';
import { Article } from '../types/article';
import { MagazineAlbumShowcase } from '../components/MagazineAlbumShowcase';
import { StorySlideOver } from '../components/StorySlideOver';

const articles = articlesData as Article[];

export const MagazineReaderView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialStoryId = searchParams.get('story') || undefined;

  const [selectedStoryForSlideOver, setSelectedStoryForSlideOver] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-ivory-100 py-6 sm:py-10">
      <StorySlideOver
        article={selectedStoryForSlideOver}
        onClose={() => setSelectedStoryForSlideOver(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading Bar */}
        <div className="border-b border-sand-300 pb-4 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-navy-900 text-ivory-100 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
              CINEMATIC PRESENTATION ALBUM // ISSUE 01
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
              The 50 Dispatches Album
            </h1>
            <p className="text-xs sm:text-sm font-sans text-slate-700 mt-1 max-w-2xl">
              A rich visual presentation celebrating the Indian Armed Forces and the vibrant heritage of eight frontier states. Navigate using the controls, the filmstrip tray, or your keyboard arrow keys.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-ivory-200 border border-sand-300 text-navy-900 font-semibold hover:bg-sand-200 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-forest-700" />
              <span>Read as Newsletter</span>
            </Link>

            <Link
              to="/appendices"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-navy-900 text-ivory-100 font-semibold hover:bg-navy-800 transition-colors shadow-2xs"
            >
              <span>Appendices & Sources</span>
              <ArrowRight className="w-3 h-3 text-saffron-400" />
            </Link>
          </div>
        </div>

        {/* The Full Screen Interactive Album Showcase */}
        <MagazineAlbumShowcase
          articles={articles}
          onOpenSlideOver={(story) => setSelectedStoryForSlideOver(story)}
          initialArticleId={initialStoryId}
        />

      </div>
    </div>
  );
};