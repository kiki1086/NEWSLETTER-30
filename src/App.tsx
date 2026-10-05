import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Masthead } from './components/Masthead';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CoverView } from './views/CoverView';
import { SecurityPulseView } from './views/SecurityPulseView';
import { FrontierView } from './views/FrontierView';
import { RegionalCurrentsView } from './views/RegionalCurrentsView';
import { DevelopmentView } from './views/DevelopmentView';
import { SocietyYouthView } from './views/SocietyYouthView';
import { SportsView } from './views/SportsView';
import { StateDetailView } from './views/StateDetailView';
import { TimelineView } from './views/TimelineView';
import { SourceDirectoryView } from './views/SourceDirectoryView';
import { SelectionRationaleView } from './views/SelectionRationaleView';
import { AppendicesView } from './views/AppendicesView';
import { MagazineReaderView } from './views/MagazineReaderView';
import { NewsletterDigestView } from './views/NewsletterDigestView';
import { BlossomPetalDrift } from './components/NortheastCulturalDetailing';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useKeyboardNav } from './hooks/useKeyboardNav';

export const App: React.FC = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  // Global keyboard shortcuts (Alt+ArrowLeft / Alt+ArrowRight to change sections)
  useKeyboardNav();

  // Lenis Smooth Scrolling (disabled if reduced motion requested)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [location.pathname, prefersReducedMotion]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-slate-900 font-sans selection:bg-saffron-500 selection:text-white">
      {/* Delicate floating Kopou orchid & Rhododendron blossom drift */}
      <BlossomPetalDrift />

      {/* Editorial Masthead */}
      <div className="no-print">
        <Masthead />
      </div>

      {/* Main Section Navigation Bar */}
      <div className="no-print">
        <Navigation />
      </div>

      {/* Main Content with Horizontal Editorial Page Transition */}
      <main className="flex-1" id="main-content" role="main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<CoverView />} />
              <Route path="/magazine" element={<MagazineReaderView />} />
              <Route path="/album" element={<MagazineReaderView />} />
              <Route path="/newsletter" element={<NewsletterDigestView />} />
              <Route path="/security-pulse" element={<SecurityPulseView />} />
              <Route path="/frontier-view" element={<FrontierView />} />
              <Route path="/regional-currents" element={<RegionalCurrentsView />} />
              <Route path="/development" element={<DevelopmentView />} />
              <Route path="/society-youth" element={<SocietyYouthView />} />
              <Route path="/sports" element={<SportsView />} />
              <Route path="/states" element={<StateDetailView />} />
              <Route path="/timeline" element={<TimelineView />} />
              <Route path="/appendices" element={<AppendicesView />} />
              <Route path="/appendix" element={<AppendicesView />} />
              <Route path="/sources" element={<AppendicesView initialTab="sources" />} />
              <Route path="/rationale" element={<AppendicesView initialTab="rationale" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Colophon */}
      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
};
