/**
 * AIROX 2026 - Main Homepage Application
 * Orchestrates continuous narrative story across all symposium sections.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ScrollProgress } from './components/layout/ScrollProgress';
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
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [preSelectedEventId, setPreSelectedEventId] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<'home' | 'register'>('home');

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
          const yOffset = -40;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const yOffset = -40;
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

  return (
    <SmoothScrollProvider>
      <div className="scroll-animation-shell min-h-screen bg-transparent text-gray-200 font-sans selection:bg-[#e07a38]/30 selection:text-white antialiased relative">
        <StaticBackground />

        {/* ROUTE VIEW: Exclusive Registration Portal */}
        {currentRoute === 'register' ? (
          <div className="min-h-screen flex flex-col pt-6 relative z-10">
            {/* Top Floating Return Button for Registration Endpoint */}
            <div className="sticky top-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
              <div className="max-w-7xl mx-auto flex items-center justify-start">
                <button
                  onClick={navigateToHome}
                  className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-cyan-400 hover:text-black border border-white/20 hover:border-cyan-400 text-xs font-mono font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to AIROX '26 Homepage</span>
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
          /* ROUTE VIEW: Main Homepage Flow (No Navigation Bar) */
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
            />

            {/* 2. Events: Flagship Competitions */}
            <EventsSection
              onSelectEventForRegistration={handleSelectEventForRegistration}
            />

            {/* 3. Official Brochure: Event Schedule & Details Flyer */}
            <BrochureSection />

            {/* 4. Past Highlights: Historical Retrospective & Photo Gallery */}
            <PastHighlightsSection />

            {/* 4. Organizing Committee Section */}
            <TeamSection />

            {/* 5. Academic Foundation Section (Placed between Organizing Committee and Brand/About) */}
            <DepartmentSection />

            {/* 6. Contact: Venue Directions & Campus Helplines */}
            <ContactSection />

            {/* Footer Credentials */}
            <Footer />
          </motion.main>
        )}
      </div>
    </SmoothScrollProvider>
  );
}
