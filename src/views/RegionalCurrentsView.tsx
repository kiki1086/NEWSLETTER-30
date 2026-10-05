import React, { useState, useMemo } from 'react';
import { Globe, Filter, Search, Building2, CheckCircle2 } from 'lucide-react';
import articlesData from '../data/articles.json';
import { StoryCard } from '../components/StoryCard';
import { StorySlideOver } from '../components/StorySlideOver';
import { Article, NortheastState } from '../types/article';

const articles = articlesData as Article[];

const ALL_EIGHT_STATES: NortheastState[] = [
  'Arunachal Pradesh',
  'Assam',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Sikkim',
  'Tripura'
];

interface StateCivicDossier {
  state: NortheastState;
  nativeScript: string;
  nativeGreeting: string;
  phonetic: string;
  mascotEmoji: string;
  mascotName: string;
  capital: string;
  governanceTheme: string;
  institutionalSummary: string;
  civicMilestones: string[];
}

const STATE_CIVIC_DOSSIERS: Record<NortheastState, StateCivicDossier> = {
  'Arunachal Pradesh': {
    state: 'Arunachal Pradesh',
    nativeScript: 'অৰুণাচল প্ৰদেশ',
    nativeGreeting: 'Ngoluk Tani!',
    phonetic: 'ngo-look tah-nee',
    mascotEmoji: '🐂',
    mascotName: 'Mithun (Gayal)',
    capital: 'Itanagar',
    governanceTheme: 'Frontier Panchayats & Vibrant Villages Civic Coordination',
    institutionalSummary: 'Decentralized rural administration across 26 frontier districts, statutory governance on boundary security, and academic-technical empowerment via NERIST Nirjuli and TRIHMS.',
    civicMilestones: [
      'Vibrant Villages LAC Civic Coordination',
      'Statutory Border Area Governance Pacts',
      'Institutional Healthcare & Engineering Expansion'
    ]
  },
  'Assam': {
    state: 'Assam',
    nativeScript: 'অসম',
    nativeGreeting: 'Nomoskar!',
    phonetic: 'noh-mosh-kar',
    mascotEmoji: '🦏',
    mascotName: 'One-Horned Rhinoceros',
    capital: 'Dispur / Guwahati',
    governanceTheme: 'Riverine Governance & Inter-Agency Fiscal Integrity',
    institutionalSummary: 'Coordination between district administrations, state police, and federal enforcement agencies to dismantle trans-border hawala conduits and safeguard Brahmaputra waterways.',
    civicMilestones: [
      'Multi-Agency Financial Forensics Taskforce',
      'Brahmaputra Basin Flood Relief Administration',
      'Civic Health & Heart Day Walkathon Drives'
    ]
  },
  'Manipur': {
    state: 'Manipur',
    nativeScript: 'ꯃꯅꯤꯄꯨꯔ',
    nativeGreeting: 'Khurumjari!',
    phonetic: 'khoo-room-jah-ree',
    mascotEmoji: '🦌',
    mascotName: 'Sangai (Brow-antlered Deer)',
    capital: 'Imphal',
    governanceTheme: 'Judicial Directives & Inter-Community Confidence Synergy',
    institutionalSummary: 'Supreme Court bench-directed relief camp healthcare audits, civil supplies logistics oversight, and peace council mediation convened by security forces across Jiribam and the valley.',
    civicMilestones: [
      'Supreme Court-Monitored Relief Healthcare Audits',
      'Jiribam Multi-Ethnic Community Peace Councils',
      'Displaced Family Medical Outreach Missions'
    ]
  },
  'Meghalaya': {
    state: 'Meghalaya',
    nativeScript: 'মেঘালয়',
    nativeGreeting: 'Khublei!',
    phonetic: 'khoob-lay',
    mascotEmoji: '🐆',
    mascotName: 'Clouded Leopard',
    capital: 'Shillong',
    governanceTheme: 'Sixth Schedule Autonomous Councils & Academic Synergy',
    institutionalSummary: 'Constitutional administration under KHADC, JHADC, and GHADC frameworks, tri-service veteran honor conventions in Laitkor, and university-military education partnerships.',
    civicMilestones: [
      'Sixth Schedule Autonomous District Council Protocols',
      'Royal Global University Academic MoU with Assam Rifles',
      'Samman Samaroh Veterans Honor Assemblies'
    ]
  },
  'Mizoram': {
    state: 'Mizoram',
    nativeScript: 'মিজোৰাম',
    nativeGreeting: 'Chibai!',
    phonetic: 'chee-bye',
    mascotEmoji: '🐵',
    mascotName: 'Hoolock Gibbon',
    capital: 'Aizawl',
    governanceTheme: 'Border De-Escalation & Inter-State Boundary Harmony',
    institutionalSummary: 'Civil administration resolution along the Kolasib-Hailakandi inter-state corridor, bilateral border magistrate dialogues, and cross-border transit security management.',
    civicMilestones: [
      'Inter-State Boundary Conciliation Committees',
      'Kolasib District Administration Directives',
      'Zokhawthar Trade Route Civil Domination'
    ]
  },
  'Nagaland': {
    state: 'Nagaland',
    nativeScript: 'নাগলেণ্ড',
    nativeGreeting: 'Khwevü!',
    phonetic: 'kway-voo',
    mascotEmoji: '🦤',
    mascotName: "Blyth's Tragopan",
    capital: 'Kohima',
    governanceTheme: 'Frontier Nagaland Territory Authority (FNTA) Framework',
    institutionalSummary: 'Historic constitutional consensus on the 49-member FNTA executive council for Eastern Nagaland, district peace coordination in Kiphire, and Avakhung border trade regulation.',
    civicMilestones: [
      'Frontier Nagaland Territory Authority (FNTA) Bill 2026',
      'Eastern Nagaland Peoples Organisation (ENPO) Accord',
      'Pungro & Kiphire District Administrative Sessions'
    ]
  },
  'Sikkim': {
    state: 'Sikkim',
    nativeScript: 'सिक्किम',
    nativeGreeting: 'Tashi Delek!',
    phonetic: 'tah-shee deh-lek',
    mascotEmoji: '🐾',
    mascotName: 'Red Panda',
    capital: 'Gangtok',
    governanceTheme: 'Himalayan Ecology Directives & Cultural Conclaves',
    institutionalSummary: 'State Pollution Control Board solid waste mandates, Project SWASTIK infrastructure reviews along the Teesta axis, and the Gangtok Arts & Literature Festival celebrating mountain culture.',
    civicMilestones: [
      'State Environmental Pollution Control Directives',
      'Gangtok Arts & Literature Conclave 2026',
      'Teesta River Valley Ecological Infrastructure Review'
    ]
  },
  'Tripura': {
    state: 'Tripura',
    nativeScript: 'ত্রিপুরা',
    nativeGreeting: 'Khulumkha!',
    phonetic: 'khoo-loom-khah',
    mascotEmoji: '🐒',
    mascotName: "Phayre's Leaf Monkey",
    capital: 'Agartala',
    governanceTheme: 'TTAADC Autonomy & Civic Healthcare Frontiers',
    institutionalSummary: 'Tripura Tribal Areas Autonomous District Council (TTAADC) civic empowerment, military-youth defense exhibitions in Agartala, and mobile medical outreaches in Silachari.',
    civicMilestones: [
      'TTAADC Tribal Civic Empowerment Initiatives',
      'State Capital Defense & Equipment Exposition for NCC',
      'Silachari Tribal Healthcare & Sanitation Missions'
    ]
  },
  'Regional': {
    state: 'Regional',
    nativeScript: 'উত্তৰ-পূব ভাৰত',
    nativeGreeting: 'Northeast // 30',
    phonetic: 'north-east thirty',
    mascotEmoji: '🌏',
    mascotName: 'Seven Sisters & Sikkim',
    capital: 'Guwahati / Shillong',
    governanceTheme: 'North Eastern Council (NEC) & Integrated Regional Security',
    institutionalSummary: 'Inter-ministerial project monitoring under the Ministry of DoNER, multi-corps tri-service joint operations, and regional transit connectivity governance.',
    civicMilestones: [
      'North Eastern Council Development Conclaves',
      'DoNER Infrastructure Monitoring Framework',
      'Joint Eastern Air-Land Battle Integration'
    ]
  }
};

// Institutional & civic governance dispatches spanning all 8 Northeast states
const INSTITUTIONAL_ARTICLE_IDS = [
  'ne30-22', // Nagaland: Frontier Nagaland Territory Authority
  'ne30-23', // Manipur: Supreme Court Healthcare Audit
  'ne30-24', // Sikkim: Sikkim Arts & Literature Festival
  'ne30-25', // Assam: World Heart Day Health Walkathon
  'ne30-26', // Assam: Inter-Agency Hawala Searches
  'ne30-27', // Manipur: Jiribam Community Confidence
  'ne30-28', // Mizoram: Kolasib Incident Administrative Response
  'ne30-07', // Arunachal / Nagaland / Manipur: MHA AFSPA Statutory Review
  'ne30-31', // Arunachal: NERIST Agricultural Engineering Session
  'ne30-29', // Arunachal: TRIHMS Medical Milestone
  'ne30-30', // Meghalaya: NEIGRIHMS Super-Specialty Healthcare
  'ne30-37', // Meghalaya: Laitkor Samman Samaroh Veterans
  'ne30-38', // Meghalaya / Assam: Academic MoU with Assam Rifles
  'ne30-39', // Tripura: NCC Defense Exposition in Agartala
  'ne30-40', // Tripura: Silachari Tribal Healthcare Camp
  'ne30-45'  // Tripura: Agartala Military Station Swachhata
];

export const RegionalCurrentsView: React.FC = () => {
  const [selectedStoryForSlideOver, setSelectedStoryForSlideOver] = useState<Article | null>(null);
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sourced dispatches for regional institutional & civic life across all 8 states
  const civicArticles = useMemo(() => {
    return articles.filter((a) => INSTITUTIONAL_ARTICLE_IDS.includes(a.id));
  }, []);

  // Compute story counts per state
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = { All: civicArticles.length };
    ALL_EIGHT_STATES.forEach((st) => {
      counts[st] = civicArticles.filter((a) => a.states.includes(st)).length;
    });
    return counts;
  }, [civicArticles]);

  const filteredArticles = useMemo(() => {
    return civicArticles.filter((a) => {
      const matchState = selectedState === 'All' || a.states.includes(selectedState as NortheastState);
      const matchQuery =
        searchQuery === '' ||
        a.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.district && a.district.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchState && matchQuery;
    });
  }, [civicArticles, selectedState, searchQuery]);

  const currentDossier = selectedState !== 'All' ? STATE_CIVIC_DOSSIERS[selectedState as NortheastState] : null;

  return (
    <div className="min-h-screen bg-ivory-100 py-8 sm:py-12">
      <StorySlideOver
        article={selectedStoryForSlideOver}
        onClose={() => setSelectedStoryForSlideOver(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Warm Ivory & Ochre styling */}
        <div className="bg-sand-100 text-navy-950 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden border border-sand-300">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium tracking-wide bg-navy-900 text-white">
                <Globe className="w-3.5 h-3.5 text-saffron-400" />
                SECTION 03 // INSTITUTIONAL & CIVIC LIFE
              </span>
              <span className="text-xs font-mono text-sand-600 font-bold">
                8 Frontier States · {civicArticles.length} Verified Field Dispatches
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-tight text-navy-900 mt-1">
              Regional Currents
            </h1>

            <p className="text-xs sm:text-sm font-sans text-slate-700 mt-2 max-w-3xl leading-relaxed">
              Institutional oversight, constitutional governance, legislative milestones like the Frontier Nagaland Territory Authority Bill 2026, judicial directives, autonomous district councils, and cultural heritage festivals across all eight Northeast states.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none motif-muga" />
        </div>

        {/* 8 INDIVIDUAL TABS FOR STATES */}
        <div className="mt-6 bg-white p-4 sm:p-5 rounded-2xl border border-sand-300 shadow-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-sand-200">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-navy-900">
              <Filter className="w-3.5 h-3.5 text-saffron-600" />
              <span>NORTHEAST 8-STATE CIVIC TABS:</span>
              <span className="text-[11px] font-sans text-sand-500 font-normal hidden sm:inline">
                Click any of the 8 states to inspect institutional milestones & field dispatches
              </span>
            </div>
            <div className="relative min-w-[200px] sm:min-w-[260px]">
              <Search className="w-3.5 h-3.5 text-sand-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search regional currents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs font-sans rounded-md border border-sand-300 bg-ivory-50 focus:bg-white text-navy-900 focus:border-navy-900 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Dedicated Flex Ribbon of 8 Individual State Tabs + All States */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedState('All')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs whitespace-nowrap ${
                selectedState === 'All'
                  ? 'bg-navy-950 text-white ring-2 ring-saffron-500 shadow-sm'
                  : 'bg-sand-50 text-navy-900 border border-sand-200 hover:bg-sand-100 hover:border-sand-400'
              }`}
            >
              <span>🌐</span>
              <span>All ({stateCounts['All']})</span>
            </button>

            {ALL_EIGHT_STATES.map((st) => {
              const isSelected = selectedState === st;
              const count = stateCounts[st] || 0;
              const dossier = STATE_CIVIC_DOSSIERS[st];

              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedState(st)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-2xs whitespace-nowrap ${
                    isSelected
                      ? 'bg-navy-950 text-white ring-2 ring-saffron-500 shadow-sm scale-102'
                      : 'bg-sand-50 text-navy-900 border border-sand-200 hover:bg-sand-100 hover:border-saffron-400'
                  }`}
                  title={`${st}: ${dossier.governanceTheme}`}
                >
                  <span>{dossier.mascotEmoji}</span>
                  <span>{st}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] shrink-0 font-extrabold ${
                      isSelected
                        ? 'bg-saffron-500 text-navy-950'
                        : 'bg-sand-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Selected State Institutional & Civic Focus Dossier Card */}
        {currentDossier && (
          <div className="mt-6 bg-white rounded-2xl border-2 border-saffron-300/80 p-6 sm:p-7 shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-2xl">{currentDossier.mascotEmoji}</span>
                  <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-navy-950">
                    {currentDossier.state}
                  </h2>
                  <span className="text-xs font-mono text-sand-500 px-2 py-0.5 rounded bg-sand-100">
                    {currentDossier.nativeScript}
                  </span>
                  <span className="text-xs font-mono text-forest-800 font-bold px-2 py-0.5 rounded bg-forest-50 border border-forest-200">
                    Capital: {currentDossier.capital}
                  </span>
                  <span className="text-xs font-sans text-saffron-800 font-bold italic">
                    "{currentDossier.nativeGreeting}" /{currentDossier.phonetic}/
                  </span>
                </div>

                <div className="inline-block text-xs font-mono font-bold text-saffron-800 uppercase tracking-wide">
                  🏛️ Governance Focus: {currentDossier.governanceTheme}
                </div>

                <p className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed max-w-4xl">
                  {currentDossier.institutionalSummary}
                </p>
              </div>

              {/* Civic Milestone Badges */}
              <div className="shrink-0 bg-sand-50 p-4 rounded-xl border border-sand-200 min-w-[260px]">
                <span className="text-[11px] font-mono text-sand-600 font-bold block uppercase mb-2">
                  Key Institutional Pillars
                </span>
                <ul className="space-y-1.5 text-xs font-sans text-navy-950">
                  {currentDossier.civicMilestones.map((milestone, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-mono text-sand-600 mb-3">
            <span>
              Showing {filteredArticles.length} of {civicArticles.length} verified dispatches
              {selectedState !== 'All' ? ` for ${selectedState}` : ' across all 8 Northeast states'}
            </span>
            {selectedState !== 'All' && (
              <button
                onClick={() => setSelectedState('All')}
                className="text-saffron-700 font-bold hover:underline"
              >
                Reset to All States →
              </button>
            )}
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <StoryCard
                  key={article.id}
                  article={article}
                  onOpenSlideOver={(a) => setSelectedStoryForSlideOver(a)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-sand-300 text-sand-500">
              <Building2 className="w-8 h-8 mx-auto text-sand-400 mb-2" />
              <p className="font-serif text-sm text-navy-950">No dispatches match the search query "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-mono text-saffron-700 font-bold underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
