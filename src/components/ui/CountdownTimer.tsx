/**
 * AIROX 2026 - Dynamic Countdown Timer Component
 * Tracks real-time countdown to August 22, 2026 with smooth digit ticks.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date('2026-08-22T09:00:00+05:30').getTime();

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) return null;

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="w-full bg-cyan-950/30 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-3 font-dm"
    >
      <div className="flex items-center justify-between text-xs font-mono tracking-wider text-cyan-300 border-b border-cyan-500/20 pb-2.5">
        <span className="flex items-center gap-2 uppercase font-bold">
          <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>SYMPOSIUM COUNTDOWN</span>
        </span>
        <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
          <Sparkles className="w-3 h-3" />
          <span>AUG 22, 2026</span>
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-black/60 border border-white/10 group hover:border-cyan-400/50 transition-all"
          >
            <span className="text-xl sm:text-3xl font-black text-white font-mono tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-gray-400 tracking-widest mt-1.5 uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
