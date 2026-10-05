import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Compass,
  BookOpen,
  Building2,
  Users2,
  Trophy,
  ArrowRight,
  MapPin,
  Calendar,
  Sparkles,
  Play,
  Layers,
  Quote,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import articlesData from '../data/articles.json';
import sourcesData from '../data/sources.json';
import { NortheastMap } from '../components/NortheastMap';
import { StorySlideOver } from '../components/StorySlideOver';
import { Article, NortheastState } from '../types/article';
import { SourceItem } from '../types/source';
import {
  getTotalStories,
  getTotalSources,
  getStateStoryCounts,
  getCategoryCounts,
  formatISODate
} from '../utils/computedMetrics';
import {
  AshtalakshmiCulturalPavilion,
  CulturalPostmark,
  NortheastHeritageBanner,
  ASHTALAKSHMI_CULTURE
} from '../components/NortheastCulturalDetailing';
import { ThematicGraphic } from '../components/ThematicGraphic';
import coverHeroBg from '../assets/images/northeast-dawn-bg.jpg';
import cultureTerraceBg from '../assets/images/northeast-culture-terrace-bg.jpg';
import homestayTerraceBg from '../assets/images/northeast-homestay-terrace-bg.jpg';

const articles = articlesData as Article[];
const sources = sourcesData as SourceItem[];

export const CoverView: React.FC = () => {
  const [selectedStoryForSlideOver, setSelectedStoryForSlideOver] = useState<Article | null>(null);
  const [selectedState, setSelectedState] = useState<NortheastState | null>(null);
  const [isPavilionOpen, setIsPavilionOpen] = useState<boolean>(false);
  const [leadImgError, setLeadImgError] = useState<boolean>(false);

  const totalStories = getTotalStories(articles);
  const totalSources = getTotalSources(sources);
  const categoryCounts = getCategoryCounts(articles);

  // Lead Cover Feature Article
  const leadFeature = articles[0]; // Changlang Assam Rifles frontier dispatch

  return (
    <div className="min-h-screen bg-ivory-100 pb-16">
      <StorySlideOver
        article={selectedStoryForSlideOver}
        onClose={() => setSelectedStoryForSlideOver(null)}
      />

      {/* ============================================================== */}
      {/* 1. COMMEMORATIVE E-MAGAZINE FRONT COVER                        */}
      {/* ============================================================== */}
      <section className="relative border-b border-sand-300 py-8 sm:py-12 lg:py-14 overflow-hidden min-h-[580px] flex items-center">
        
        {/* Full-Bleed Scenic Northeast Hills & Dawn Landscape Background (User Specified Asset) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={coverHeroBg}
            alt="Northeast Dawn Landscape"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Decorative Northeast Cultural Weave Top Band */}
        <div className="absolute top-0 inset-x-0 h-1.5 motif-angami-band z-20" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Cover Editorial Masthead & Cover Lines (Breathes directly on scenic landscape) */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-sand-700">
                <span className="px-2.5 py-1 rounded bg-navy-950 text-ivory-100 font-bold tracking-wider uppercase shadow-xs">
                  VOL. I · ISSUE 01
                </span>
                <span>·</span>
                <span className="font-bold text-forest-900 drop-shadow-2xs">
                  SEPTEMBER–OCTOBER 2026 EDITION
                </span>
                <span>·</span>
                <span className="text-saffron-800 font-extrabold drop-shadow-2xs">
                  COMMEMORATIVE MONOGRAPH
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-navy-950 tracking-tight leading-[1.08] drop-shadow-sm">
                NORTHEAST <span className="text-saffron-600 font-sans font-light">//</span> 30
              </h1>

              <p className="text-lg sm:text-2xl font-serif text-navy-950 leading-snug font-semibold drop-shadow-2xs">
                Securing the Northeast: Indian Army & Assam Rifles in Stability, Peace & National Security.
              </p>

              <p className="text-xs sm:text-sm font-sans text-slate-800 leading-relaxed max-w-2xl font-medium">
                A 30-day curated editorial synthesis across eight frontier states—capturing the synchronized balance between vigilant border protection and non-kinetic civil-military synergy under Operation Sadbhavana.
              </p>

              {/* Cover Lines (Teasers in classic magazine editorial fashion) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-serif text-slate-800">
                <div className="p-3.5 rounded-xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm">
                  <span className="text-[10px] font-mono text-saffron-700 font-bold block uppercase mb-1">
                    Frontier Investigation
                  </span>
                  <strong>The Vibrant Villages on the LAC:</strong> High-altitude road infrastructure & civilian homestays transforming eastern Arunachal.
                </div>

                <div className="p-3.5 rounded-xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm">
                  <span className="text-[10px] font-mono text-forest-700 font-bold block uppercase mb-1">
                    Healing in the Hills
                  </span>
                  <strong>Operation Sadbhavana Clinics:</strong> Paramilitary medical teams bringing tertiary surgeries to remote hamlets.
                </div>
              </div>

              {/* Interactive Presentation CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/newsletter"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-navy-950 text-white font-mono text-xs sm:text-sm font-bold hover:bg-navy-900 transition-all shadow-lg ring-2 ring-saffron-500/80 group"
                >
                  <BookOpen className="w-4 h-4 text-saffron-400 group-hover:scale-110 transition-transform" />
                  <span>Read Newsletter Digest</span>
                  <span className="px-1.5 py-0.5 rounded bg-saffron-600 text-white text-[10px] font-mono uppercase tracking-wider font-extrabold">
                    38-Page Book
                  </span>
                  <ArrowRight className="w-4 h-4 text-saffron-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to="/magazine"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border-2 border-sand-400 text-navy-900 font-mono text-xs sm:text-sm font-bold hover:bg-white hover:border-sand-500 transition-all shadow-md group"
                >
                  <Play className="w-3.5 h-3.5 text-saffron-600 fill-current group-hover:scale-110 transition-transform" />
                  <span>Launch Presentation Album (50 Slides)</span>
                </Link>

                <Link
                  to="/appendices"
                  className="inline-flex items-center gap-1.5 px-3 py-3 rounded-lg text-navy-950 hover:text-saffron-700 font-mono text-xs font-bold drop-shadow-2xs"
                >
                  <span>Appendices (1 & 2) →</span>
                </Link>
              </div>

            </div>

            {/* Right Cover Preview Spread (Glossy Magazine Facsimile) */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-xs rounded-2xl border-2 border-sand-300 p-5 shadow-2xl relative overflow-hidden">
                
                {/* Issue Header Ribbon */}
                <div className="flex items-center justify-between pb-3 border-b border-sand-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-saffron-600 animate-ping" />
                    <span className="text-[11px] font-mono font-bold text-navy-900 tracking-wider">
                      OFFICIAL MONOGRAPH
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-sand-500">
                    30 Days · 8 States · 50 Stories
                  </span>
                </div>

                {/* Cover Image Frame */}
                <div className="relative mt-3 h-52 sm:h-60 w-full rounded-xl overflow-hidden bg-navy-950 shadow-inner group">
                  {!leadImgError && leadFeature.imageUrl ? (
                    <img
                      src={leadFeature.imageUrl}
                      alt={leadFeature.headline}
                      referrerPolicy="no-referrer"
                      onError={() => setLeadImgError(true)}
                      className="w-full h-full object-cover animate-ken-burns"
                    />
                  ) : (
                    <ThematicGraphic
                      category={leadFeature.category}
                      title={leadFeature.headline}
                      sourceName={leadFeature.sourceName}
                      className="w-full h-full"
                      hideCredit={true}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent flex flex-col justify-end p-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-saffron-600 text-white font-bold w-fit mb-1">
                      LEAD COVER STORY
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-ivory-100 leading-snug">
                      {leadFeature.headline}
                    </h3>
                    <p className="text-[11px] font-mono text-sand-300 mt-1">
                      📷 {leadFeature.imageCredit || leadFeature.sourceName}
                    </p>
                  </div>

                  {/* Absolute Floating Philatelic Stamp */}
                  <div className="absolute top-2 right-2 z-10 hidden sm:block">
                    <CulturalPostmark state="Arunachal" category="Frontier" dispatchId={1} />
                  </div>
                </div>

                {/* Barcode & Circulation Colophon */}
                <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between text-xs font-mono text-sand-500">
                  <div>
                    <span className="block font-bold text-navy-900 text-[11px]">SURVEY OF INDIA CARTOGRAPHY</span>
                    <span className="text-[10px]">Open DataMeet Boundaries</span>
                  </div>

                  <div className="text-right">
                    <span className="block font-bold text-forest-800 text-[11px]">VERIFIED DISPATCHES</span>
                    <span className="text-[10px]">100% Non-Fabrication Policy</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ashtalakshmi Cultural Heritage Ribbon */}
      <NortheastHeritageBanner onOpenPavilion={() => setIsPavilionOpen(true)} />

      {/* ============================================================== */}
      {/* 2. TABLE OF CONTENTS (TOC) & LETTER FROM THE EDITOR            */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="relative rounded-3xl border-2 border-sand-300 shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-10">
          
          {/* Scenic Background: Terraced Hills, Wooden Footbridge, Blooming Magnolias & Homestay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={homestayTerraceBg}
              alt="Northeast Terraces, Wooden Bridge & Homestay"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Table of Contents (Frosted Glass Editorial Card) */}
            <div className="lg:col-span-6 bg-white/96 backdrop-blur-md rounded-2xl border border-white/90 p-6 sm:p-8 shadow-xl">
              <div className="border-b border-sand-300 pb-3 mb-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-sand-600 uppercase tracking-wider font-bold">
                    Inside This Edition
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-navy-950 mt-0.5">
                    Table of Contents
                  </h2>
                </div>
                <span className="text-xs font-mono bg-white/95 text-navy-950 px-2.5 py-1 rounded-full border border-sand-300 font-extrabold shadow-2xs">
                  50 Stories · 8 Sections
                </span>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <Link to="/magazine" className="toc-row group hover:text-saffron-700 transition-colors">
                  <span className="font-serif font-bold text-navy-900 group-hover:text-saffron-700 text-sm">
                    01. The 50 Dispatches Album (Presentation Mode)
                  </span>
                  <span className="toc-leader" />
                  <span className="font-mono text-sand-600 group-hover:text-saffron-700 font-bold">Slide 01</span>
                </Link>

                <Link to="/security-pulse" className="toc-row group hover:text-saffron-700 transition-colors">
                  <span className="font-serif font-bold text-navy-900 group-hover:text-saffron-700 text-sm">
                    02. Security Pulse: Counter-Infiltration & Domination ({categoryCounts['Security Pulse']} Stories)
                  </span>
                  <span className="toc-leader" />
                  <span className="font-mono text-sand-600 group-hover:text-saffron-700 font-bold">Page 06</span>
                </Link>

                <Link to="/frontier-view" className="toc-row group hover:text-saffron-700 transition-colors">
                  <span className="font-serif font-bold text-navy-900 group-hover:text-saffron-700 text-sm">
                    03. Frontier View: The High Himalaya & LAC Vigilance ({categoryCounts['Frontier View']} Stories)
                  </span>
                  <span className="toc-leader" />
                  <span className="font-mono text-sand-600 group-hover:text-saffron-700 font-bold">Page 14</span>
                </Link>

                <Link to="/regional-currents" className="toc-row group hover:text-saffron-700 transition-colors">
                  <span className="font-serif font-bold text-navy-900 group-hover:text-saffron-700 text-sm">
                    04. Regional Currents: Civil-Military Synergy ({categoryCounts['Regional Currents']} Stories)
                  </span>
                  <span className="toc-leader" />
                  <span className="font-mono text-sand-600 group-hover:text-saffron-700 font-bold">Page 23</span>
                </Link>

                <Link to="/development" className="toc-row group hover:text-saffron-700 transition-colors">
                  <span className="font-serif font-bold text-navy-900 group-hover:text-saffron-700 text-sm">
                    05. Development & Lifelines: High-Altitude Roads ({categoryCounts['Development & Infrastructure']} Stories)
                  </span>
                  <span className="toc-leader" />
                  <span className="font-mono text-sand-600 group-hover:text-saffron-700 font-bold">Page 32</span>
                </Link>

                <Link to="/society-youth" className="toc-row group hover:text-saffron-700 transition-colors">
                  <span className="font-serif font-bold text-navy-900 group-hover:text-saffron-700 text-sm">
                    06. Society, Youth & Medical Missions ({categoryCounts['Society & Youth']} Stories)
                  </span>
                  <span className="toc-leader" />
                  <span className="font-mono text-sand-600 group-hover:text-saffron-700 font-bold">Page 40</span>
                </Link>

                <Link to="/sports" className="toc-row group hover:text-saffron-700 transition-colors">
                  <span className="font-serif font-bold text-navy-900 group-hover:text-saffron-700 text-sm">
                    07. Sports & Honors: Champions of the Hills ({categoryCounts['Sports & Achievements']} Stories)
                  </span>
                  <span className="toc-leader" />
                  <span className="font-mono text-sand-600 group-hover:text-saffron-700 font-bold">Page 50</span>
                </Link>

                <Link to="/appendices" className="toc-row group hover:text-saffron-700 transition-colors">
                  <span className="font-serif font-bold text-navy-900 group-hover:text-saffron-700 text-sm">
                    08. Documentary Appendices: Source Register & Rationale Matrix
                  </span>
                  <span className="toc-leader" />
                  <span className="font-mono text-sand-600 group-hover:text-saffron-700 font-bold">Page 56</span>
                </Link>
              </div>

              <div className="mt-6 pt-4 border-t border-sand-300 flex items-center justify-between text-xs font-mono text-slate-700">
                <span className="font-medium">All 50 articles verified live</span>
                <Link to="/magazine" className="text-saffron-800 font-bold hover:underline flex items-center gap-1">
                  <span>Open Full Album</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Letter from the Editor Column (Frosted Glass Editorial Card) */}
            <div className="lg:col-span-6 bg-white/96 backdrop-blur-md rounded-2xl border border-white/90 p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-saffron-800 font-bold uppercase tracking-wider">
                <Quote className="w-4 h-4 text-saffron-600" />
                Letter from the Editor
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-navy-950">
                The Synchronized Paradigm of Northeast Peace
              </h2>

              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans space-y-3 font-medium">
                <p className="drop-cap">
                  Over thirty days in the early autumn of 2026, the eight states of Northeast India bore witness to quiet resilience. Too often in national discourse, the region is viewed solely through episodic headlines of turbulence. This monograph demonstrates that enduring peace is achieved through a synchronized, bifurcated paradigm.
                </p>
                <p>
                  On one hand, the Indian Armed Forces and the Assam Rifles uphold vigilant boundary discipline: interdicting cross-border arms, maintaining dialogue at the Wacha-Damai meeting post, and protecting vital transit corridors like NH-913. On the other hand, non-kinetic engagement under Operation Sadbhavana—from mobile dental clinics in Silachari to youth football tournaments in Kohima—builds lasting bridges of mutual trust with local communities.
                </p>
              </div>

              <div className="pt-3 border-t border-sand-300 flex items-center justify-between text-xs font-mono text-slate-600">
                <span className="font-semibold text-navy-950">Editorial Board · NORTHEAST // 30</span>
                <span className="text-forest-800 font-bold">Guwahati & New Delhi</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 2.5. ASHTALAKSHMI CULTURAL MASCOTS & GREETINGS PAVILION         */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-3xl border-2 border-sand-300 shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-10">
          
          {/* Scenic Cultural Background: Hornbills, Terraces, Orchids & Mountain Village */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={cultureTerraceBg}
              alt="Northeast Cultural Landscape - Terraces and Hornbills"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-400/50 pb-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/90 text-rose-950 backdrop-blur-md shadow-xs mb-1.5 border border-rose-200/80">
                  <span>🌸</span>
                  <span>ASHTALAKSHMI HERITAGE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-950 tracking-tight drop-shadow-sm">
                  Cultural Mascots & Indigenous Greetings of Northeast India
                </h2>
                <p className="text-xs sm:text-sm font-serif text-navy-950 font-semibold mt-1 max-w-2xl drop-shadow-2xs">
                  Eight sovereign sister & brother states, each with its unique indigenous greetings, beloved wildlife mascots, state flowers, and ancient handloom traditions.
                </p>
              </div>

              <button
                onClick={() => setIsPavilionOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-950 text-white font-mono text-xs font-bold hover:bg-navy-900 transition-all shadow-lg ring-2 ring-saffron-500/80 shrink-0 self-start sm:self-center"
              >
                <span>🌸 Open Full Cultural Pavilion</span>
                <ArrowRight className="w-3.5 h-3.5 text-saffron-400" />
              </button>
            </div>

            {/* 8 States Mascot Cards Grid (Frosted Glass Cards Floating over Terraces) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {ASHTALAKSHMI_CULTURE.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setIsPavilionOpen(true)}
                  className="group flex flex-col items-center p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-white/90 hover:bg-white hover:border-saffron-500 hover:shadow-xl hover:-translate-y-1 transition-all text-center shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-saffron-50/90 border border-saffron-300 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-xs">
                    {item.mascotEmoji}
                  </div>
                  
                  <span className="font-serif font-bold text-xs text-navy-950 mt-2 block">
                    {item.state}
                  </span>

                  <span className="text-[10px] font-mono text-slate-700 font-semibold block">
                    {item.nativeScript}
                  </span>

                  <div className="mt-1.5 pt-1.5 border-t border-sand-300/80 w-full text-[11px] font-sans font-bold text-saffron-800">
                    {item.greeting.split('!')[0]}!
                  </div>

                  <span className="text-[9px] font-mono text-slate-600 font-medium italic block">
                    /{item.greetingPhonetic.split(' ')[0]}/
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-sand-400/40 flex flex-wrap items-center justify-between text-[11px] font-mono text-navy-950 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/80 shadow-xs">
              <span className="font-semibold">Click any mascot to hear native greetings, discover living root bridges, and explore sacred handlooms</span>
              <span className="text-forest-900 font-extrabold">100% Culturally Authentic & Respectful</span>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. INTERACTIVE GEOSPATIAL DOSSIER                              */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-sand-200 text-navy-900">
            TERRITORIAL CARTOGRAPHY // SURVEY OF INDIA
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900 mt-1">
            Interactive Northeast Geospatial Dossier
          </h2>
          <p className="text-xs sm:text-sm font-sans text-slate-700 mt-1 max-w-2xl">
            Explore all eight Northeast states with official Survey of India boundary depiction. Click any state or sourced marker to review verified incident dispatches.
          </p>
        </div>

        <NortheastMap
          selectedState={selectedState}
          onSelectState={setSelectedState}
          onSelectStory={(story) => setSelectedStoryForSlideOver(story)}
        />
      </section>

      {/* ============================================================== */}
      {/* 4. PRESENTATION ALBUM TEASER STRIP                            */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-navy-950 rounded-2xl p-6 sm:p-10 text-ivory-100 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 motif-muga opacity-10 pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-saffron-600 text-white mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              CINEMATIC PRESENTATION ALBUM
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory-100">
              Experience the 50 Dispatches as a Living Album
            </h3>
            <p className="text-xs sm:text-sm text-sand-300 mt-1 max-w-xl">
              Immerse yourself in slide-by-slide animated presentations with authentic photography, video dispatches, drop-cap journalism, and state cultural crests.
            </p>
          </div>

          <Link
            to="/magazine"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-saffron-600 text-white font-mono text-sm font-bold hover:bg-saffron-500 transition-colors shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Presentation Album</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Ashtalakshmi Cultural Pavilion Modal */}
      <AshtalakshmiCulturalPavilion
        isOpen={isPavilionOpen}
        onClose={() => setIsPavilionOpen(false)}
      />

    </div>
  );
};
