/**
 * AIROX 2026 - Innovation Hub Events Section (National Level Competitions)
 * Features Glowing Gradient Glassmorphism strictly matching Reference Picture 2:
 * Angled glowing neon gradient pillars (-skew-x-12) behind frosted glass cards.
 * Preserves Cyan for Technical Events and Amber/Orange for Non-Technical Events.
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Container } from '../ui/Container';
import { Cpu, Sparkles, Clock, MapPin, Users, Trophy, ArrowUpRight, FileText, UserCheck, AlertCircle } from 'lucide-react';
import { TECHNICAL_EVENTS, NON_TECHNICAL_EVENTS } from '../../data/initialData';
import { SymposiumEvent } from '../../types';

interface EventsSectionProps {
  onSelectEventForRegistration: (eventId: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onSelectEventForRegistration,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'technical' | 'non-technical'>('all');
  const [selectedEvent, setSelectedEvent] = useState<SymposiumEvent | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const allEvents: SymposiumEvent[] = [...TECHNICAL_EVENTS, ...NON_TECHNICAL_EVENTS];

  const filteredEvents = allEvents.filter((event) => {
    if (activeTab === 'technical') return event.category === 'technical';
    if (activeTab === 'non-technical') return event.category === 'non-technical';
    return true;
  });

  // Triple list for true 100% seamless infinite marquee scrolling
  const marqueeGroup = filteredEvents;

  const formatCardVenue = (venue?: string) => {
    if (!venue) return '';
    if (/rk block/i.test(venue)) return 'RK Block';
    return venue;
  };

  return (
    <section id="events" className="py-24 sm:py-32 bg-transparent text-white relative overflow-hidden border-t border-white/10 font-dm">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        <div className="space-y-10">
          
          {/* Section Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              badgeText="National Level Competitions"
              title="9 Flagship Competitions"
              ghostWatermark="EVENTS"
              description="Explore 4 Technical (Cyan Glow) and 5 Non-Technical (Amber Glow) national-level competitions with glowing gradient glassmorphism."
            />

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/15 p-1.5 rounded-2xl shrink-0 self-start md:self-auto font-dm text-xs uppercase tracking-wider shadow-2xl backdrop-blur-md">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer font-bold ${
                  activeTab === 'all'
                    ? 'bg-white text-black shadow-lg shadow-white/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                All (9)
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                  activeTab === 'technical'
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/50'
                    : 'text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-950/30'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Technical (4)
              </button>
              <button
                onClick={() => setActiveTab('non-technical')}
                className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                  activeTab === 'non-technical'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/50'
                    : 'text-amber-400/80 hover:text-amber-300 hover:bg-amber-950/30'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Non-Technical (5)
              </button>
            </div>
          </div>

        </div>
      </Container>

      {/* INFINITE SEAMLESS AUTO SCROLLING MARQUEE CAROUSEL */}
      <div 
        className="mt-8 pb-12 pt-4 relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Scroll Track Container */}
        <div className="w-full overflow-x-auto no-scrollbar py-2">
          <div
            key={activeTab}
            className="flex gap-6 sm:gap-8 w-max animate-infinite-scroll"
            style={{
              animationPlayState: (isPaused || selectedEvent !== null) ? 'paused' : 'running',
              willChange: 'transform',
            }}
          >
            {/* Repeat marqueeGroup 4 times to guarantee non-stop 100% infinite continuous marquee scroll */}
            {[...marqueeGroup, ...marqueeGroup, ...marqueeGroup, ...marqueeGroup].map((event, dupIndex) => {
            const isTech = event.category === 'technical';
            
            const cardBorder = isTech
              ? 'border-cyan-500/30 group-hover:border-blue-500/80 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]'
              : 'border-amber-500/30 group-hover:border-amber-400/80 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]';

            return (
              <div 
                key={`event-dup-${dupIndex}-${event.id}`} 
                className="relative group shrink-0 w-[310px] sm:w-[350px] my-3"
              >
                {/* MAIN EVENT CARD CONTAINER (Ref UI layout) */}
                <div
                  className={`relative z-10 rounded-2xl bg-[#0c101c] border ${cardBorder} transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between shadow-xl`}
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* CARD HEADER: BANNER IMAGE WITH FLOATING BADGES */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-black/60 shrink-0">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const currentSrc = target.src;
                          if (currentSrc.includes('thumbnail')) {
                            const idMatch = currentSrc.match(/id=([^&]+)/);
                            if (idMatch && idMatch[1]) {
                              target.src = `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
                            }
                          }
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-slate-900 opacity-80 flex items-center justify-center">
                        {isTech ? <Cpu className="w-12 h-12 text-cyan-400" /> : <Sparkles className="w-12 h-12 text-amber-400" />}
                      </div>
                    )}

                    {/* Top Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c101c] via-transparent to-black/40 pointer-events-none" />

                    {/* Left Top Badge (Orange/Red Tag e.g. Early Bird style) */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-[#ff3b30] text-white shadow-lg">
                        {isTech ? <Cpu className="w-3 h-3 text-white" /> : <Sparkles className="w-3 h-3 text-white" />}
                        <span>{isTech ? 'TECHNICAL' : 'NON-TECH'}</span>
                      </span>
                      {event.isOnlineRegistrationClosed && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-black shadow-md">
                          ONLINE CLOSED
                        </span>
                      )}
                    </div>

                    {/* Right Top Badge (White Date Card e.g. 28 SEP style) */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-white text-black font-black px-2.5 py-1 rounded-xl shadow-xl text-center flex flex-col items-center justify-center leading-none min-w-[42px]">
                        <span className="text-xs sm:text-sm font-extrabold text-black">22</span>
                        <span className="text-[10px] font-extrabold tracking-tight text-gray-800 uppercase">AUG</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD BODY CONTENT */}
                  <div className="p-5 pt-3 flex-1 flex flex-col justify-between space-y-3.5 text-left">
                    
                    {/* Event Title */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold font-sans text-white tracking-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {event.title}
                      </h3>
                    </div>

                    {/* Time & Location Meta Row */}
                    <div className="flex items-center justify-between gap-2 text-xs font-medium text-gray-300 pt-1">
                      <div className="flex items-center gap-1.5 text-blue-400 font-semibold truncate">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                        <span className="truncate">{event.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-300 font-medium truncate" title={event.venue}>
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                        <span className="truncate">{formatCardVenue(event.venue)}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed line-clamp-2">
                      {event.shortDescription}
                    </p>

                    {/* Team Size Tag */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span>{event.teamSize}</span>
                      </span>
                    </div>

                    {/* Primary Solid Action Button (Matching Reference UI) */}
                    <div className="pt-2">
                      {event.isOnlineRegistrationClosed ? (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-2.5 px-4 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-default select-none"
                        >
                          <AlertCircle className="w-4 h-4 text-amber-400" />
                          <span>Online Closed</span>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectEventForRegistration(event.id);
                          }}
                          className="w-full py-2.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Register Now</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>

      {/* DETAILED EVENT MODAL */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          subtitle={`${selectedEvent.category.toUpperCase()} COMPETITION • ${selectedEvent.teamSize}`}
          maxWidth="lg"
        >
          <div className="space-y-6 text-gray-200 font-dm">
            
            {/* Category Header Banner */}
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              selectedEvent.category === 'technical'
                ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center gap-2">
                {selectedEvent.category === 'technical' ? (
                  <Cpu className="w-5 h-5 text-cyan-400" />
                ) : (
                  <Sparkles className="w-5 h-5 text-amber-400" />
                )}
                <span className="font-extrabold uppercase text-sm tracking-wider">
                  {selectedEvent.category.toUpperCase()} COMPETITION
                </span>
              </div>
              <span className="text-xs font-mono uppercase bg-black/50 px-3 py-1 rounded-md border border-white/10 text-white">
                AIROX '26
              </span>
            </div>

            {/* Closed Registration Alert Banner */}
            {selectedEvent.isOnlineRegistrationClosed && (
              <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-300 font-sans">
                    The event is closed for online registration
                  </h4>
                  <p className="text-xs text-amber-100/90 leading-relaxed font-sans">
                    Online registration for this event is closed.
                  </p>
                </div>
              </div>
            )}

            {/* Event Modal Image Banner */}
            {selectedEvent.imageUrl && (
              <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-white/20 bg-black/60 relative">
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const currentSrc = target.src;
                    if (currentSrc.includes('thumbnail')) {
                      const idMatch = currentSrc.match(/id=([^&]+)/);
                      if (idMatch && idMatch[1]) {
                        target.src = `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
                      }
                    }
                  }}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 border border-white/10 p-4 rounded-xl text-xs font-mono uppercase">
              <div>
                <span className="text-gray-400 block text-[10px]">TIME SLOT</span>
                <span className={`font-bold flex items-center gap-1.5 mt-0.5 ${
                  selectedEvent.category === 'technical' ? 'text-cyan-300' : 'text-amber-300'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  {selectedEvent.timeSlot}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">VENUE</span>
                <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-300" />
                  {selectedEvent.venue}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">TEAM SIZE</span>
                <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-gray-300" />
                  {selectedEvent.teamSize}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 font-bold ${
                selectedEvent.category === 'technical' ? 'text-cyan-400' : 'text-amber-400'
              }`}>
                <FileText className="w-4 h-4" />
                Competition Overview & Rules
              </h4>
              <p className="text-sm text-gray-200 leading-relaxed font-sans">
                {selectedEvent.fullDescription}
              </p>
            </div>

            {/* Prize Block */}
            {selectedEvent.prizes && (
              <div className={`space-y-3 p-4 rounded-xl border ${
                selectedEvent.category === 'technical'
                  ? 'bg-cyan-950/20 border-cyan-500/30'
                  : 'bg-amber-950/20 border-amber-500/30'
              }`}>
                <h4 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 font-bold ${
                  selectedEvent.category === 'technical' ? 'text-cyan-400' : 'text-amber-400'
                }`}>
                  <Trophy className="w-4 h-4" />
                  Rewards & Honors
                </h4>
                <div className={`grid gap-3 text-center text-xs font-mono uppercase ${
                  selectedEvent.prizes.third ? 'grid-cols-3' : 'grid-cols-2'
                }`}>
                  {selectedEvent.prizes.first && (
                    <div className="bg-black/80 p-3 rounded-xl border border-white/10">
                      <span className="text-gray-400 text-[10px] block">1st Prize</span>
                      <span className={`font-black text-sm block mt-0.5 ${
                        selectedEvent.category === 'technical' ? 'text-cyan-300' : 'text-amber-300'
                      }`}>{selectedEvent.prizes.first}</span>
                    </div>
                  )}
                  {selectedEvent.prizes.second && (
                    <div className="bg-black/80 p-3 rounded-xl border border-white/10">
                      <span className="text-gray-400 text-[10px] block">2nd Prize</span>
                      <span className="text-white font-bold text-sm block mt-0.5">{selectedEvent.prizes.second}</span>
                    </div>
                  )}
                  {selectedEvent.prizes.third && (
                    <div className="bg-black/80 p-3 rounded-xl border border-white/10">
                      <span className="text-gray-400 text-[10px] block">3rd Prize</span>
                      <span className="text-gray-300 font-bold text-sm block mt-0.5">{selectedEvent.prizes.third}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rules List */}
            {selectedEvent.rules && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-cyan-400" />
                  Rules & Guidelines
                </h4>
                <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside font-sans leading-relaxed">
                  {selectedEvent.rules.map((rule, idx) => (
                    <li key={idx} className="bg-white/5 p-2 rounded-lg border border-white/5">{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Coordinators */}
            {selectedEvent.coordinators && (
              <div className="space-y-3 pt-3 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider flex items-center gap-1.5 font-bold">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  Event Coordinators
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono uppercase">
                  {selectedEvent.coordinators.faculty?.map((coord, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-gray-400 text-[10px] block">Faculty Coordinator</span>
                        <span className="text-white font-bold block mt-0.5">{coord.name}</span>
                      </div>
                      {coord.email && (
                        <a href={`mailto:${coord.email}`} className="text-cyan-400 hover:underline text-[10px] block lowercase pt-1 truncate">
                          {coord.email}
                        </a>
                      )}
                    </div>
                  ))}
                  {selectedEvent.coordinators.student?.map((coord, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-gray-400 text-[10px] block">Student Coordinator</span>
                        <span className="text-white font-bold block mt-0.5">{coord.name}</span>
                      </div>
                      {coord.phone && (
                        <a 
                          href={`tel:${coord.phone.replace(/\s+/g, '')}`} 
                          className="text-amber-400 hover:text-amber-300 hover:underline text-[11px] font-bold block pt-1 tracking-wider"
                        >
                          {coord.phone}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className={`pt-4 flex items-center gap-4 border-t border-white/10 ${selectedEvent.isOnlineRegistrationClosed ? 'justify-end' : 'justify-between'}`}>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </Button>
              {!selectedEvent.isOnlineRegistrationClosed && (
                <button
                  onClick={() => {
                    const id = selectedEvent.id;
                    setSelectedEvent(null);
                    onSelectEventForRegistration(id);
                  }}
                  className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    selectedEvent.category === 'technical'
                      ? 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                      : 'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                  }`}
                >
                  <span>+ SELECT FOR REGISTRATION</span>
                </button>
              )}
            </div>

          </div>
        </Modal>
      )}
    </section>
  );
};
