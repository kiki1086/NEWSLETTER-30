import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Shield, Layers, Calendar, ChevronRight } from 'lucide-react';
import articlesData from '../data/articles.json';
import { StoryCard } from '../components/StoryCard';
import { StorySlideOver } from '../components/StorySlideOver';
import { Article, NortheastState } from '../types/article';
import { getArticlesByState, getStateStoryCounts } from '../utils/computedMetrics';

const articles = articlesData as Article[];

const NORTHEAST_STATES: Array<{
  name: NortheastState;
  capital: string;
  borders: string;
  theme: string;
  description: string;
}> = [
  {
    name: 'Arunachal Pradesh',
    capital: 'Itanagar',
    borders: 'China, Myanmar, Bhutan',
    theme: 'Frontier Security & Himalayan Modernization',
    description: 'The easternmost bulwark of the nation, characterized by rugged alpine ridges, active border fencing, the Vibrant Villages Programme at Kibithoo, and medical milestones like TRIHMS first kidney transplant.'
  },
  {
    name: 'Assam',
    capital: 'Dispur (Guwahati)',
    borders: 'Bhutan, Bangladesh, and seven sister states',
    theme: 'Regional Connectivity & Inter-Agency Coordination',
    description: 'The strategic heartland and logistics nexus of the Northeast, hosting bilateral defence dialogues, major inter-agency anti-narcotics strikes, and sustainable tourism blueprints in Dima Hasao.'
  },
  {
    name: 'Manipur',
    capital: 'Imphal',
    borders: 'Myanmar',
    theme: 'Community Stabilization & Constitutional Peace',
    description: 'A critical internal security operational theatre where combined forces maintain disciplined neutrality across buffer zones, recover illegal arms caches, and foster inter-ethnic peace dialogues.'
  },
  {
    name: 'Meghalaya',
    capital: 'Shillong',
    borders: 'Bangladesh',
    theme: 'Apex Command & Educational Partnerships',
    description: 'Headquarters of the Directorate General Assam Rifles (Laitkor) and 101 Area, anchoring tertiary medical reach via NEIGRIHMS and academic partnerships with Royal Global University.'
  },
  {
    name: 'Mizoram',
    capital: 'Aizawl',
    borders: 'Myanmar, Bangladesh',
    theme: 'Border Gate Vigilance & Rule of Law',
    description: 'Guarding the international boundary at Zokhawthar, executing coordinated civil-police narcotics interdictions, and upholding high community respect for defense personnel.'
  },
  {
    name: 'Nagaland',
    capital: 'Kohima',
    borders: 'Myanmar',
    theme: 'Civic Health Outreach & Grassroots Governance',
    description: 'Rich heritage of the "Sentinels of the Northeast" in remote hill districts like Kiphire and Peren, medical camps at Amahatore, basketball tourneys in Kohima, and the FNTA legislative framework.'
  },
  {
    name: 'Sikkim',
    capital: 'Gangtok',
    borders: 'China, Bhutan, Nepal',
    theme: 'Himalayan Engineering & Lifeline Resilience',
    description: 'Strategic high-altitude mountain bastion where BRO Project SWASTIK restores vital Teesta bridges and road axes, environmental boards enforce watershed conservation, and the SALF literary festival unites minds.'
  },
  {
    name: 'Tripura',
    capital: 'Agartala',
    borders: 'Bangladesh',
    theme: 'Youth Cadet Mentorship & Tribal Healthcare',
    description: 'Active paramilitary civic action bringing free medical clinics to tribal families in Silachari, inspiring NCC cadets at Agartala, and championing nationwide Swachhata environmental campaigns.'
  }
];

export const StateDetailView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialParam = searchParams.get('name') as NortheastState | null;

  const [activeState, setActiveState] = useState<NortheastState>(
    initialParam && NORTHEAST_STATES.some(s => s.name === initialParam)
      ? initialParam
      : 'Arunachal Pradesh'
  );

  const [selectedStoryForSlideOver, setSelectedStoryForSlideOver] = useState<Article | null>(null);

  const stateCounts = useMemo(() => getStateStoryCounts(articles), []);
  const currentStateData = useMemo(
    () => NORTHEAST_STATES.find((s) => s.name === activeState) || NORTHEAST_STATES[0],
    [activeState]
  );

  const stateStories = useMemo(() => getArticlesByState(articles, activeState), [activeState]);

  const handleStateChange = (stateName: NortheastState) => {
    setActiveState(stateName);
    setSearchParams({ name: stateName });
  };

  return (
    <div className="min-h-screen bg-ivory-100 py-8 sm:py-12">
      <StorySlideOver
        article={selectedStoryForSlideOver}
        onClose={() => setSelectedStoryForSlideOver(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* View Masthead */}
        <div className="border-b border-sand-300 pb-4 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-navy-900 text-ivory-100">
            DOSSIER ARCHIVE // THE EIGHT STATES
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 mt-2">
            State-by-State Editorial Registers
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-700 mt-1 max-w-2xl">
            Verified field reporting across each of India's eight Northeast states. All counts are computed dynamically from the master dataset.
          </p>
        </div>

        {/* 8 State Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
          {NORTHEAST_STATES.map((st) => {
            const isSelected = activeState === st.name;
            const count = stateCounts[st.name] || 0;

            return (
              <button
                key={st.name}
                type="button"
                onClick={() => handleStateChange(st.name)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-navy-900 text-white font-bold border-saffron-500 shadow-xs'
                    : 'bg-white text-navy-900 border-sand-300 hover:bg-sand-100'
                }`}
              >
                <span>{st.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-saffron-600 text-white' : 'bg-sand-200 text-navy-800'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* State Spotlight Banner */}
        <div className="mt-4 bg-white rounded-xl border border-sand-300 p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono text-sand-500 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-forest-700" />
                Capital: <strong>{currentStateData.capital}</strong> · International Frontiers: <strong>{currentStateData.borders}</strong>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-navy-900 mt-2">
                {currentStateData.name}
              </h2>

              <p className="text-xs sm:text-sm font-sans font-semibold text-saffron-700 mt-1">
                {currentStateData.theme}
              </p>

              <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed max-w-2xl">
                {currentStateData.description}
              </p>
            </div>

            {/* Computed State Statistics */}
            <div className="lg:col-span-4 bg-ivory-100 p-4 sm:p-5 rounded-lg border border-sand-300 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-sand-500">Verified Dispatches:</span>
                <strong className="text-base text-navy-900 font-bold">{stateStories.length} Stories</strong>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-sand-500">Window Period:</span>
                <span className="text-slate-800">1 Sep – 3 Oct 2026</span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-sand-500">Cartographic Status:</span>
                <span className="text-forest-700 font-semibold">Survey of India Depiction</span>
              </div>

              <div className="pt-2 border-t border-sand-300 text-[11px] font-mono text-sand-500">
                Data strictly audited in <code className="bg-sand-200 px-1 py-0.5 rounded">/reports/verification.md</code>
              </div>
            </div>

          </div>
        </div>

        {/* State Stories Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between pb-2 mb-4 border-b border-sand-300">
            <h3 className="text-base sm:text-lg font-serif font-bold text-navy-900">
              Verified Stories from {currentStateData.name} ({stateStories.length})
            </h3>
            <span className="text-xs font-mono text-sand-500">
              All dates verified on source pages
            </span>
          </div>

          {stateStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stateStories.map((article) => (
                <StoryCard
                  key={article.id}
                  article={article}
                  onOpenSlideOver={(a) => setSelectedStoryForSlideOver(a)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-lg border border-sand-300 text-slate-600 font-mono text-sm">
              No stories found for this specific state.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
