import React from 'react';
import { CheckSquare, ShieldCheck, Compass, Users2, Trophy, Clock, FileCheck } from 'lucide-react';

export const SelectionRationaleView: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory-100 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-sand-300 pb-4 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-navy-900 text-ivory-100">
            APPENDIX 02 // EDITORIAL METHODOLOGY
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 mt-2">
            Story Selection & Verification Rationale
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-700 mt-1">
            Methodological framework governing the selection, verification, and editorial paraphrasing of the 50 dispatches in <em>NORTHEAST // 30</em>.
          </p>
        </div>

        {/* Core Principles */}
        <div className="space-y-6">
          
          {/* Pillar 1 */}
          <div className="bg-white rounded-xl border border-sand-300 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-lg bg-navy-900 text-ivory-100">
                <Clock className="w-5 h-5 text-saffron-400" />
              </span>
              <div>
                <span className="text-xs font-mono text-sand-500 uppercase">Pillar 01</span>
                <h2 className="text-lg font-serif font-bold text-navy-900">
                  Strict Chronological Relevance & Operational Immediacy
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-2">
              Every single included story was published strictly within the designated 30-day operational window between <strong>1 September 2026 and 3 October 2026</strong>. Historical events misattributed by automated aggregators (such as past flood operations from July 2026 or generic sporting calendars) were eliminated during forensic audit. Every date was confirmed directly on the source page.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-xl border border-sand-300 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-lg bg-forest-900 text-ivory-100">
                <Users2 className="w-5 h-5 text-saffron-400" />
              </span>
              <div>
                <span className="text-xs font-mono text-sand-500 uppercase">Pillar 02</span>
                <h2 className="text-lg font-serif font-bold text-navy-900">
                  Thematic Alignment with Civil-Military Synergy
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-2">
              True security cannot be evaluated solely through tactical operations. Equal emphasis was placed on the non-kinetic, civil-military initiatives of the Indian Armed Forces and Assam Rifles under Operation Sadbhavana. This encompasses free medical and dental camps reaching remote hill hamlets (Amahatore, Silachari, Tsiepama), disaster assistance during sudden flash floods, and youth sports mentorship.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-xl border border-sand-300 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-lg bg-navy-900 text-ivory-100">
                <Compass className="w-5 h-5 text-saffron-400" />
              </span>
              <div>
                <span className="text-xs font-mono text-sand-500 uppercase">Pillar 03</span>
                <h2 className="text-lg font-serif font-bold text-navy-900">
                  Strategic & Macro-Geopolitical Depth
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-2">
              Reports from national dailies of record (<em>The Hindu</em>, <em>The Indian Express</em>) and regional defense desks document high-level strategic developments: the Vibrant Villages Programme modernizing border settlements along the Line of Actual Control, the 3rd India-Myanmar Defence Dialogue in Guwahati, and Corps Commander discussions preserving frontier restraint.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-xl border border-sand-300 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-lg bg-saffron-600 text-white">
                <Trophy className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs font-mono text-sand-500 uppercase">Pillar 04</span>
                <h2 className="text-lg font-serif font-bold text-navy-900">
                  Societal Morale & Institutional Integration
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-2">
              Athletic victories and mass-participation sporting tourneys (such as Maibam Gulubi's gold at the Asian Bench Press Championships, the Assam Rifles Sentinels Cup Football, and the Capt Kengurüse Memorial) provide crucial positive outlets for regional youth, celebrating national pride and bridging historical divides.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="bg-white rounded-xl border border-sand-300 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-lg bg-sand-300 text-navy-950">
                <FileCheck className="w-5 h-5 text-forest-800" />
              </span>
              <div>
                <span className="text-xs font-mono text-sand-500 uppercase">Pillar 05</span>
                <h2 className="text-lg font-serif font-bold text-navy-900">
                  Dignified, Sourced & Grassroots Coverage
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-2">
              Local grassroots milestones that often escape national headlines—such as the Frontier Nagaland Territory Authority (FNTA) Bill 2026, village sanitation campaigns with Village Guards in Wangti, and veteran felicitations in Shillong—are given prominent, dignified voice.
            </p>
          </div>

          {/* Non-Negotiable Standards Card */}
          <div className="bg-sand-100 rounded-xl border border-sand-300 p-6 mt-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-navy-900 font-bold mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              Non-Negotiable Content Rules Enforced
            </h3>
            <ul className="text-xs sm:text-sm text-slate-800 space-y-2 font-sans">
              <li className="flex items-start gap-2">
                <span className="font-bold text-saffron-700">1.</span>
                <span><strong>Zero Fabrication:</strong> Not a single article, statistic, or URL is fabricated. All 50 stories were verified through live web search with working original links.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-saffron-700">2.</span>
                <span><strong>Original Paraphrasing:</strong> Article texts are never copied verbatim; all summaries are original 2–3 sentence distillations written in an objective editorial voice.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-saffron-700">3.</span>
                <span><strong>Concise Quotations:</strong> Quotes are strictly limited to a maximum of 15 words and cited from authentic operational releases or leadership statements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-saffron-700">4.</span>
                <span><strong>Neutral Statutory Framing:</strong> Government gazette notifications (including the AFSPA 6-month extension) are reported strictly according to statutory text without subjective editorializing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-saffron-700">5.</span>
                <span><strong>Accurate Cartography:</strong> All regional maps use open GeoJSON reflecting official Survey of India boundary depictions, explicitly flagged for user verification.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
