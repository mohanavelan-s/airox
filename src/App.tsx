/**
 * AIROX 2026 - Main Homepage Application
 * Orchestrates continuous narrative story across all symposium sections.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from './components/layout/Footer';

import { HeroSection } from './components/sections/HeroSection';
import { EventsSection } from './components/sections/EventsSection';
import { BrochureSection } from './components/sections/BrochureSection';
import { RegistrationSection } from './components/sections/RegistrationSection';
import { DepartmentSection } from './components/sections/DepartmentSection';
import { PastHighlightsSection } from './components/sections/PastHighlightsSection';
import { TeamSection } from './components/sections/TeamSection';
import { ContactSection } from './components/sections/ContactSection';
import { SmoothScrollProvider } from './components/ui/SmoothScrollProvider';
import { StaticBackground } from './components/ui/StaticBackground';
import {
  ArrowLeft,
  CheckCircle2,
  Trophy,
  Calendar,
  MapPin,
  X,
  FileText,
  Users,
  Award,
} from 'lucide-react';

export default function App() {
  const [preSelectedEventId, setPreSelectedEventId] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<'home' | 'register'>('home');
  const [isEndedPopupOpen, setIsEndedPopupOpen] = useState(true);

  useEffect(() => {
    const handleLocationCheck = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path === '/register' ||
        path.endsWith('/register') ||
        path.endsWith('/register/') ||
        path.includes('/register') ||
        hash === '#register' ||
        hash === '#/register' ||
        search.includes('p=/register') ||
        search.includes('p=%2fregister')
      ) {
        setCurrentRoute('register');
      } else {
        setCurrentRoute('home');
      }
    };

    handleLocationCheck();
    window.addEventListener('popstate', handleLocationCheck);
    return () => window.removeEventListener('popstate', handleLocationCheck);
  }, []);

  // Close popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEndedPopupOpen) {
        setIsEndedPopupOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEndedPopupOpen]);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToRegister = (eventId?: string) => {
    if (eventId) {
      setPreSelectedEventId(eventId);
    }
    window.history.pushState({}, '', '/register');
    setCurrentRoute('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (currentRoute !== 'home') {
      window.history.pushState({}, '', '/');
      setCurrentRoute('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const yOffset = -60;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const yOffset = -60;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectEventForRegistration = (eventId: string) => {
    navigateToRegister(eventId);
  };

  const handleOpenRegistration = () => {
    navigateToRegister();
  };

  const handleExploreEvents = () => {
    scrollToSection('events');
  };

  const handleViewBrochure = () => {
    setIsEndedPopupOpen(false);
    scrollToSection('brochure');
  };

  return (
    <SmoothScrollProvider>
      <div className="scroll-animation-shell min-h-screen bg-transparent text-gray-200 font-sans selection:bg-[#e07a38]/30 selection:text-white antialiased relative">
        <StaticBackground />

        {/* TOP PAGE HEADER ANNOUNCEMENT BAR: EVENT HAS ENDED */}
        <header className="sticky top-0 z-50 w-full bg-[#050914]/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-xs sm:text-sm font-medium text-gray-200 truncate">
                <strong className="font-extrabold text-amber-300 uppercase tracking-wider mr-1.5">
                  AIROX &apos;26 HAS ENDED:
                </strong>
                <span>
                  Concluded on 22 August 2026 at JJCET, Trichy. Thank you to all 500+ delegates!
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleViewBrochure}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-400 hover:text-black border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                View Brochure
              </button>
              <button
                type="button"
                onClick={() => setIsEndedPopupOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-400 hover:text-black border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                Event Notice
              </button>
            </div>
          </div>
        </header>

        {/* EVENT HAS ENDED POP-UP MODAL */}
        <AnimatePresence>
          {isEndedPopupOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsEndedPopupOpen(false)}
              className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-2xl bg-[#090e1c] border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden text-white font-dm"
              >
                {/* Top Modal Header Bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-amber-950/60 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>OFFICIAL SYMPOSIUM UPDATE</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEndedPopupOpen(false)}
                    aria-label="Close announcement"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2 text-center">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-3 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                      <Award className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-white">
                      AIROX &apos;26 Has Ended
                    </h2>
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold">
                      Department of Artificial Intelligence &amp; Data Science
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-gray-300 text-center leading-relaxed">
                    The <strong className="text-white">AIROX 2026 National Level Technical Symposium</strong> at{' '}
                    <strong className="text-white">JJ College of Engineering and Technology (Autonomous), Trichy</strong>{' '}
                    has officially concluded. We extend our heartfelt gratitude to all delegates, winners, faculty coordinators, and student volunteers for making the event an unforgettable milestone!
                  </p>

                  {/* Concluded Highlights Strip */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <Calendar className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <span className="block text-sm font-black text-white font-mono">22 AUG 2026</span>
                      <span className="text-[10px] font-mono uppercase text-gray-400">Concluded</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <Trophy className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <span className="block text-sm font-black text-white font-mono">9 EVENTS</span>
                      <span className="text-[10px] font-mono uppercase text-gray-400">Completed</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <Users className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                      <span className="block text-sm font-black text-white font-mono">500+</span>
                      <span className="text-[10px] font-mono uppercase text-gray-400">Delegates</span>
                    </div>
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleViewBrochure}
                      className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.35)] whitespace-nowrap"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Official Brochure</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEndedPopupOpen(false)}
                      className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
                    >
                      Continue to Website
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ROUTE VIEW: Exclusive Registration Portal */}
        {currentRoute === 'register' ? (
          <div className="min-h-screen flex flex-col pt-6 relative z-10">
            {/* Top Floating Return Button for Registration Endpoint */}
            <div className="sticky top-12 z-40 px-4 sm:px-8 py-4 pointer-events-none">
              <div className="max-w-7xl mx-auto flex items-center justify-start">
                <button
                  onClick={navigateToHome}
                  className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-cyan-400 hover:text-black border border-white/20 hover:border-cyan-400 text-xs font-mono font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to AIROX &apos;26 Homepage</span>
                </button>
              </div>
            </div>

            {/* Exclusive Registration Body */}
            <main className="flex-1 py-8">
              <RegistrationSection
                preSelectedEventId={preSelectedEventId}
                onClearPreSelectedEvent={() => setPreSelectedEventId(null)}
              />
            </main>

            <Footer />
          </div>
        ) : (
          /* ROUTE VIEW: Main Homepage Flow */
          <motion.main
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* 1. Hero: Immediate Impact & Identity */}
            <HeroSection
              onRegisterClick={handleOpenRegistration}
              onExploreEventsClick={handleExploreEvents}
              onViewBrochureClick={handleViewBrochure}
            />

            {/* 2. Events: Flagship Competitions */}
            <EventsSection
              onSelectEventForRegistration={handleSelectEventForRegistration}
            />

            {/* 3. Official Brochure: Event Schedule & Details Flyer */}
            <BrochureSection />

            {/* 4. Past Highlights: Historical Retrospective & Photo Gallery */}
            <PastHighlightsSection />

            {/* 5. Organizing Committee Section */}
            <TeamSection />

            {/* 6. Academic Foundation Section */}
            <DepartmentSection />

            {/* 7. Contact: Venue Directions & Campus Helplines */}
            <ContactSection />

            {/* Footer Credentials */}
            <Footer />
          </motion.main>
        )}
      </div>
    </SmoothScrollProvider>
  );
}

