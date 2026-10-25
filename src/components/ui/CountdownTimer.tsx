/**
 * AIROX 2026 - Symposium Status / Concluded Banner Component
 * Replaces the countdown timer now that AIROX 2026 (August 22, 2026) has officially ended.
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Trophy, Calendar, Users } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const summaryStats = [
    { label: 'EVENT DATE', value: 'AUG 22' },
    { label: 'EVENTS HELD', value: '9 / 9' },
    { label: 'DELEGATES', value: '500+' },
    { label: 'STATUS', value: 'ENDED' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="w-full bg-cyan-950/35 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(6,182,212,0.18)] space-y-3.5 font-dm"
    >
      <div className="flex items-center justify-between text-xs font-mono tracking-wider text-cyan-300 border-b border-cyan-500/20 pb-2.5">
        <span className="flex items-center gap-2 uppercase font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>SYMPOSIUM STATUS</span>
        </span>
        <span className="flex items-center gap-1.5 text-amber-300 font-bold tracking-widest text-[11px] uppercase">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>AUG 22, 2026 · CONCLUDED</span>
        </span>
      </div>

      {/* Main Event Ended Banner inside the Countdown Box */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-cyan-950/60 to-slate-950/80 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-2xl font-black text-white tracking-tight uppercase font-dm">
              EVENT HAS ENDED
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            AIROX &apos;26 has officially concluded. Thank you to all participants, winners, and coordinators for making this symposium a grand success!
          </p>
        </div>
      </div>

      {/* 4-Column Concluded Stats replacing the 00:00:00:00 blocks */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-black/60 border border-white/10"
          >
            <span
              className={`text-base sm:text-xl font-black font-mono tracking-tight leading-none tabular-nums ${
                stat.value === 'ENDED'
                  ? 'text-amber-400'
                  : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200'
              }`}
            >
              {stat.value}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-gray-400 tracking-widest mt-1.5 uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

