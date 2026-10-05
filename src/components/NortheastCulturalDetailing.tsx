import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Coffee, X, Volume2, Flower2, Shield, BookmarkCheck, ChevronRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

// ============================================================================
// ASHTALAKSHMI (8 SISTER & BROTHER STATES) CULTURAL MASCOTS & GREETINGS DATA
// ============================================================================
export interface CulturalMascot {
  id: string;
  state: string;
  nativeScript: string;
  mascotEmoji: string;
  mascotName: string;
  mascotTitle: string;
  greeting: string;
  greetingPhonetic: string;
  greetingMeaning: string;
  floralEmblem: string;
  handloomHeritage: string;
  cuteTidbit: string;
  badgeBg: string;
  accentBorder: string;
}

export const ASHTALAKSHMI_CULTURE: CulturalMascot[] = [
  {
    id: 'assam',
    state: 'Assam',
    nativeScript: 'অসম',
    mascotEmoji: '🦏',
    mascotName: 'Gora the Rhino',
    mascotTitle: 'Great One-Horned Rhino of Kaziranga',
    greeting: 'Nomoskar! (নমস্কাৰ)',
    greetingPhonetic: 'noh-mosh-kar',
    greetingMeaning: 'I bow to the divine within you',
    floralEmblem: 'Kopou Phool (Foxtail Orchid)',
    handloomHeritage: 'Golden Muga Silk & Scarlet Gamosa',
    cuteTidbit: "Assam's Muga silk is naturally golden and gets glossier with every single wash! Worn during joyful Rongali Bihu celebrations.",
    badgeBg: 'bg-amber-50',
    accentBorder: 'border-amber-300'
  },
  {
    id: 'nagaland',
    state: 'Nagaland',
    nativeScript: 'নাগাল্যান্ড',
    mascotEmoji: '🦤',
    mascotName: 'Hornbill the Herald',
    mascotTitle: 'Great Hornbill of the Mist Forests',
    greeting: 'Khwevü! / Ya-o!',
    greetingPhonetic: 'kway-voo (Angami) · yah-oh (Ao)',
    greetingMeaning: 'Peace, strength, and warmth be with you',
    floralEmblem: "Blyth's Tragopan & Mountain Rhododendron",
    handloomHeritage: 'Tsüngkotepsü Warrior Shawl & Angami weaves',
    cuteTidbit: 'Every Naga tribe weaves their historical courage and ancestral clan stories into intricate red, black, and ivory shawl bands.',
    badgeBg: 'bg-red-50',
    accentBorder: 'border-red-300'
  },
  {
    id: 'manipur',
    state: 'Manipur',
    nativeScript: 'ꯃꯅꯤꯄꯨꯔ',
    mascotEmoji: '🦌',
    mascotName: 'Sangai the Dancer',
    mascotTitle: 'Brow-Antlered Deer of Keibul Lamjao',
    greeting: 'Khurumjari! (ꯈꯨꯔꯨꯝꯖꯔꯤ)',
    greetingPhonetic: 'khoo-room-jah-ree',
    greetingMeaning: 'Respectful greetings and a joyful welcome',
    floralEmblem: 'Shirui Lily (Grows only on Shirui Kashong peak)',
    handloomHeritage: 'Moirang Phee Temple Weave & Embroidered Phanek',
    cuteTidbit: "The Sangai deer balances gracefully on Loktak Lake's floating biomass islands called 'phumdis'—the only floating national park on Earth!",
    badgeBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-300'
  },
  {
    id: 'meghalaya',
    state: 'Meghalaya',
    nativeScript: 'মেঘালয়',
    mascotEmoji: '🐆',
    mascotName: 'Leopard of the Mist',
    mascotTitle: 'Clouded Leopard of Sacred Groves',
    greeting: 'Khublei! (Khasi / Jaintia)',
    greetingPhonetic: 'khoob-lay',
    greetingMeaning: 'God bless you, thank you, and safe journeys',
    floralEmblem: "Pitcher Plant (Nepenthes khasiana) & Lady's Slipper",
    handloomHeritage: 'Ryndia (Ahimsa Peace Eri Silk)',
    cuteTidbit: 'Living Root Bridges are hand-guided across decades using the aerial roots of rubber fig trees, becoming stronger with every monsoon!',
    badgeBg: 'bg-teal-50',
    accentBorder: 'border-teal-300'
  },
  {
    id: 'mizoram',
    state: 'Mizoram',
    nativeScript: 'মিজোরাম',
    mascotEmoji: '🐵',
    mascotName: 'Hoolock the Singer',
    mascotTitle: 'Hoolock Gibbon of Blue Mountain',
    greeting: 'Chibai!',
    greetingPhonetic: 'chee-bye',
    greetingMeaning: 'Warmest greetings of fellowship and peace',
    floralEmblem: 'Senhri (Red Vanda Orchid)',
    handloomHeritage: 'Puanchei Ceremonial Tapestry',
    cuteTidbit: "Mizoram lives by 'Tlawmngaihna'—a noble customary code of selfless hospitality, helping neighbors before oneself.",
    badgeBg: 'bg-rose-50',
    accentBorder: 'border-rose-300'
  },
  {
    id: 'arunachal',
    state: 'Arunachal Pradesh',
    nativeScript: 'অরুণাচল প্ৰদেশ',
    mascotEmoji: '🐂',
    mascotName: 'Mithun the Guardian',
    mascotTitle: 'Sacred Gayal of the Dawn-Lit Peaks',
    greeting: 'Ngoluk Tani! / Tashi Delek!',
    greetingPhonetic: 'ngo-look tah-nee · tah-shee deh-lek',
    greetingMeaning: 'May the first morning dawn bring radiant peace',
    floralEmblem: 'White Foxglove & Alpine Orchid',
    handloomHeritage: 'Apatani Zig-zag Tapestries & Wancho Beadwork',
    cuteTidbit: "Dong Valley in Arunachal is where the first rays of sunrise touch Indian soil each day, illuminating snow-capped Himalayan ridges.",
    badgeBg: 'bg-orange-50',
    accentBorder: 'border-orange-300'
  },
  {
    id: 'sikkim',
    state: 'Sikkim',
    nativeScript: 'སྲིད་སྐྱིམ།',
    mascotEmoji: '🐾',
    mascotName: 'Panda of the Pines',
    mascotTitle: 'Red Panda of Kanchenjunga Slopes',
    greeting: 'Tashi Delek! (བཀ্ৰ་ཤིས་བདེ་ལེགས)',
    greetingPhonetic: 'tah-shee deh-lek',
    greetingMeaning: 'May auspicious blessings and good fortune shine upon you',
    floralEmblem: 'Noble Dendrobium Orchid',
    handloomHeritage: 'Lepcha Dumdem & Tibetan Brocade',
    cuteTidbit: 'Sikkim is India’s first 100% certified organic state, cradled beneath the sacred five treasures of Mount Kanchenjunga!',
    badgeBg: 'bg-sky-50',
    accentBorder: 'border-sky-300'
  },
  {
    id: 'tripura',
    state: 'Tripura',
    nativeScript: 'ত্রিপুরা',
    mascotEmoji: '🐒',
    mascotName: 'Chashma Langur',
    mascotTitle: "Phayre's Spectacled Langur of Gomati",
    greeting: 'Khulumkha! (Kokborok)',
    greetingPhonetic: 'khoo-loom-khah',
    greetingMeaning: 'I greet you warmly with all my heart',
    floralEmblem: 'Nageshwar (Ceylon Ironwood flower)',
    handloomHeritage: 'Risa & Rikutu Handwoven Wefts',
    cuteTidbit: "Tripura's Neermahal is an enchanting lake palace built entirely in the center of Rudrasagar Lake with Mughal and indigenous architectural harmony.",
    badgeBg: 'bg-violet-50',
    accentBorder: 'border-violet-300'
  }
];

// ============================================================================
// 1. ASHTALAKSHMI CULTURAL PAVILION (MODAL & INTERACTIVE STATE CARDS)
// ============================================================================
interface AshtalakshmiPavilionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AshtalakshmiCulturalPavilion: React.FC<AshtalakshmiPavilionProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedStateId, setSelectedStateId] = useState<string>('assam');
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const currentMascot = ASHTALAKSHMI_CULTURE.find((m) => m.id === selectedStateId) || ASHTALAKSHMI_CULTURE[0];

  const handleCopyGreeting = (greeting: string, stateName: string) => {
    navigator.clipboard?.writeText(greeting);
    setCopiedState(stateName);
    setTimeout(() => setCopiedState(null), 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-navy-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pavilion-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="bg-ivory-100 rounded-2xl border-2 border-sand-300 shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[85vh] relative z-10"
      >
        {/* Header */}
          <div className="bg-navy-900 text-ivory-100 px-6 py-4 flex items-center justify-between border-b-2 border-saffron-500">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl" role="img" aria-label="Lotus">🌸</span>
              <div>
                <h2 id="pavilion-modal-title" className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2">
                  Ashtalakshmi Cultural Pavilion
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-saffron-600 text-white font-normal uppercase">
                    8 States · 8 Greetings
                  </span>
                </h2>
                <p className="text-xs font-serif text-sand-300">
                  Indigenous greetings, cute fauna mascots & handloom heritage of Northeast India
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-sand-300 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label="Close Cultural Pavilion"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-strip with state tabs */}
          <div className="bg-sand-100 border-b border-sand-300 px-3 sm:px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {ASHTALAKSHMI_CULTURE.map((m) => {
              const isActive = m.id === selectedStateId;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedStateId(m.id)}
                  className={`flex-1 min-w-[70px] sm:min-w-0 flex items-center justify-center gap-1 px-1.5 sm:px-2 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-navy-900 text-white font-bold shadow-xs ring-2 ring-saffron-500'
                      : 'bg-white hover:bg-sand-50 text-navy-900 border border-sand-300'
                  }`}
                >
                  <span className="text-sm">{m.mascotEmoji}</span>
                  <span className="hidden sm:inline">{m.state}</span>
                  <span className="sm:hidden">{m.state.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Mascot Spotlight Card */}
              <div className="md:col-span-5 bg-white p-6 rounded-xl border border-sand-300 shadow-xs text-center flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-full bg-saffron-100 flex items-center justify-center text-5xl shadow-inner border border-saffron-200">
                    {currentMascot.mascotEmoji}
                  </div>
                  <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-forest-800 text-[10px] font-mono text-white font-bold">
                    Official
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-navy-900">
                  {currentMascot.mascotName}
                </h3>
                <p className="text-xs font-serif text-slate-600 mt-0.5 italic">
                  {currentMascot.mascotTitle}
                </p>

                <div className="w-full mt-4 pt-4 border-t border-sand-200 text-left space-y-2 text-xs">
                  <div>
                    <span className="font-mono text-sand-500 uppercase text-[10px] block">State Flower</span>
                    <span className="font-medium text-navy-900 flex items-center gap-1">
                      <Flower2 className="w-3.5 h-3.5 text-rose-500" />
                      {currentMascot.floralEmblem}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-sand-500 uppercase text-[10px] block">Heritage Handloom</span>
                    <span className="font-medium text-navy-900">
                      🧵 {currentMascot.handloomHeritage}
                    </span>
                  </div>
                </div>
              </div>

              {/* Greeting & Folklore Column */}
              <div className="md:col-span-7 space-y-4">
                
                {/* Greeting Bubble */}
                <div className="bg-sand-50 border-2 border-saffron-300 rounded-xl p-5 shadow-xs relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-saffron-800 uppercase tracking-wider">
                      Indigenous Greeting · {currentMascot.state} ({currentMascot.nativeScript})
                    </span>
                    <button
                      onClick={() => handleCopyGreeting(currentMocGreetingClean(currentMascot.greeting), currentMascot.state)}
                      className="text-[11px] font-mono text-forest-800 hover:text-navy-950 font-semibold underline flex items-center gap-1"
                    >
                      {copiedState === currentMascot.state ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 text-forest-700" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <span>Copy Greeting</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-3xl font-display font-extrabold text-navy-900 tracking-tight">
                    "{currentMascot.greeting}"
                  </div>

                  <div className="mt-2 text-xs font-mono text-slate-600 flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5 text-saffron-600" />
                    <span>Pronunciation: <em>/{currentMascot.greetingPhonetic}/</em></span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-sand-200 text-xs font-serif text-slate-700 italic">
                    Meaning: "{currentMascot.greetingMeaning}"
                  </div>
                </div>

                {/* Cultural Tidbit */}
                <div className="bg-white p-4 rounded-xl border border-sand-300">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-forest-800 uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                    Wholesome Cultural Folk-Note
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
                    {currentMascot.cuteTidbit}
                  </p>
                </div>

                {/* Harmonious Unity Note */}
                <div className="p-3 bg-ivory-200 rounded-lg text-[11px] font-mono text-sand-700 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border border-sand-300">
                  <span>Part of the "Ashta Lakshmi" (Eight Fortunes) of India</span>
                  <span className="text-saffron-700 font-bold shrink-0">
                    Sovereign Union of India
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Footer Navigation */}
          <div className="bg-sand-100 border-t border-sand-300 px-6 py-3 flex items-center justify-between text-xs font-mono text-sand-500 shrink-0">
            <span>Explore all 8 states to learn their authentic greetings</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-navy-900 text-white font-bold hover:bg-navy-800 transition-colors shadow-xs"
            >
              Done Exploring
            </button>
          </div>
        </motion.div>
      </div>,
      document.body
    );
  };

function currentMocGreetingClean(greeting: string): string {
  return greeting.split('(')[0].replace('"', '').trim();
}

// ============================================================================
// 2. VINTAGE CULTURAL POSTMARK STAMP (DAK GHAR PHILATELIC BADGE)
// ============================================================================
interface CulturalPostmarkProps {
  state?: string;
  category?: string;
  dispatchId?: number;
  className?: string;
}

export const CulturalPostmark: React.FC<CulturalPostmarkProps> = ({
  state = 'Northeast',
  category = 'Dispatch',
  dispatchId = 1,
  className = ''
}) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center p-2 rounded-xs bg-[#FAF5EB] stamp-perforations select-none ${className}`}
      title="Indian Army & Assam Rifles Verified Postal Dispatch"
    >
      <div className="w-full border border-sand-400 p-2 flex flex-col items-center justify-center text-center">
        {/* Postal Header */}
        <div className="flex items-center justify-between w-full text-[9px] font-mono text-sand-500 uppercase tracking-widest border-b border-sand-300 pb-1">
          <span>INDIA POST</span>
          <span>₹ 5.00</span>
        </div>

        {/* Center Postmark Seal */}
        <div className="my-1.5 flex items-center justify-center gap-2">
          <div className="w-7 h-7 rounded-full border border-dashed border-forest-800 flex items-center justify-center text-[10px] text-forest-800 font-mono font-bold leading-none">
            IA-AR
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-serif font-bold text-navy-950 leading-tight">
              {state.toUpperCase()}
            </span>
            <span className="block text-[8px] font-mono text-saffron-700 tracking-tight">
              G.P.O. SPEED POST
            </span>
          </div>
        </div>

        {/* Cancellation Barcode & Date */}
        <div className="w-full pt-1 border-t border-sand-300 flex items-center justify-between text-[8px] font-mono text-sand-500">
          <span>DISPATCH #{String(dispatchId).padStart(2, '0')}</span>
          <span>OCT 2026</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. STEAMING HIMALAYAN & ASSAM TEA COMPANION (EASTER EGG)
// ============================================================================
const TEA_TRIVIA = [
  {
    title: 'Assam Orthodox Second Flush',
    text: 'Harvested in the Brahmaputra Valley, renowned worldwide for its brisk golden tips, rich malty liquor, and honeyed body.'
  },
  {
    title: 'Sikkim Temi Organic Garden',
    text: 'Perched at 7,000 ft against Mount Kanchenjunga, Temi produces 100% organic teas celebrated across European auctions.'
  },
  {
    title: 'Meghalaya Wild Forest Tea',
    text: 'Artisan hand-rolled teas harvested from wild camellia groves near Cherrapunji, scented naturally with pine smoke and dew.'
  },
  {
    title: 'Manipur Sangai Green Leaves',
    text: 'Sun-dried gently in bamboo woven trays by rural cooperative women weavers across Bishnupur and Imphal East.'
  }
];

export const SteamingTeaCompanion: React.FC = () => {
  const [showTrivia, setShowTrivia] = useState(false);
  const [triviaIndex, setTriviaIndex] = useState(0);

  const currentFact = TEA_TRIVIA[triviaIndex];

  const handleNextTea = () => {
    setTriviaIndex((prev) => (prev + 1) % TEA_TRIVIA.length);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowTrivia(!showTrivia)}
        className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-sand-300 shadow-2xs hover:border-saffron-400 hover:bg-sand-50 transition-all text-left"
        aria-label="Steaming Northeast Mountain Chai Companion"
      >
        {/* Animated Steaming Teacup */}
        <div className="relative flex items-center justify-center w-6 h-6">
          {/* Steam curls */}
          <div className="absolute -top-2 left-1.5 w-1 h-2 bg-saffron-500/60 rounded-full animate-steam-1" />
          <div className="absolute -top-3 left-3 w-1 h-3 bg-saffron-600/60 rounded-full animate-steam-2" />
          <div className="absolute -top-2 left-4 w-1 h-2 bg-saffron-500/60 rounded-full animate-steam-3" />
          
          <Coffee className="w-4 h-4 text-saffron-800" />
        </div>

        <div className="text-[11px] leading-tight">
          <span className="block font-serif font-bold text-navy-900 group-hover:text-saffron-700">
            Northeast Chai
          </span>
          <span className="block font-mono text-[9px] text-sand-500">
            Assam & Sikkim Brew
          </span>
        </div>
      </button>

      {/* Tea Folklore Popover */}
      {showTrivia && (
        <div className="absolute bottom-full mb-2 left-0 sm:left-auto sm:right-0 w-72 bg-white rounded-xl border border-sand-300 shadow-xl p-4 z-40 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-sand-200">
            <span className="font-mono text-[10px] font-bold text-saffron-700 uppercase flex items-center gap-1">
              ☕ Mountain Tea Chronicles
            </span>
            <button
              onClick={() => setShowTrivia(false)}
              className="text-sand-400 hover:text-navy-900"
              aria-label="Close Tea Popover"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-2">
            <h4 className="font-serif font-bold text-navy-900 text-sm">
              {currentFact.title}
            </h4>
            <p className="text-slate-700 font-sans mt-1 leading-relaxed text-[11px]">
              {currentFact.text}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-sand-200 flex items-center justify-between text-[10px] font-mono text-sand-500">
            <span>{triviaIndex + 1} of {TEA_TRIVIA.length}</span>
            <button
              onClick={handleNextTea}
              className="text-forest-800 font-bold hover:underline flex items-center gap-0.5"
            >
              <span>Next Garden</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 4. FLOATING ORCHID & RHODODENDRON PETAL DRIFT
// ============================================================================
export const BlossomPetalDrift: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Disable if user requested reduced motion
  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Floating Toggle Button (positioned bottom-right to prevent covering primary editorial actions) */}
      <div className="fixed bottom-4 right-6 z-30">
        <button
          onClick={() => setEnabled(!enabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono shadow-md border transition-all ${
            enabled
              ? 'bg-rose-600 text-white border-rose-700 shadow-rose-200'
              : 'bg-white/95 text-navy-900 border-sand-300 hover:bg-sand-50'
          }`}
          title="Toggle peaceful Kopou orchid & Rhododendron blossom drift"
        >
          <span>🌸</span>
          <span className="hidden sm:inline">
            Blossom Drift: <strong>{enabled ? 'ON' : 'OFF'}</strong>
          </span>
        </button>
      </div>

      {/* Floating Petals Container (z-20 stays strictly beneath sticky nav and modals) */}
      {enabled && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-20" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => {
            const leftPos = (i * 7.5 + (i % 3) * 3) % 96;
            const animDuration = 10 + (i % 5) * 2.5;
            const animDelay = (i * 0.9) % 6;
            const size = 12 + (i % 4) * 4;

            return (
              <div
                key={i}
                className="absolute top-0 opacity-0"
                style={{
                  left: `${leftPos}%`,
                  animation: `petalDrift ${animDuration}s linear infinite`,
                  animationDelay: `${animDelay}s`
                }}
              >
                <svg
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={i % 2 === 0 ? 'text-pink-400/70' : 'text-rose-400/60'}
                >
                  <path
                    d="M12 2C8 6 3 10 3 15C3 19 6.5 22 11 22C15.5 22 21 17 21 12C21 8 16 2 12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

// ============================================================================
// 5. CUTE HERITAGE BANNER / GAMOSA GREETING RIBBON
// ============================================================================
export const NortheastHeritageBanner: React.FC<{ onOpenPavilion: () => void }> = ({
  onOpenPavilion
}) => {
  return (
    <div className="bg-sand-100 border-y border-sand-300 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-forest-700" />
          <span className="font-mono text-sand-600 uppercase tracking-wider text-[11px]">
            Ashtalakshmi Cultural Heritage:
          </span>
          <span className="font-serif italic text-navy-950 font-medium">
            "Nomoskar · Khublei · Chibai · Tashi Delek · Khurumjari · Khulumkha"
          </span>
        </div>

        <button
          onClick={onOpenPavilion}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-sand-300 text-forest-800 hover:text-navy-950 font-mono text-[11px] font-bold hover:shadow-2xs transition-all"
        >
          <span>🌸 Open Cultural Pavilion</span>
          <ChevronRight className="w-3 h-3 text-saffron-600" />
        </button>
      </div>
    </div>
  );
};