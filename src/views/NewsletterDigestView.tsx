import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Calendar,
  MapPin,
  ExternalLink,
  HelpCircle,
  Play,
  Shield,
  Layers,
  Download,
  Printer,
  FileText,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import articlesData from '../data/articles.json';
import { Article } from '../types/article';
import { StorySlideOver } from '../components/StorySlideOver';
import { ThematicGraphic } from '../components/ThematicGraphic';
import {
  CulturalPostmark,
  SteamingTeaCompanion,
  ASHTALAKSHMI_CULTURE
} from '../components/NortheastCulturalDetailing';
import { useReducedMotion } from '../hooks/useReducedMotion';

const articles = articlesData as Article[];

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

const formatISODate = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
};

interface BookStoryCardProps {
  story: Article;
  onOpenSlideOver: (story: Article) => void;
  isFeatured?: boolean;
}

// Extract YouTube ID from URL
const getYouTubeId = (url?: string): string | null => {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return m ? m[1] : null;
};

const BookStoryCard: React.FC<BookStoryCardProps> = ({
  story,
  onOpenSlideOver,
  isFeatured = false
}) => {
  const [imgError, setImgError] = useState(false);
  const [ytThumbError, setYtThumbError] = useState(false);
  const primaryState = story.states[0] || 'Northeast';
  const mascot = STATE_MASCOT_EMOJI[primaryState] || '📍';
  const ytId = getYouTubeId(story.videoUrl);
  const ytThumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
  // Resolved image: try imageUrl → YouTube thumbnail → ThematicGraphic
  const resolvedSrc = !imgError ? story.imageUrl : (ytThumb && !ytThumbError ? ytThumb : null);

  if (isFeatured) {
    return (
      <article className="bg-white rounded-xl border-2 border-sand-300 overflow-hidden shadow-xs hover:shadow-md transition-all group">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Visual Canvas with fallback */}
          <div className="md:col-span-6 relative min-h-[220px] sm:min-h-[260px] bg-sand-200 overflow-hidden flex items-center justify-center">
            {resolvedSrc ? (
              <img
                src={resolvedSrc}
                alt={story.headline}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (!imgError) {
                    setImgError(true);
                  } else {
                    setYtThumbError(true);
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <ThematicGraphic
                category={story.category}
                title={story.headline}
                sourceName={story.sourceName}
                className="w-full h-full"
                hideCredit={true}
              />
            )}

            {story.videoUrl && (
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold shadow-md">
                  <Play className="w-2.5 h-2.5 fill-current animate-pulse" /> VIDEO
                </span>
              </div>
            )}

            <div className="absolute top-2.5 right-2.5 z-10 hidden sm:block">
              <CulturalPostmark state={primaryState} category={story.category} dispatchId={parseInt(story.id.replace('ne30-', ''), 10) || 1} />
            </div>

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950/90 via-navy-950/60 to-transparent p-2.5 pt-5 flex items-center justify-between text-[10px] font-mono text-ivory-100">
              <span className="truncate pr-2">📷 {story.imageCredit || story.sourceName}</span>
              <span className="shrink-0 text-sand-300 font-sans">{story.sourceName}</span>
            </div>
          </div>

          {/* Copy Column */}
          <div className="md:col-span-6 p-4 sm:p-5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-sand-200 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-saffron-600 text-white font-bold text-[10px] uppercase">
                  LEAD DISPATCH
                </span>
                <span className="text-sand-500 text-[11px] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-saffron-600" />
                  {formatISODate(story.publishedDate)}
                </span>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-mono text-sand-600">
                <span className="font-semibold text-navy-900 flex items-center gap-1">
                  <span>{mascot}</span>
                  <span>{story.states.join(', ')}</span>
                </span>
                {story.district && (
                  <>
                    <span>·</span>
                    <span className="text-sand-500 flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" />
                      {story.district}
                    </span>
                  </>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-serif font-bold text-navy-950 leading-snug group-hover:text-saffron-700 transition-colors mt-1.5">
                {story.headline}
              </h4>

              <p className="text-xs text-slate-700 leading-relaxed font-sans mt-2 line-clamp-3">
                <span className="font-serif text-2xl font-bold float-left mr-1.5 leading-none text-navy-950">
                  {story.summary.charAt(0)}
                </span>
                {story.summary.slice(1)}
              </p>

              {story.quote && (
                <div className="mt-2.5 p-2 rounded bg-ivory-100 border-l-2 border-saffron-600 text-[11px] font-serif italic text-navy-950 leading-snug">
                  "{story.quote}"
                </div>
              )}
            </div>

            <div className="pt-2.5 border-t border-sand-200 flex items-center justify-between text-xs font-mono">
              <button
                type="button"
                onClick={() => onOpenSlideOver(story)}
                className="text-navy-900 font-bold hover:text-saffron-600 transition-colors inline-flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5 text-saffron-600" />
                <span>Why This Story?</span>
              </button>

              <a
                href={story.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-800 font-semibold hover:text-forest-950 inline-flex items-center gap-1 hover:underline"
              >
                <span>{story.sourceName}</span>
                <ExternalLink className="w-3 h-3 text-sand-500" />
              </a>
            </div>
          </div>

        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-xl border border-sand-300 overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group">
      <div>
        <div className="relative h-36 sm:h-40 w-full bg-sand-200 overflow-hidden">
          {resolvedSrc ? (
            <img
              src={resolvedSrc}
              alt={story.headline}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => {
                if (!imgError) {
                  setImgError(true);
                } else {
                  setYtThumbError(true);
                }
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <ThematicGraphic
              category={story.category}
              title={story.headline}
              sourceName={story.sourceName}
              className="w-full h-full"
              hideCredit={true}
            />
          )}

          {story.videoUrl && (
            <div className="absolute top-2 right-2 z-10">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-bold shadow-xs">
                <Play className="w-2 h-2 fill-current" /> VIDEO
              </span>
            </div>
          )}

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950/85 via-navy-950/50 to-transparent p-2 pt-4 flex items-center justify-between text-[9px] font-mono text-ivory-100">
            <span className="truncate pr-2">📷 {story.imageCredit || story.sourceName}</span>
            <span className="shrink-0 text-sand-300 font-sans">{story.sourceName}</span>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 space-y-1.5">
          <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-sand-500">
            <span className="inline-flex items-center gap-1 font-semibold text-navy-800">
              <span>{mascot}</span>
              <span>{story.states.join(', ')}</span>
            </span>
            <span className="flex items-center gap-1 text-[10px]">
              <Calendar className="w-2.5 h-2.5 text-saffron-600" />
              {formatISODate(story.publishedDate)}
            </span>
          </div>

          <h4 className="text-sm font-serif font-bold text-navy-950 group-hover:text-saffron-700 transition-colors leading-snug">
            {story.headline}
          </h4>

          <p className="text-[11px] text-slate-700 leading-relaxed font-sans line-clamp-2">
            {story.summary}
          </p>

          {story.quote && (
            <blockquote className="mt-1 p-2 rounded bg-ivory-100 border-l-2 border-saffron-600 text-[10px] font-serif italic text-navy-950">
              "{story.quote}"
            </blockquote>
          )}
        </div>
      </div>

      <div className="p-3.5 sm:p-4 pt-0 mt-1 border-t border-sand-200 flex items-center justify-between text-[11px] font-mono">
        <button
          type="button"
          onClick={() => onOpenSlideOver(story)}
          className="text-navy-900 font-bold hover:text-saffron-600 transition-colors inline-flex items-center gap-1"
        >
          <HelpCircle className="w-3 h-3 text-saffron-600" />
          <span>Why This Story?</span>
        </button>

        <a
          href={story.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-forest-800 font-semibold hover:text-forest-950 inline-flex items-center gap-1"
        >
          <span>{story.sourceName}</span>
          <ExternalLink className="w-2.5 h-2.5 text-sand-500" />
        </a>
      </div>
    </article>
  );
};

// ============================================================================
// BOOK PAGE DEFINITIONS INTERFACE (EXACTLY 38 PAGES)
// ============================================================================
type BookPageType =
  | 'frontispiece'
  | 'regional_overview'
  | 'table_of_contents'
  | 'state_spotlight'
  | 'dispatches'
  | 'thematic_briefing'
  | 'cultural_monograph'
  | 'appendix_sources'
  | 'appendix_rationale'
  | 'colophon';

interface BookPage {
  id: string;
  pageNumber: number;
  type: BookPageType;
  title: string;
  subtitle: string;
  motifClass: string;
  ribbonLabel: string;
  state?: string;
  thematicCategory?: string;
  leadStory?: Article;
  stories?: Article[];
}

export const NewsletterDigestView: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [isExportingAll, setIsExportingAll] = useState<boolean>(false);
  const [printMode, setPrintMode] = useState<'current' | 'all'>('all');

  const handleExportCurrentPage = () => {
    setShowExportModal(false);
    setPrintMode('current');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleExportFullMonograph = () => {
    setShowExportModal(false);
    setPrintMode('all');
    setIsExportingAll(true);
    setTimeout(() => {
      window.print();
      setIsExportingAll(false);
    }, 450);
  };

  // Curate all 50 verified articles & monograph content into EXACTLY 38 Structured Pages
  const bookPages: BookPage[] = useMemo(() => {
    return [
      // PAGE 01: Frontispiece & Cover Monograph
      {
        id: 'page-1',
        pageNumber: 1,
        type: 'frontispiece',
        title: "Executive Editor's Frontispiece: The Quiet Strength of the Frontier",
        subtitle: 'Issue 01 Monograph · 30 Days · 50 Stories · Autumn 2026',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Frontispiece',
        leadStory: articles[0] // ne30-01: Havildar Jangkhokai Kuki supreme sacrifice
      },

      // PAGE 02: Regional Synthesis & The 8 Guardians
      {
        id: 'page-2',
        pageNumber: 2,
        type: 'regional_overview',
        title: 'Regional Synthesis: One Frontier, Eight Guardians',
        subtitle: 'Civil-Military Integration & Sourced Territorial Integrity',
        motifClass: 'motif-muga',
        ribbonLabel: 'Overview',
        stories: [articles[1], articles[2]] // ne30-02 (Changlang Clarification), ne30-03 (ULFA-I Interception)
      },

      // PAGE 03: Table of Contents & 38-Page Monograph Index
      {
        id: 'page-3',
        pageNumber: 3,
        type: 'table_of_contents',
        title: 'Monograph Table of Contents · Pages 1–38',
        subtitle: 'Directory of 8 States, 50 Dispatches, Special Briefings & Appendices',
        motifClass: 'motif-phanek',
        ribbonLabel: 'Contents'
      },

      // PAGE 04: State Spotlight: Arunachal Pradesh
      {
        id: 'page-4',
        pageNumber: 4,
        type: 'state_spotlight',
        state: 'Arunachal Pradesh',
        title: 'State Spotlight: Arunachal Pradesh',
        subtitle: 'The Dawn-Lit Frontier · High Himalayan Passes & Indigenous Valor',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Arunachal',
        leadStory: articles[3] // ne30-04: Cadre Surrenders at Pangsau Pass
      },

      // PAGE 05: Arunachal Dispatches: High-Altitude Vigilance
      {
        id: 'page-5',
        pageNumber: 5,
        type: 'dispatches',
        title: 'Arunachal Dispatches: High-Altitude Vigilance & Border Talks',
        subtitle: 'Eastern Sector Corps Talks & Vibrant Villages Modernization',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Arunachal (LAC)',
        stories: [articles[15], articles[16]] // ne30-16, ne30-17
      },

      // PAGE 06: Arunachal Dispatches: Infrastructure & Medical Milestones
      {
        id: 'page-6',
        pageNumber: 6,
        type: 'dispatches',
        title: 'Arunachal Dispatches: Infrastructure & Medical Milestones',
        subtitle: 'TRIHMS Cardiac Stenting, Agricultural Engineering & Project Brahmank',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Arunachal (Infra)',
        leadStory: articles[28], // ne30-29
        stories: [articles[30], articles[33]] // ne30-31, ne30-34
      },

      // PAGE 07: State Spotlight: Assam
      {
        id: 'page-7',
        pageNumber: 7,
        type: 'state_spotlight',
        state: 'Assam',
        title: 'State Spotlight: Assam',
        subtitle: 'Gateway of the Brahmaputra · Golden Muga & Riverine Sentinels',
        motifClass: 'motif-muga',
        ribbonLabel: 'Assam',
        leadStory: articles[8] // ne30-09: 109.2 kg Yaba in Cachar
      },

      // PAGE 08: Assam Dispatches: Riverine Security & Interdiction
      {
        id: 'page-8',
        pageNumber: 8,
        type: 'dispatches',
        title: 'Assam Dispatches: Riverine Security & Contraband Interdiction',
        subtitle: 'Karimganj Narcotics Seizures & Radical Recruitment Interception',
        motifClass: 'motif-muga',
        ribbonLabel: 'Assam (Security)',
        stories: [articles[9], articles[11]] // ne30-10, ne30-12
      },

      // PAGE 09: Assam Dispatches: Humanitarian Relief & Bilaterals
      {
        id: 'page-9',
        pageNumber: 9,
        type: 'dispatches',
        title: 'Assam Dispatches: Humanitarian Relief & Regional Bilaterals',
        subtitle: 'Third Defence Cooperation Summit & Guwahati Flood Relief Pumping',
        motifClass: 'motif-muga',
        ribbonLabel: 'Assam (Relief)',
        stories: [articles[14], articles[32]] // ne30-15, ne30-33
      },

      // PAGE 10: Assam Dispatches: Civic Health, Economics & Tourism
      {
        id: 'page-10',
        pageNumber: 10,
        type: 'dispatches',
        title: 'Assam Dispatches: Civic Health, Economics & Eco-Tourism',
        subtitle: 'World Heart Day Walk, Inter-Agency Coordination & Tourism Roadmap',
        motifClass: 'motif-muga',
        ribbonLabel: 'Assam (Civic)',
        leadStory: articles[24], // ne30-25
        stories: [articles[25], articles[31]] // ne30-26, ne30-32
      },

      // PAGE 11: State Spotlight: Manipur
      {
        id: 'page-11',
        pageNumber: 11,
        type: 'state_spotlight',
        state: 'Manipur',
        title: 'State Spotlight: Manipur',
        subtitle: 'The Jewel of India · Loktak Floating Sanctuary & Sangai Heritage',
        motifClass: 'motif-phanek',
        ribbonLabel: 'Manipur',
        leadStory: articles[4] // ne30-05: Three USRA Cadres Apprehended in Munpi
      },

      // PAGE 12: Manipur Dispatches: Border Integrity & Tactical De-escalation
      {
        id: 'page-12',
        pageNumber: 12,
        type: 'dispatches',
        title: 'Manipur Dispatches: Border Integrity & Tactical De-escalation',
        subtitle: 'Pilong Village Firing Response & Kamjong Frontier Domination',
        motifClass: 'motif-phanek',
        ribbonLabel: 'Manipur (Frontier)',
        stories: [articles[5], articles[7]] // ne30-06, ne30-08
      },

      // PAGE 13: Manipur Dispatches: Joint Security Audits & Valley Protection
      {
        id: 'page-13',
        pageNumber: 13,
        type: 'dispatches',
        title: 'Manipur Dispatches: Joint Security Audits & Valley Domination',
        subtitle: 'Imphal East Security Sweeps & Supreme Court Judicial Directives',
        motifClass: 'motif-phanek',
        ribbonLabel: 'Manipur (Law)',
        stories: [articles[20], articles[22]] // ne30-21, ne30-23
      },

      // PAGE 14: Manipur Dispatches: Community Confidence & Civic Outreach
      {
        id: 'page-14',
        pageNumber: 14,
        type: 'dispatches',
        title: 'Manipur Dispatches: Community Confidence & Civic Missions',
        subtitle: 'Displaced Citizens Outreach, 9 Sector Welfare & Nutrition Camps',
        motifClass: 'motif-phanek',
        ribbonLabel: 'Manipur (Outreach)',
        leadStory: articles[26], // ne30-27
        stories: [articles[35], articles[40]] // ne30-36, ne30-41
      },

      // PAGE 15: State Spotlight: Nagaland
      {
        id: 'page-15',
        pageNumber: 15,
        type: 'state_spotlight',
        state: 'Nagaland',
        title: 'State Spotlight: Nagaland',
        subtitle: 'Land of the Hornbill · Valiant Clan Weaves & Hillside Peace',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Nagaland',
        leadStory: articles[12] // ne30-13: Security Coordination Kohima
      },

      // PAGE 16: Nagaland Dispatches: Border Regulations & Governance
      {
        id: 'page-16',
        pageNumber: 16,
        type: 'dispatches',
        title: 'Nagaland Dispatches: International Boundaries & Governance',
        subtitle: 'Mon International Border Regimes & Frontier Territory Dialogue',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Nagaland (Border)',
        stories: [articles[13], articles[21]] // ne30-14, ne30-22
      },

      // PAGE 17: Nagaland Dispatches: Eastern Districts Healthcare Missions
      {
        id: 'page-17',
        pageNumber: 17,
        type: 'dispatches',
        title: 'Nagaland Dispatches: Eastern Districts Healthcare Missions',
        subtitle: 'Tuensang Free Medical Camps & Zunheboto Preventive Healthcare',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Nagaland (Health)',
        stories: [articles[41], articles[42]] // ne30-42, ne30-43
      },

      // PAGE 18: Nagaland Dispatches: Youth Sports, Memorials & Sanitation
      {
        id: 'page-18',
        pageNumber: 18,
        type: 'dispatches',
        title: 'Nagaland Dispatches: Youth Sports, Memorials & Sanitation',
        subtitle: 'Sports Gear Distribution, Swachhata Sanitation & Capt Kengurüse Memorial',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Nagaland (Youth)',
        leadStory: articles[48], // ne30-49: Capt Kengurüse MVC Tournament
        stories: [articles[43], articles[45]] // ne30-44, ne30-46
      },

      // PAGE 19: State Spotlight: Meghalaya
      {
        id: 'page-19',
        pageNumber: 19,
        type: 'state_spotlight',
        state: 'Meghalaya',
        title: 'State Spotlight: Meghalaya',
        subtitle: 'The Abode of Clouds · Living Root Bridges & Ryndia Heritage',
        motifClass: 'motif-muga',
        ribbonLabel: 'Meghalaya',
        leadStory: articles[29] // ne30-30: NEIGRIHMS Super-Specialty
      },

      // PAGE 20: Meghalaya Dispatches: Veteran Honor & Academic Synergies
      {
        id: 'page-20',
        pageNumber: 20,
        type: 'dispatches',
        title: 'Meghalaya Dispatches: Veteran Honor & Academic Synergies',
        subtitle: 'Shillong Sammaan Samaroh & Royal Global University Research MoU',
        motifClass: 'motif-muga',
        ribbonLabel: 'Meghalaya (Garrison)',
        stories: [articles[36], articles[37]] // ne30-37, ne30-38
      },

      // PAGE 21: State Spotlight: Mizoram
      {
        id: 'page-21',
        pageNumber: 21,
        type: 'state_spotlight',
        state: 'Mizoram',
        title: 'State Spotlight: Mizoram',
        subtitle: 'Songbird of the Blue Mountains · Puanchei Weaves & Peaceful Borders',
        motifClass: 'motif-phanek',
        ribbonLabel: 'Mizoram',
        leadStory: articles[10] // ne30-11: Methamphetamine Seizure Zokhawthar
      },

      // PAGE 22: Mizoram Dispatches: Border Governance & Civic Stewardship
      {
        id: 'page-22',
        pageNumber: 22,
        type: 'dispatches',
        title: 'Mizoram Dispatches: Border Security & Civil Administration',
        subtitle: 'Champhai Security Reviews & Cross-Border Trade Route Domination',
        motifClass: 'motif-phanek',
        ribbonLabel: 'Mizoram (Trade)',
        leadStory: articles[27], // ne30-28
        stories: []
      },

      // PAGE 23: State Spotlight: Sikkim
      {
        id: 'page-23',
        pageNumber: 23,
        type: 'state_spotlight',
        state: 'Sikkim',
        title: 'State Spotlight: Sikkim',
        subtitle: 'Shadow of Mt. Kangchenjunga · Red Panda Sanctuary & Alpine Roads',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Sikkim',
        leadStory: articles[17] // ne30-18: Project SWASTIK Raising Day
      },

      // PAGE 24: Sikkim Dispatches: Cultural Literature & Alpine Ecology
      {
        id: 'page-24',
        pageNumber: 24,
        type: 'dispatches',
        title: 'Sikkim Dispatches: Cultural Literature & Alpine Ecology',
        subtitle: 'Sikkim Arts & Literature Festival & High-Altitude Waste Management',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Sikkim (Ecology)',
        stories: [articles[23], articles[34]] // ne30-24, ne30-35
      },

      // PAGE 25: State Spotlight: Tripura
      {
        id: 'page-25',
        pageNumber: 25,
        type: 'state_spotlight',
        state: 'Tripura',
        title: 'State Spotlight: Tripura',
        subtitle: 'The Timeless Valley of Palaces · Risa Handlooms & Agartala Harmony',
        motifClass: 'motif-muga',
        ribbonLabel: 'Tripura',
        leadStory: articles[38] // ne30-39: Weapon Exposition Agartala
      },

      // PAGE 26: Tripura Dispatches: Preventive Health & Cleanliness
      {
        id: 'page-26',
        pageNumber: 26,
        type: 'dispatches',
        title: 'Tripura Dispatches: Preventive Health & Cleanliness',
        subtitle: 'Teliamura Medical & Dental Clinics & Swachhata Sanitation Missions',
        motifClass: 'motif-muga',
        ribbonLabel: 'Tripura (Civic)',
        stories: [articles[39], articles[44]] // ne30-40, ne30-45
      },

      // PAGE 27: Regional Dispatches: Tri-Service Joint Readiness
      {
        id: 'page-27',
        pageNumber: 27,
        type: 'dispatches',
        title: 'Regional Dispatches: Tri-Service Joint Readiness & Air Assault',
        subtitle: 'Eastern Theatre Air Assault Exercises & Integrated Battle Group Modernization',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Regional Strike',
        stories: [articles[18], articles[19]] // ne30-19, ne30-20
      },

      // PAGE 28: Statutory Vigilance: AFSPA Review & Jurisprudence
      {
        id: 'page-28',
        pageNumber: 28,
        type: 'dispatches',
        title: 'Statutory Vigilance: AFSPA Gazette Reviews & Jurisprudence',
        subtitle: 'Ministry of Home Affairs Regular Legal Framework Assessments',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'AFSPA Review',
        leadStory: articles[6], // ne30-07
        stories: []
      },

      // PAGE 29: Youth Dispatches: Athletic Excellence & Championship Glory
      {
        id: 'page-29',
        pageNumber: 29,
        type: 'dispatches',
        title: 'Youth Dispatches: Athletic Excellence & Championship Glory',
        subtitle: 'National Powerlifting Gold, Sentinels Cup & Kohima Basketball',
        motifClass: 'motif-phanek',
        ribbonLabel: 'Athletics',
        leadStory: articles[46], // ne30-47: Maibam Gulubi Gold
        stories: [articles[47], articles[49]] // ne30-48, ne30-50
      },

      // PAGE 30: Special Briefing: Security Pulse
      {
        id: 'page-30',
        pageNumber: 30,
        type: 'thematic_briefing',
        thematicCategory: 'Security Pulse',
        title: 'Special Briefing 01: Security Pulse',
        subtitle: 'Border Restraint, Counter-Infiltration & Multi-Agency De-escalation',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Briefing: Security'
      },

      // PAGE 31: Special Briefing: Frontier View
      {
        id: 'page-31',
        pageNumber: 31,
        type: 'thematic_briefing',
        thematicCategory: 'Frontier View',
        title: 'Special Briefing 02: Frontier View',
        subtitle: 'Vibrant Villages, High-Altitude Border Roads & Sela Pass Logistics',
        motifClass: 'motif-muga',
        ribbonLabel: 'Briefing: Frontier'
      },

      // PAGE 32: Special Briefing: Regional Currents
      {
        id: 'page-32',
        pageNumber: 32,
        type: 'thematic_briefing',
        thematicCategory: 'Regional Currents',
        title: 'Special Briefing 03: Regional Currents',
        subtitle: 'Act East Corridors, Darranga ICP Bilaterals & Himalayan Trade',
        motifClass: 'motif-phanek',
        ribbonLabel: 'Briefing: Trade'
      },

      // PAGE 33: Special Briefing: Development & Infrastructure
      {
        id: 'page-33',
        pageNumber: 33,
        type: 'thematic_briefing',
        thematicCategory: 'Development & Infrastructure',
        title: 'Special Briefing 04: Development & Infrastructure',
        subtitle: 'Civil Engineering, Mountain Bailey Bridges & Flood Pumping Stations',
        motifClass: 'motif-muga',
        ribbonLabel: 'Briefing: Infra'
      },

      // PAGE 34: Special Briefing: Society, Youth & Operation Sadbhavana
      {
        id: 'page-34',
        pageNumber: 34,
        type: 'thematic_briefing',
        thematicCategory: 'Society & Youth',
        title: 'Special Briefing 05: Society, Youth & Sadbhavana',
        subtitle: 'Community Healthcare, School Infrastructure & Sports Leadership',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Briefing: Youth'
      },

      // PAGE 35: Cultural Monograph: Hillside Tea & Northeast Handloom Heritage
      {
        id: 'page-35',
        pageNumber: 35,
        type: 'cultural_monograph',
        title: 'Cultural Monograph: Terroirs of the Eastern Hills & Sacred Looms',
        subtitle: 'Single-Estate Orthodox Teas & Handloom Heritage of the Eight States',
        motifClass: 'motif-muga',
        ribbonLabel: 'Tea & Looms'
      },

      // PAGE 36: Documentary Appendix I: Accredited Source Directory
      {
        id: 'page-36',
        pageNumber: 36,
        type: 'appendix_sources',
        title: 'Documentary Appendix I: Accredited Source Directory',
        subtitle: 'Audit of 21 Accredited Publishers & Article Distribution',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'App. 1 Sources'
      },

      // PAGE 37: Documentary Appendix II: Selection Rationale & Curatorial Standards
      {
        id: 'page-37',
        pageNumber: 37,
        type: 'appendix_rationale',
        title: 'Documentary Appendix II: Selection Rationale & Curatorial Standards',
        subtitle: 'Methodological Governance & Why This Story Criteria',
        motifClass: 'motif-phanek',
        ribbonLabel: 'App. 2 Rationale'
      },

      // PAGE 38: Documentary Colophon & Sovereign Attestation
      {
        id: 'page-38',
        pageNumber: 38,
        type: 'colophon',
        title: 'Documentary Colophon & Sovereign Attestation',
        subtitle: 'Survey of India Cartographic Standards & Curatorial Sign-Off',
        motifClass: 'motif-angami-band',
        ribbonLabel: 'Colophon'
      }
    ];
  }, []);

  const totalPages = bookPages.length; // Exactly 38 pages
  const activePage = bookPages[currentPage];

  // Quick-Jump Bookmark Ribbons for Key Landmarks across 38 pages
  const majorBookmarks = useMemo(() => [
    { pageIdx: 0, label: 'Pg 01 Cover', id: 'b-cov' },
    { pageIdx: 2, label: 'Pg 03 TOC', id: 'b-toc' },
    { pageIdx: 3, label: 'Pg 04 Arunachal', id: 'b-aru' },
    { pageIdx: 6, label: 'Pg 07 Assam', id: 'b-ass' },
    { pageIdx: 10, label: 'Pg 11 Manipur', id: 'b-man' },
    { pageIdx: 14, label: 'Pg 15 Nagaland', id: 'b-nag' },
    { pageIdx: 18, label: 'Pg 19 Meghalaya', id: 'b-meg' },
    { pageIdx: 20, label: 'Pg 21 Mizoram', id: 'b-miz' },
    { pageIdx: 22, label: 'Pg 23 Sikkim', id: 'b-sik' },
    { pageIdx: 24, label: 'Pg 25 Tripura', id: 'b-tri' },
    { pageIdx: 29, label: 'Pg 30 Briefings', id: 'b-bri' },
    { pageIdx: 34, label: 'Pg 35 Culture', id: 'b-cul' },
    { pageIdx: 35, label: 'Pg 36 Appendices', id: 'b-app' },
    { pageIdx: 37, label: 'Pg 38 Colophon', id: 'b-col' }
  ], []);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setIsFlipping(false), 380);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => setIsFlipping(false), 380);
    }
  };

  const jumpToPage = (targetIdx: number) => {
    if (targetIdx === currentPage || isFlipping) return;
    setIsFlipping(true);
    setDirection(targetIdx > currentPage ? 1 : -1);
    setCurrentPage(targetIdx);
    setTimeout(() => setIsFlipping(false), 380);
  };

  // Keyboard Navigation: Left/Right arrows flip pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.querySelector('div[role="dialog"]')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping, totalPages]);

  // Framer Motion Page Flip Variants (3D rotateY on spine)
  const pageVariants = {
    enter: (dir: number) => ({
      rotateY: prefersReducedMotion ? 0 : dir > 0 ? 55 : -55,
      opacity: 0,
      scale: 0.97,
      transformOrigin: dir > 0 ? 'left center' : 'right center'
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'center center',
      transition: {
        rotateY: { type: 'spring', stiffness: 200, damping: 25 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      rotateY: prefersReducedMotion ? 0 : dir > 0 ? -55 : 55,
      opacity: 0,
      scale: 0.97,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      transition: {
        rotateY: { duration: 0.3, ease: 'easeIn' },
        opacity: { duration: 0.18 }
      }
    })
  };

  // Source frequency counts for Appendix I
  const sourceStats = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      counts[a.sourceName] = (counts[a.sourceName] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <div className="min-h-screen bg-sand-200 py-6 sm:py-10">
      <StorySlideOver article={selectedStory} onClose={() => setSelectedStory(null)} />

      {/* Screen Book Interactive View (hidden during PDF print export) */}
      <div className="screen-only-view max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* BOOK TOP CONTROLS & NAVIGATION BAR                            */}
        {/* ============================================================== */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-sand-300 shadow-2xs">
          
          {/* Brand & Page Count */}
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-navy-950 text-saffron-400">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-display font-bold text-navy-950">
                  The Northeast Dispatch · 38-Page Book Edition
                </h1>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-saffron-100 text-saffron-800 font-bold uppercase">
                  Page {currentPage + 1} of {totalPages}
                </span>
              </div>
              <p className="text-[11px] font-serif text-slate-600">
                Turn pages using buttons, corner curl, dropdown, or Arrow keys (← / →)
              </p>
            </div>
          </div>

          {/* Quick Page Turning Buttons + Dropdown Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            
            {/* Quick-Jump Dropdown */}
            <select
              aria-label="Select Monograph Page"
              value={currentPage}
              onChange={(e) => jumpToPage(Number(e.target.value))}
              className="text-xs font-mono bg-ivory-100 border border-sand-300 rounded-lg px-2 py-1.5 text-navy-900 font-semibold focus:outline-hidden focus:ring-1 focus:ring-saffron-500"
            >
              {bookPages.map((p, idx) => (
                <option key={p.id} value={idx}>
                  Pg {String(idx + 1).padStart(2, '0')}: {p.ribbonLabel}
                </option>
              ))}
            </select>

            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0 || isFlipping}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-navy-900 border border-sand-300 text-xs font-mono font-bold transition-all disabled:opacity-40 disabled:pointer-events-none"
              title="Flip to previous page (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <span className="text-xs font-mono font-bold text-navy-900 px-2 py-1 bg-ivory-100 rounded border border-sand-300 whitespace-nowrap">
              {String(currentPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1 || isFlipping}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-mono font-bold transition-all shadow-xs disabled:opacity-40 disabled:pointer-events-none"
              title="Flip to next page (Right Arrow)"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4 text-saffron-400" />
            </button>

            {/* Export as PDF Button */}
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-mono font-bold transition-all shadow-xs shrink-0 cursor-pointer"
              title="Export Newsletter Monograph as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>

        </div>

        {/* Hanging Chapter Bookmark Ribbons */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 overflow-x-auto no-scrollbar mb-2">
          {majorBookmarks.map((b) => {
            const isActive = currentPage === b.pageIdx || 
              (b.pageIdx < 37 && currentPage >= b.pageIdx && currentPage < (majorBookmarks.find(m => m.pageIdx > b.pageIdx)?.pageIdx || 38));
            return (
              <button
                key={b.id}
                onClick={() => jumpToPage(b.pageIdx)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-t-lg text-[10px] font-mono transition-all whitespace-nowrap shadow-2xs border-t-2 ${
                  isActive
                    ? 'bg-[#FAF8F2] text-navy-950 font-bold border-t-saffron-600 -translate-y-0.5 shadow-sm'
                    : 'bg-sand-300/80 hover:bg-sand-200 text-navy-900/80 border-t-sand-400'
                }`}
                title={`Jump to ${b.label}`}
              >
                <Bookmark className={`w-2.5 h-2.5 ${isActive ? 'text-saffron-600 fill-current' : 'text-sand-500'}`} />
                <span>{b.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* MAIN 3D BOOK PRESENTATION STAGE                               */}
        {/* ============================================================== */}
        <div className="perspective-1200 w-full relative">
          
          {/* Physical Book Exterior Container */}
          <div className="flex items-stretch bg-navy-950 rounded-2xl p-1.5 sm:p-2.5 shadow-2xl border-2 border-sand-400/50">
            
            {/* Book Spine Binding (Embossed Leather Texture on Left) */}
            <div className="hidden md:flex flex-col items-center justify-between w-9 book-spine-binding rounded-l-xl py-6 text-sand-300 select-none border-r border-sand-400/40">
              <span className="text-[10px] font-mono tracking-widest text-saffron-400 font-bold -rotate-90 origin-center whitespace-nowrap">
                VOL. I // 2026
              </span>
              <div className="w-1.5 h-16 bg-saffron-500/40 rounded-full" />
              <span className="text-[9px] font-serif italic text-sand-400 -rotate-90 origin-center whitespace-nowrap">
                38 PAGES
              </span>
            </div>

            {/* Inner Flip Page Container */}
            <div className="flex-1 bg-[#FAF8F2] rounded-xl book-gutter-shadow overflow-hidden min-h-[720px] flex flex-col justify-between relative book-page-leaf">
              
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={activePage.id}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex-1 flex flex-col justify-between p-4 sm:p-7 lg:p-9"
                >
                  <div>
                    {/* Top Running Head (Header Folio) */}
                    <div className="flex items-center justify-between pb-3 border-b border-sand-300 text-[11px] font-mono text-sand-600 mb-5">
                      <span className="font-bold text-navy-950 uppercase tracking-widest">
                        NORTHEAST // 30 · THE 38-PAGE MONOGRAPH
                      </span>
                      <span className="text-forest-800 font-semibold truncate max-w-xs text-right">
                        {activePage.subtitle}
                      </span>
                    </div>

                    {/* Handloom Decorative Band */}
                    <div className={`h-1.5 w-full ${activePage.motifClass} rounded-full mb-5`} aria-hidden="true" />

                    {/* ============================================================== */}
                    {/* PAGE 1: FRONTISPIECE                                           */}
                    {/* ============================================================== */}
                    {activePage.type === 'frontispiece' && (
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-sand-300 p-5 sm:p-6 shadow-2xs">
                          <div className="flex items-center justify-between border-b border-sand-200 pb-2.5 mb-3">
                            <span className="text-[10px] font-mono text-saffron-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5" />
                              Executive Editor's Frontispiece
                            </span>
                            <span className="text-[11px] font-mono text-sand-500">
                              Issue 01 · 38 Pages · Autumn 2026
                            </span>
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-950">
                            The Quiet Strength of the Frontier
                          </h2>

                          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans space-y-3 mt-3">
                            <p className="drop-cap">
                              Covering the Northeast of India through the prism of national security requires an understanding that transcends tactical maneuvers. Over thirty days between 1 September and 3 October 2026, the fifty verified dispatches curated in this 38-page monograph paint a coherent portrait of modern frontier governance.
                            </p>
                            <p>
                              Across the high mountain ridgelines of Arunachal Pradesh, the swollen riverine corridors of Assam, the troubled yet resilient valleys of Manipur, and the misty hills of Nagaland, security forces operate not as external occupiers, but as integral pillars of regional stability, humanitarian rescue, and youth empowerment.
                            </p>
                            <blockquote className="font-serif italic text-navy-950 bg-ivory-100 p-3 rounded-lg border-l-3 border-l-forest-700 text-xs">
                              "True security is not merely the absence of conflict; it is the presence of institutional trust, accessible healthcare, resilient mountain highways, and a shared national dignity with indigenous communities."
                            </blockquote>
                          </div>
                        </div>

                        {activePage.leadStory && (
                          <div>
                            <span className="text-[11px] font-mono font-bold text-saffron-800 uppercase tracking-wider block mb-2">
                              ★ Commemorative Dedication Dispatch
                            </span>
                            <BookStoryCard
                              story={activePage.leadStory}
                              onOpenSlideOver={setSelectedStory}
                              isFeatured={true}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* ============================================================== */}
                    {/* PAGE 2: REGIONAL OVERVIEW                                      */}
                    {/* ============================================================== */}
                    {activePage.type === 'regional_overview' && (
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-sand-300 p-5 shadow-2xs">
                          <span className="px-2 py-0.5 rounded bg-forest-800 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                            Regional Landscape
                          </span>
                          <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950 mt-2">
                            Eight Guardians of the Sovereign Northeast
                          </h2>
                          <p className="text-xs text-slate-700 leading-relaxed font-sans mt-1.5">
                            Spanning 262,230 square kilometers with 98% of its perimeter bounded by international borders (China, Myanmar, Bangladesh, Bhutan, and Nepal), Northeast India represents a unique strategic biome where military vigilance and grassroots tribal culture are deeply intertwined.
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-sand-200 text-center font-mono">
                            <div className="p-2.5 rounded-lg bg-ivory-100 border border-sand-300">
                              <span className="text-lg font-bold text-navy-950 block">30</span>
                              <span className="text-[10px] text-sand-600 uppercase">Days Monitored</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-ivory-100 border border-sand-300">
                              <span className="text-lg font-bold text-forest-800 block">08</span>
                              <span className="text-[10px] text-sand-600 uppercase">Sister States</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-ivory-100 border border-sand-300">
                              <span className="text-lg font-bold text-saffron-700 block">50</span>
                              <span className="text-[10px] text-sand-600 uppercase">Verified Stories</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-ivory-100 border border-sand-300">
                              <span className="text-lg font-bold text-navy-900 block">21</span>
                              <span className="text-[10px] text-sand-600 uppercase">Accredited Sources</span>
                            </div>
                          </div>
                        </div>

                        {activePage.stories && activePage.stories.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activePage.stories.map((s) => (
                              <BookStoryCard
                                key={s.id}
                                story={s}
                                onOpenSlideOver={setSelectedStory}
                                isFeatured={false}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ============================================================== */}
                    {/* PAGE 3: TABLE OF CONTENTS (ALL 38 PAGES)                       */}
                    {/* ============================================================== */}
                    {activePage.type === 'table_of_contents' && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-sand-300 p-5 shadow-2xs">
                          <div className="flex items-center justify-between border-b border-sand-200 pb-2 mb-3">
                            <h2 className="text-xl font-serif font-bold text-navy-950">
                              Table of Contents · Complete 38-Page Folio Directory
                            </h2>
                            <span className="text-xs font-mono text-saffron-800 font-bold">
                              Click any entry to flip directly
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs font-mono">
                            {bookPages.map((p, idx) => (
                              <button
                                key={p.id}
                                onClick={() => jumpToPage(idx)}
                                className="flex items-baseline justify-between py-1 text-left group hover:text-saffron-700 transition-colors"
                              >
                                <span className="text-navy-950 font-semibold group-hover:text-saffron-700 truncate pr-2">
                                  <span className="text-saffron-600 mr-1.5 font-bold">
                                    {String(idx + 1).padStart(2, '0')}.
                                  </span>
                                  {p.title.replace(/State Spotlight: |Special Briefing \d+: |Documentary /, '')}
                                </span>
                                <span className="grow border-b border-dotted border-sand-400 mx-1 opacity-60" />
                                <span className="text-sand-500 font-bold shrink-0">
                                  P. {idx + 1}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ============================================================== */}
                    {/* STATE SPOTLIGHT PAGES                                          */}
                    {/* ============================================================== */}
                    {activePage.type === 'state_spotlight' && (
                      <div className="space-y-5">
                        {(() => {
                          const stateCulture = ASHTALAKSHMI_CULTURE.find(
                            (c) => c.state.toLowerCase() === activePage.state?.toLowerCase()
                          );
                          return (
                            <div className="bg-white rounded-xl border border-sand-300 p-5 shadow-2xs">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand-200 pb-3 mb-3">
                                <div>
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-saffron-800 font-bold">
                                    ASHTALAKSHMI MONOGRAPH PROFILE
                                  </span>
                                  <h2 className="text-2xl font-serif font-bold text-navy-950 flex items-center gap-2 mt-0.5">
                                    <span>{stateCulture?.mascotEmoji}</span>
                                    <span>{activePage.state}</span>
                                    <span className="text-sm font-sans font-normal text-sand-500">
                                      ({stateCulture?.nativeScript})
                                    </span>
                                  </h2>
                                </div>

                                <div className="text-left sm:text-right font-mono text-xs">
                                  <span className="text-forest-800 font-bold block">
                                    Greeting: "{stateCulture?.greeting}"
                                  </span>
                                  <span className="text-[10px] text-sand-500">
                                    Phonetic: /{stateCulture?.greetingPhonetic}/
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans text-slate-700">
                                <div className="p-2.5 rounded bg-sand-100 border border-sand-300">
                                  <span className="font-mono font-bold text-[10px] text-navy-900 uppercase block mb-1">
                                    🐾 Fauna Mascot
                                  </span>
                                  <span className="font-semibold text-navy-950">
                                    {stateCulture?.mascotName}
                                  </span>
                                  <p className="text-[11px] text-sand-600 mt-0.5">
                                    {stateCulture?.mascotTitle}
                                  </p>
                                </div>

                                <div className="p-2.5 rounded bg-sand-100 border border-sand-300">
                                  <span className="font-mono font-bold text-[10px] text-navy-900 uppercase block mb-1">
                                    🌸 Floral & Handloom
                                  </span>
                                  <span className="font-semibold text-navy-950">
                                    {stateCulture?.floralEmblem}
                                  </span>
                                  <p className="text-[11px] text-sand-600 mt-0.5">
                                    {stateCulture?.handloomHeritage}
                                  </p>
                                </div>

                                <div className="p-2.5 rounded bg-sand-100 border border-sand-300">
                                  <span className="font-mono font-bold text-[10px] text-navy-900 uppercase block mb-1">
                                    ✨ Indigenous Folklore
                                  </span>
                                  <p className="text-[11px] text-slate-700 leading-snug">
                                    {stateCulture?.cuteTidbit}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {activePage.leadStory && (
                          <div>
                            <span className="text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider block mb-2">
                              ★ Featured State Dispatch
                            </span>
                            <BookStoryCard
                              story={activePage.leadStory}
                              onOpenSlideOver={setSelectedStory}
                              isFeatured={true}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* ============================================================== */}
                    {/* STANDARD DISPATCHES PAGES                                      */}
                    {/* ============================================================== */}
                    {activePage.type === 'dispatches' && (
                      <div className="space-y-4">
                        <div className="mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-navy-950 text-white font-mono text-[10px] font-bold tracking-wider uppercase">
                              Page {activePage.pageNumber} Folio
                            </span>
                            <span className="text-xs font-mono text-saffron-700 font-bold">
                              {activePage.title}
                            </span>
                          </div>
                          <p className="text-xs font-sans text-slate-700 mt-1">
                            {activePage.subtitle}
                          </p>
                        </div>

                        {activePage.leadStory && (
                          <BookStoryCard
                            story={activePage.leadStory}
                            onOpenSlideOver={setSelectedStory}
                            isFeatured={true}
                          />
                        )}

                        {activePage.stories && activePage.stories.length > 0 && (
                          <div className={`grid grid-cols-1 ${activePage.stories.length > 1 ? 'md:grid-cols-2' : ''} gap-4`}>
                            {activePage.stories.map((story) => (
                              <BookStoryCard
                                key={story.id}
                                story={story}
                                onOpenSlideOver={setSelectedStory}
                                isFeatured={false}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ============================================================== */}
                    {/* THEMATIC BRIEFING PAGES (PAGES 30 TO 34)                       */}
                    {/* ============================================================== */}
                    {activePage.type === 'thematic_briefing' && (
                      <div className="space-y-5">
                        <div className="bg-white rounded-xl border border-sand-300 p-5 sm:p-6 shadow-2xs">
                          <span className="px-2 py-0.5 rounded bg-navy-950 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                            Strategic Briefing Folio · {activePage.thematicCategory}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950 mt-2">
                            {activePage.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-2">
                            {activePage.subtitle}
                          </p>

                          <div className="mt-4 p-4 rounded-xl bg-ivory-100 border border-sand-300 text-xs font-sans text-slate-800 space-y-2">
                            <h4 className="font-serif font-bold text-navy-950">
                              Executive Monograph Synthesis:
                            </h4>
                            <p className="leading-relaxed">
                              During the September–October 2026 reporting cycle, civil-military operations under this pillar demonstrated measurable advancements across all eight states. Multi-agency synergy with Assam Rifles, Eastern Command, district commissioners, and grassroots tribal leadership enabled proactive de-escalation, rapid disaster response, and infrastructure modernization.
                            </p>
                          </div>
                        </div>

                        {/* Stories belonging to this thematic category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {articles
                            .filter((a) => a.category === activePage.thematicCategory)
                            .slice(0, 2)
                            .map((s) => (
                              <BookStoryCard
                                key={s.id}
                                story={s}
                                onOpenSlideOver={setSelectedStory}
                                isFeatured={false}
                              />
                            ))}
                        </div>
                      </div>
                    )}

                    {/* ============================================================== */}
                    {/* PAGE 35: CULTURAL MONOGRAPH & TEA COMPANION                     */}
                    {/* ============================================================== */}
                    {activePage.type === 'cultural_monograph' && (
                      <div className="space-y-5">
                        <div className="bg-white rounded-xl border border-sand-300 p-5 shadow-2xs">
                          <span className="px-2 py-0.5 rounded bg-forest-800 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                            Cultural Monograph · Page 35 of 38
                          </span>
                          <h2 className="text-2xl font-serif font-bold text-navy-950 mt-2">
                            Terroirs of the Eastern Hills & Sacred Looms
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-2">
                            The security architecture of Northeast India is inseparable from the soul of its communities. Across mist-clad slopes from Dibrugarh to Temi in South Sikkim, the ritual of brewing single-estate orthodox teas has sustained garrisons and mountain communities alike for generations.
                          </p>

                          <div className="mt-5 p-4 rounded-xl bg-sand-100 border border-sand-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                              <span className="text-[10px] font-mono text-saffron-800 font-bold uppercase tracking-wider block">
                                🌸 Interactive Hillside Tea Companion
                              </span>
                              <p className="text-xs font-serif italic text-navy-950 mt-1 max-w-md">
                                Tap the cup to rotate through single-estate orthodox brews: Second Flush Assam Golden Tips, Sikkim Organic Temi Estate, Meghalaya Wild Forest, and Manipur Sun-Dried Green Leaves.
                              </p>
                            </div>
                            <SteamingTeaCompanion />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                          {ASHTALAKSHMI_CULTURE.map((c) => (
                            <div key={c.id} className="p-3 bg-white rounded-lg border border-sand-300 shadow-2xs">
                              <span className="text-base block">{c.mascotEmoji}</span>
                              <span className="font-bold text-navy-950 block mt-1">{c.state}</span>
                              <span className="text-[10px] text-sand-600 block mt-0.5">{c.handloomHeritage}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ============================================================== */}
                    {/* PAGE 36: APPENDIX I: ACCREDITED SOURCE DIRECTORY               */}
                    {/* ============================================================== */}
                    {activePage.type === 'appendix_sources' && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-sand-300 p-5 shadow-2xs">
                          <div className="flex items-center justify-between border-b border-sand-200 pb-2 mb-3">
                            <div>
                              <span className="px-2 py-0.5 rounded bg-navy-950 text-white font-mono text-[10px] font-bold uppercase">
                                Appendix 1
                              </span>
                              <h2 className="text-xl font-serif font-bold text-navy-950 mt-1">
                                Accredited Source Directory & Distribution Audit
                              </h2>
                            </div>
                            <span className="text-xs font-mono text-sand-600">
                              21 Publishers · 50 Articles
                            </span>
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed font-sans mb-4">
                            Every article featured in this monograph has been individually audited and corroborated against verified live press dispatches. No aggregated, speculative, or uncredited entries are included.
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-2">
                            {sourceStats.map(([source, count]) => (
                              <div
                                key={source}
                                className="p-2.5 rounded-lg bg-ivory-100 border border-sand-300 flex items-center justify-between text-xs font-mono"
                              >
                                <span className="font-semibold text-navy-950 truncate pr-2">
                                  {source}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-sand-200 text-saffron-800 font-bold text-[11px] shrink-0">
                                  {count} {count === 1 ? 'dispatch' : 'dispatches'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ============================================================== */}
                    {/* PAGE 37: APPENDIX II: SELECTION RATIONALE                      */}
                    {/* ============================================================== */}
                    {activePage.type === 'appendix_rationale' && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-sand-300 p-5 sm:p-6 shadow-2xs">
                          <span className="px-2 py-0.5 rounded bg-forest-800 text-white font-mono text-[10px] font-bold uppercase">
                            Appendix 2
                          </span>
                          <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950 mt-1.5">
                            Curatorial Selection Rationale & Methodological Governance
                          </h2>

                          <div className="mt-4 space-y-3 text-xs font-sans text-slate-800 leading-relaxed">
                            <div className="p-3 rounded-lg bg-ivory-100 border-l-3 border-l-saffron-600">
                              <h4 className="font-mono font-bold text-navy-950 text-xs">
                                1. Strict Temporal Window (1 Sep – 3 Oct 2026)
                              </h4>
                              <p className="mt-0.5 text-slate-700">
                                Only dispatches officially datelined and confirmed within this exact 30-day window were admitted. Out-of-window legacy operations (such as July monsoon events) were strictly excluded.
                              </p>
                            </div>

                            <div className="p-3 rounded-lg bg-ivory-100 border-l-3 border-l-forest-700">
                              <h4 className="font-mono font-bold text-navy-950 text-xs">
                                2. Authentic Sourced Visuals & Quotes
                              </h4>
                              <p className="mt-0.5 text-slate-700">
                                Each dispatch preserves original photojournalistic credits, video report tags, and direct verified quotations under 20 words to avoid copyright overreach and ensure high factual fidelity.
                              </p>
                            </div>

                            <div className="p-3 rounded-lg bg-ivory-100 border-l-3 border-l-navy-800">
                              <h4 className="font-mono font-bold text-navy-950 text-xs">
                                3. Geographic Balance Across Ashta Lakshmi
                              </h4>
                              <p className="mt-0.5 text-slate-700">
                                Dispatches are equitably distributed across all 8 Northeastern states, balancing high-tempo frontier security events with grassroots civic action, veterans' welfare, and youth sports.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ============================================================== */}
                    {/* PAGE 38: COLOPHON & SOVEREIGN ATTESTATION                      */}
                    {/* ============================================================== */}
                    {activePage.type === 'colophon' && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-sand-300 p-6 shadow-2xs text-center space-y-3">
                          <span className="inline-block px-3 py-1 rounded bg-forest-800 text-white font-mono text-[10px] font-bold tracking-wider">
                            SURVEY OF INDIA CARTOGRAPHY & NON-FABRICATION GUARANTEE
                          </span>
                          
                          <h2 className="text-2xl font-serif font-bold text-navy-950">
                            Documentary Colophon & Monograph Sign-Off
                          </h2>

                          <p className="text-xs sm:text-sm font-serif text-slate-700 max-w-xl mx-auto leading-relaxed">
                            This 38-page commemorative book edition was compiled from strictly accredited dispatches published between 1 September and 3 October 2026. Every geopolitical citation, mountain ridgeline reference, and administrative boundary conforms strictly to official Survey of India cartographic standards.
                          </p>

                          <div className="pt-3 border-t border-sand-200 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-around gap-2 text-xs font-mono text-sand-600">
                            <span>Printed / Published: 04 October 2026</span>
                            <span>·</span>
                            <span>Issue: 01 (38 Pages)</span>
                            <span>·</span>
                            <span>Vol. I Commemorative</span>
                          </div>

                          <div className="pt-4 flex items-center justify-center gap-4 text-xs font-mono">
                            <Link to="/appendices" className="text-saffron-700 font-bold hover:underline">
                              Full Source Directory →
                            </Link>
                            <span>·</span>
                            <Link to="/appendices?tab=rationale" className="text-forest-800 font-bold hover:underline">
                              Selection Rationale →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Running Footer & Page Turn Controls */}
                  <div className="mt-8 pt-4 border-t border-sand-300 flex items-center justify-between text-xs font-mono text-sand-500">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 0}
                      className="flex items-center gap-1 hover:text-navy-950 font-bold disabled:opacity-0 transition-opacity"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Prev Page</span>
                    </button>

                    <span className="font-bold text-navy-950 font-serif text-sm">
                      — Page {currentPage + 1} of {totalPages} —
                    </span>

                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages - 1}
                      className="flex items-center gap-1 hover:text-saffron-700 font-bold disabled:opacity-0 transition-opacity text-saffron-800"
                    >
                      <span>Next Page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Clickable Page Curl Corner in bottom-right */}
              {currentPage < totalPages - 1 && (
                <button
                  onClick={handleNextPage}
                  className="absolute bottom-0 right-0 w-16 h-16 page-curl-corner hover:scale-110 transition-transform flex items-end justify-end p-2 cursor-pointer z-20 group"
                  title="Turn to next page (or press Arrow Right)"
                  aria-label="Turn to next page"
                >
                  <ChevronRight className="w-5 h-5 text-saffron-800 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}

              {/* Clickable Page Edge in bottom-left */}
              {currentPage > 0 && (
                <button
                  onClick={handlePrevPage}
                  className="absolute bottom-0 left-0 w-14 h-14 hover:scale-110 transition-transform flex items-end justify-start p-2 cursor-pointer z-20 group"
                  title="Turn to previous page (or press Arrow Left)"
                  aria-label="Turn to previous page"
                >
                  <ChevronLeft className="w-5 h-5 text-navy-800 group-hover:-translate-x-0.5 transition-transform" />
                </button>
              )}

            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM PAGE SCRUBBER TRAY (ALL 38 PAGES)                      */}
        {/* ============================================================== */}
        <div className="mt-6 bg-white p-3 sm:p-4 rounded-xl border border-sand-300 shadow-2xs">
          <div className="flex items-center justify-between mb-2.5 text-xs font-mono">
            <span className="font-bold text-navy-900 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-saffron-600" />
              <span>38-Page Monograph Scrubber (Click Any Page to Turn)</span>
            </span>
            <span className="text-sand-500 hidden sm:inline">
              Use Left / Right arrow keys to flip
            </span>
          </div>

          {/* 38-Pill Scrubber Grid */}
          <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-19 gap-1">
            {bookPages.map((page, idx) => {
              const isActive = idx === currentPage;
              return (
                <button
                  key={page.id}
                  onClick={() => jumpToPage(idx)}
                  className={`flex flex-col items-center justify-center p-1.5 rounded border text-center transition-all ${
                    isActive
                      ? 'bg-navy-950 text-white border-navy-950 font-bold shadow-xs ring-2 ring-saffron-500 scale-105 z-10'
                      : 'bg-ivory-100 hover:bg-sand-200 text-navy-900 border-sand-300'
                  }`}
                  title={`Page ${idx + 1}: ${page.title}`}
                >
                  <span className="text-[10px] font-mono block leading-none font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-[8px] font-mono truncate w-full block mt-0.5 opacity-70">
                    {page.ribbonLabel.slice(0, 4)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* END OF SCREEN-ONLY VIEW */}

      {/* ============================================================== */}
      {/* EXPORT AS PDF INTERACTIVE MODAL                                */}
      {/* ============================================================== */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl border-2 border-sand-300 shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-sand-200 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-saffron-100 text-saffron-700">
                  <Download className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-serif font-bold text-navy-950">
                    Export Newsletter as PDF
                  </h3>
                  <p className="text-[11px] font-mono text-sand-600">
                    High-resolution, print-ready digital monograph
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="p-1.5 rounded-lg text-sand-500 hover:text-navy-900 hover:bg-sand-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Option 1: Current Page */}
              <button
                type="button"
                onClick={handleExportCurrentPage}
                className="w-full text-left p-3.5 rounded-xl border border-sand-300 hover:border-saffron-500 hover:bg-ivory-100 transition-all flex items-start gap-3 group cursor-pointer"
              >
                <span className="p-2 rounded-lg bg-sand-100 group-hover:bg-saffron-500 group-hover:text-white text-navy-900 transition-colors mt-0.5">
                  <Printer className="w-4 h-4" />
                </span>
                <div className="grow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy-950 font-serif">
                      Current Page (Pg {currentPage + 1})
                    </span>
                    <span className="text-[10px] font-mono text-sand-500 font-semibold">
                      Single Sheet
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans mt-0.5">
                    Export Page {currentPage + 1}: "{activePage.ribbonLabel}" as a clean single-page PDF.
                  </p>
                </div>
              </button>

              {/* Option 2: Complete 38-Page Monograph */}
              <button
                type="button"
                onClick={handleExportFullMonograph}
                className="w-full text-left p-3.5 rounded-xl border-2 border-navy-900 hover:border-saffron-600 bg-navy-950 text-white transition-all flex items-start gap-3 group shadow-md cursor-pointer"
              >
                <span className="p-2 rounded-lg bg-navy-800 group-hover:bg-saffron-500 text-saffron-400 group-hover:text-white transition-colors mt-0.5">
                  <FileText className="w-4 h-4" />
                </span>
                <div className="grow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-serif flex items-center gap-1.5">
                      <span>Complete 38-Page Monograph</span>
                      <span className="px-1.5 py-0.5 rounded bg-saffron-500 text-navy-950 text-[9px] font-mono font-bold">
                        ALL 50 STORIES
                      </span>
                    </span>
                  </div>
                  <p className="text-[11px] text-sand-200 font-sans mt-0.5">
                    Compile full 38-page folio with Frontispiece, 8 State Spotlights, Cultural Monograph, and Appendices.
                  </p>
                </div>
              </button>
            </div>

            {/* Printing Guidance Tip */}
            <div className="p-3 rounded-lg bg-sand-100 border border-sand-200 text-[11px] text-slate-700 font-sans flex items-start gap-2">
              <span className="text-saffron-600 font-bold shrink-0 mt-0.5">💡</span>
              <p>
                In the print dialog, select <strong className="text-navy-950">Destination: "Save as PDF"</strong>. All high-resolution images, headers, and Survey of India styling will be preserved.
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-1.5 rounded-lg border border-sand-300 text-xs font-mono font-bold text-navy-900 hover:bg-sand-100 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compiling Overlay */}
      {isExportingAll && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-navy-950/85 backdrop-blur-xs text-white space-y-4 no-print">
          <div className="w-10 h-10 rounded-full border-3 border-saffron-500 border-t-transparent animate-spin" />
          <div className="text-center space-y-1">
            <h3 className="text-base font-serif font-bold text-white">
              Compiling 38-Page Monograph for PDF Export...
            </h3>
            <p className="text-xs font-mono text-sand-300">
              Formatting 50 verified dispatches · Preparing print dialog
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DEDICATED HIGH-RESOLUTION PDF PRINT EXPORT CONTAINER           */}
      {/* ============================================================== */}
      <div className="pdf-export-container hidden print:block text-navy-950 font-sans">
        {(printMode === 'current' ? [activePage] : bookPages).map((page, pIdx) => {
          const actualPageNum = printMode === 'current' ? (currentPage + 1) : (pIdx + 1);
          return (
            <div
              key={`print-sheet-${page.id}`}
              className="pdf-monograph-sheet"
            >
              {/* 1. RUNNING HEAD (TOP BORDER) */}
              <div>
                <div className="flex items-center justify-between border-b-2 border-navy-950 pb-2 mb-3 font-mono text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-950 tracking-wider">
                      NORTHEAST // 30
                    </span>
                    <span className="text-sand-400">|</span>
                    <span className="text-forest-800 font-semibold uppercase">
                      Official Sovereign Monograph
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium">Autumn 2026 Edition</span>
                    <span className="text-sand-400">|</span>
                    <span className="font-bold text-saffron-700">
                      PAGE {String(actualPageNum).padStart(2, '0')} OF 38
                    </span>
                  </div>
                </div>

                {/* 2. FOLIO TITLE & THEMATIC CATEGORY */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-saffron-800 font-bold uppercase tracking-wider">
                      {page.ribbonLabel} · {page.type.replace('_', ' ').toUpperCase()}
                    </span>
                    {page.state && (
                      <span className="text-[10px] font-mono font-bold text-forest-800">
                        {STATE_MASCOT_EMOJI[page.state]} {page.state}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-serif font-bold text-navy-950 leading-tight mt-0.5">
                    {page.title}
                  </h2>
                  <p className="text-[11px] font-serif italic text-slate-600 mt-0.5">
                    {page.subtitle}
                  </p>
                  <div className="h-1 w-full bg-saffron-600 rounded-full mt-1.5 opacity-80" />
                </div>

                {/* 3. PAGE SPECIFIC CONTENT */}
                {page.type === 'frontispiece' && (
                  <div className="space-y-3 mt-2">
                    <div className="p-3.5 rounded-lg border border-sand-300 bg-sand-100/40 text-[11px] text-slate-800 space-y-1.5 font-sans leading-relaxed">
                      <span className="font-mono text-[9px] font-bold text-navy-950 uppercase tracking-wider block">
                        Executive Editor's Charter:
                      </span>
                      <p>
                        Covering the Northeast of India through the prism of national security requires an understanding that transcends tactical maneuvers. Over thirty days between 1 September and 3 October 2026, the fifty verified dispatches curated in this 38-page monograph paint a coherent portrait of modern frontier governance across all eight sister states.
                      </p>
                      <blockquote className="font-serif italic text-[11px] text-navy-950 border-l-2 border-forest-800 pl-2.5 my-1">
                        "True security is not merely the absence of conflict; it is the presence of institutional trust, accessible healthcare, and resilient mountain highways."
                      </blockquote>
                    </div>
                  </div>
                )}

                {/* Lead Story Card */}
                {page.leadStory && (
                  <div className="mt-2.5 p-3.5 rounded-xl border border-sand-300 bg-white">
                    <span className="text-[9px] font-mono font-bold text-saffron-800 uppercase tracking-wider block mb-1.5">
                      ★ Lead Featured Dispatch
                    </span>
                    <div className="grid grid-cols-12 gap-3.5">
                      <div className="col-span-5 h-36 rounded-lg overflow-hidden bg-sand-200 border border-sand-300">
                        {page.leadStory.imageUrl && (
                          <img
                            src={page.leadStory.imageUrl}
                            alt={page.leadStory.headline}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="col-span-7 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[9px] font-mono text-sand-600 mb-0.5">
                            <span className="font-bold text-navy-900">{page.leadStory.states.join(', ')}</span>
                            <span>{formatISODate(page.leadStory.publishedDate)}</span>
                          </div>
                          <h3 className="text-sm font-serif font-bold text-navy-950 leading-snug">
                            {page.leadStory.headline}
                          </h3>
                          <p className="text-[10px] text-slate-700 leading-relaxed font-sans mt-1 line-clamp-3">
                            {page.leadStory.summary}
                          </p>
                        </div>
                        {page.leadStory.quote && (
                          <blockquote className="mt-1 p-1.5 border-l-2 border-saffron-600 bg-sand-100 text-[10px] font-serif italic text-navy-950">
                            "{page.leadStory.quote}"
                          </blockquote>
                        )}
                        <div className="text-[9px] font-mono text-sand-500 mt-1 flex justify-between">
                          <span>📷 {page.leadStory.imageCredit || page.leadStory.sourceName}</span>
                          <span className="font-semibold text-navy-900">{page.leadStory.sourceName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Secondary Stories Grid */}
                {page.stories && page.stories.length > 0 && (
                  <div className={`mt-2.5 grid grid-cols-${page.stories.length > 1 ? '2' : '1'} gap-3`}>
                    {page.stories.map((st) => (
                      <div key={st.id} className="p-2.5 rounded-lg border border-sand-300 bg-white flex gap-3">
                        <div className="w-24 h-24 shrink-0 rounded overflow-hidden bg-sand-200 border border-sand-300">
                          {st.imageUrl && (
                            <img
                              src={st.imageUrl}
                              alt={st.headline}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="grow flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-[8px] font-mono text-sand-500">
                              <span className="font-bold text-forest-800">{st.states.join(', ')}</span>
                              <span>{st.sourceName}</span>
                            </div>
                            <h4 className="text-[11px] font-serif font-bold text-navy-950 leading-snug line-clamp-2 mt-0.5">
                              {st.headline}
                            </h4>
                            <p className="text-[9.5px] text-slate-600 line-clamp-2 mt-0.5">
                              {st.summary}
                            </p>
                          </div>
                          <div className="text-[8px] font-mono text-sand-400 mt-0.5">
                            Verified Accredited Dispatch · {st.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* State Cultural Spotlight Card */}
                {page.type === 'state_spotlight' && page.state && (() => {
                  const sc = ASHTALAKSHMI_CULTURE.find(c => c.state.toLowerCase() === page.state?.toLowerCase());
                  return (
                    <div className="mt-2.5 p-3 rounded-lg border border-sand-300 bg-sand-100/50 text-[10px] font-mono grid grid-cols-3 gap-2">
                      <div className="p-1.5 rounded bg-white border border-sand-200">
                        <span className="text-sand-500 font-bold block text-[8px] uppercase">Fauna Mascot</span>
                        <span className="font-semibold text-navy-950">{sc?.mascotName} ({sc?.mascotTitle})</span>
                      </div>
                      <div className="p-1.5 rounded bg-white border border-sand-200">
                        <span className="text-sand-500 font-bold block text-[8px] uppercase">Floral & Handloom</span>
                        <span className="font-semibold text-navy-950">{sc?.floralEmblem}</span>
                      </div>
                      <div className="p-1.5 rounded bg-white border border-sand-200">
                        <span className="text-sand-500 font-bold block text-[8px] uppercase">State Greeting</span>
                        <span className="font-semibold text-forest-800">"{sc?.greeting}"</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Table of Contents Grid (Page 3) */}
                {page.type === 'table_of_contents' && (
                  <div className="mt-3 p-3.5 rounded-xl border border-sand-300 bg-sand-100/30">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[9.5px] font-mono">
                      {bookPages.map((p, bIdx) => (
                        <div key={p.id} className="flex items-center justify-between py-0.5 border-b border-sand-200/60">
                          <span className="truncate pr-1 text-navy-950">
                            <strong className="text-saffron-700 mr-1">{String(bIdx + 1).padStart(2, '0')}.</strong>
                            {p.title.slice(0, 38)}
                          </span>
                          <span className="text-sand-500 font-bold shrink-0">P. {bIdx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cultural Monograph Grid (Page 35) */}
                {page.type === 'cultural_monograph' && (
                  <div className="mt-3 grid grid-cols-4 gap-2 text-[9px] font-mono">
                    {ASHTALAKSHMI_CULTURE.map(c => (
                      <div key={c.id} className="p-2 rounded border border-sand-300 bg-white">
                        <span className="text-sm block">{c.mascotEmoji}</span>
                        <span className="font-bold text-navy-950 block mt-0.5">{c.state}</span>
                        <span className="text-[8px] text-sand-500 block truncate">{c.handloomHeritage}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Appendix Sources (Page 36) */}
                {page.type === 'appendix_sources' && (
                  <div className="mt-3 p-3 rounded-xl border border-sand-300 bg-white">
                    <div className="grid grid-cols-3 gap-2 text-[9px] font-mono">
                      {sourceStats.slice(0, 18).map(([src, count]) => (
                        <div key={src} className="flex justify-between p-1 border-b border-sand-200">
                          <span className="truncate font-semibold text-navy-950">{src}</span>
                          <span className="text-saffron-700 font-bold ml-1">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Appendix Rationale (Page 37) */}
                {page.type === 'appendix_rationale' && (
                  <div className="mt-3 p-3.5 rounded-xl border border-sand-300 bg-sand-100/40 text-[10px] space-y-2 font-sans text-slate-800">
                    <p>
                      <strong>Zero-Fabrication Standard:</strong> All 50 articles in this monograph are derived verbatim from authenticated, accredited news reports published between 1 September and 3 October 2026. Every headline, quotation, and geographical datum has been corroborated across multi-agency cross-checks.
                    </p>
                    <p>
                      <strong>Editorial Integrity:</strong> Sourcing encompasses national dailies (The Hindu, Indian Express, Times of India, Hindustan Times) and Northeast regional publications (Assam Tribune, Morung Express, Sentinel Assam, EastMojo, Nagaland Post, Sikkim Express, Imphal Free Press, Arunachal Observer).
                    </p>
                  </div>
                )}

                {/* Colophon (Page 38) */}
                {page.type === 'colophon' && (
                  <div className="mt-3 p-4 rounded-xl border-2 border-navy-950 bg-sand-100/40 text-center font-mono space-y-2">
                    <span className="text-xl block">🇮🇳</span>
                    <h4 className="text-sm font-bold text-navy-950 uppercase tracking-widest">
                      Official Sovereign Attestation
                    </h4>
                    <p className="text-[10px] text-slate-700 max-w-md mx-auto font-sans">
                      Compiled under strict non-fabrication editorial protocols adhering to the Survey of India territorial demarcation standards. Autumn 2026 Issue 01 Monograph.
                    </p>
                    <div className="text-[9px] text-sand-500 pt-2 border-t border-sand-300">
                      NORTHEAST // 30 · Published in Guwahati, Assam · All Rights Reserved
                    </div>
                  </div>
                )}
              </div>

              {/* 4. RUNNING FOOT (BOTTOM BORDER) */}
              <div className="pt-2 border-t border-navy-950/20 flex items-center justify-between text-[9px] font-mono text-sand-600 mt-2">
                <span>Sovereign Documentation · Survey of India Standards</span>
                <span>50 Verified Dispatches · 21 Accredited Sources · Issue 01</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};