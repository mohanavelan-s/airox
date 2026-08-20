/**
 * AIROX 2026 - Minimalist Modern Banner Section
 * Recreated following the exact layout, typography, and pure black plane design of the reference image.
 * Uses DM Sans font, pure white text, accent block, vertical keylines, and right-hand info cards.
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Calendar, 
  MapPin, 
  Ticket, 
  Award, 
  Users, 
  Cpu, 
  Instagram, 
  UserPlus, 
  CheckCircle2 
} from 'lucide-react';
import { COLLEGE_INFO, SYMPOSIUM_INFO } from '../../data/initialData';
import { CountdownTimer } from '../ui/CountdownTimer';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreEventsClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreEventsClick,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-transparent text-white font-dm flex flex-col justify-between overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-12 px-4 sm:px-8 lg:px-16"
    >
      {/* MAIN HERO CONTENT */}
      <div className="w-full max-w-[1700px] mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-8 z-10">
        
        {/* LEFT MAIN CONTENT COLUMN (Cols 1 - 7): ENLARGED TYPOGRAPHY */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pr-0 lg:pr-6">
          
          {/* Eyebrow Tag with Cyan Accent Block */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3.5"
          >
            {/* Accent Cyan Rectangle Block */}
            <span className="w-3.5 h-9 bg-cyan-400 block shrink-0 rounded-sm shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
              NATIONAL LEVEL TECHNICAL SYMPOSIUM 2026
            </span>
          </motion.div>

          {/* GIANT MAIN TITLE (Pure White DM Sans Ultra-Bold - ENLARGED) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="text-7xl sm:text-9xl xl:text-[11rem] font-black text-white tracking-tighter uppercase leading-[0.85] font-dm drop-shadow-[0_10px_30px_rgba(255,255,255,0.15)]">
              AIROX '26
            </h1>
            <p className="text-sm sm:text-base xl:text-lg uppercase tracking-[0.35em] text-cyan-400 font-bold pl-1">
              DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE
            </p>
          </motion.div>

          {/* Description Paragraph under Vertical Keyline - ENLARGED */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-l-4 border-cyan-400 pl-6 py-2 space-y-4"
          >
            <p className="text-base sm:text-xl text-gray-200 leading-relaxed font-normal max-w-2xl">
              Accelerating Intelligence, Engineering the Future. A flagship national summit hosted by the Department of AI & DS at JJ College of Engineering and Technology (Autonomous), Trichy.
            </p>
            
            {/* Quick Metadata Line - ENLARGED */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-sm sm:text-base text-white font-bold uppercase tracking-wider">
              <span className="flex items-center gap-2 text-gray-200">
                <Calendar className="w-4 h-4 text-cyan-400" />
                {SYMPOSIUM_INFO.date}
              </span>
              <span className="flex items-center gap-2 text-gray-200">
                <MapPin className="w-4 h-4 text-pink-400" />
                Main Auditorium, JJCET
              </span>
            </div>
          </motion.div>

          {/* DYNAMIC SYMPOSIUM COUNTDOWN TIMER */}
          <div className="max-w-xl">
            <CountdownTimer />
          </div>

          {/* Action Outline Buttons - ENLARGED */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-5 pt-3"
          >
            <button
              onClick={onRegisterClick}
              className="px-9 py-4 sm:px-10 sm:py-5 bg-white text-black hover:bg-cyan-400 hover:text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] rounded-sm"
            >
              <span>REGISTER NOW — ₹200</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <button
              onClick={onExploreEventsClick}
              className="px-9 py-4 sm:px-10 sm:py-5 border-2 border-white/40 hover:border-white text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white hover:bg-white/10 transition-all cursor-pointer rounded-sm"
            >
              EXPLORE EVENTS (9)
            </button>
          </motion.div>

        </div>

        {/* RIGHT COLUMN (Cols 8 - 11): Instagram Glassmorphic Profile Showcase Card */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end w-full">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md relative group font-dm"
          >
            {/* Header label above card matching reference style */}
            <div className="flex items-center justify-between pb-3 px-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">FOLLOW US ON</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 tracking-wider">
                  _.airox._
                </span>
              </div>
            </div>

            {/* NEON GLOW BACKDROP CONTAINER */}
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_50px_rgba(236,72,153,0.35)] hover:shadow-[0_0_80px_rgba(236,72,153,0.55)] transition-all duration-500">
              
              {/* GLASS CARD INNER */}
              <div className="bg-[#0b0e14]/90 backdrop-blur-2xl rounded-[22px] p-6 sm:p-7 space-y-5 text-white border border-white/15 relative overflow-hidden">
                
                {/* Background ambient light inside card */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Top Instagram Handle Bar */}
                <div className="flex items-center justify-between relative z-10 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <span className="font-bold text-base tracking-wide text-white">_.airox._</span>
                    <span className="w-2 h-2 bg-pink-500 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 px-2.5 py-1 rounded-full text-pink-300 border border-pink-500/30">
                      INSTAGRAM
                    </span>
                  </div>
                </div>

                {/* Profile Avatar + Stats Row */}
                <div className="flex items-center justify-between gap-4 relative z-10">
                  {/* Avatar Circle with Glowing Ring */}
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shadow-xl">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                        <img
                          src="https://drive.google.com/thumbnail?id=1LIMz7pr3bpS-geAYazJ-vu_0KL7lcU8V&sz=w1000"
                          alt="AIROX Symposium Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Follow Plus Badge */}
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1.5 border-2 border-black shadow-lg">
                      <UserPlus className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="flex items-center gap-5 sm:gap-7 text-center pr-2">
                    <div>
                      <span className="block font-black text-lg sm:text-2xl text-white">26</span>
                      <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Posts</span>
                    </div>
                    <div>
                      <span className="block font-black text-lg sm:text-2xl text-white">538</span>
                      <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Followers</span>
                    </div>
                    <div>
                      <span className="block font-black text-lg sm:text-2xl text-white">786</span>
                      <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Following</span>
                    </div>
                  </div>
                </div>

                {/* Profile Details & Bio Section */}
                <div className="space-y-3 relative z-10 pt-1">
                  <div className="flex items-center justify-between font-bold text-white text-base">
                    <span className="text-white font-extrabold text-base">AIROX 2026</span>
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-500/30">
                      @ AI & DS Dept
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
                    <p className="flex items-center gap-2">
                      <span>✨</span>
                      <span className="font-semibold text-white">Accelerating Intelligence, Engineering the Future</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>🎓</span>
                      <span>National Level Technical Symposium • JJCET, Trichy</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>🗓️</span>
                      <span className="text-amber-300 font-bold">22 August 2026 • Main Auditorium</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>💬</span>
                      <span>DM for event updates, schedule & queries</span>
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href="https://www.instagram.com/_.airox._"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-pink-400 hover:text-pink-300 font-bold transition-colors text-xs sm:text-sm"
                    >
                      <span>www.instagram.com/_.airox._</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Direct Action Follow Button */}
                <div className="pt-2 relative z-10">
                  <a
                    href="https://www.instagram.com/_.airox._"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_10px_30px_rgba(236,72,153,0.4)] transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>FOLLOW @_.AIROX._ ON INSTAGRAM</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>

          </motion.div>

        </div>

      </div>

      {/* 3. BOTTOM CARDS BAR (MATCHING REFERENCE BOTTOM PANELS: "TECHNOLOGY", "INNOVATION") */}
      <div className="w-full max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 z-10">
        
        {/* Card 1: Technical Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 bg-[#0e111a]/90 backdrop-blur-xl border border-white/15 rounded-xl shadow-xl hover:border-white/30 transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-white">01. TECHNICAL EVENTS</span>
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs text-gray-300 font-normal leading-relaxed">
            Paper Presentation, Bug Hunt, Code Relay, AI Project Expo. Test your domain prowess and problem-solving skills.
          </p>
        </motion.div>

        {/* Card 2: Non-Technical Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="p-6 bg-[#0e111a]/90 backdrop-blur-xl border border-white/15 rounded-xl shadow-xl hover:border-white/30 transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-white">02. NON-TECHNICAL EVENTS</span>
            <Award className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs text-gray-300 font-normal leading-relaxed">
            Poster Design, Tech Quiz, E-Gaming, Short Film. Unleash creativity, strategy, and teamwork.
          </p>
        </motion.div>

        {/* Card 3: Key Highlights & Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-6 bg-[#0e111a]/90 backdrop-blur-xl border border-white/15 rounded-xl shadow-xl hover:border-white/30 transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-white">03. HIGHLIGHTS</span>
            <Users className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs text-gray-300 font-normal leading-relaxed">
            500+ Expected Delegates • Trophies & Awards • 100% Verified Certificates • Expert Faculty Mentors.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
