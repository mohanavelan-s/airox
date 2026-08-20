/**
 * AIROX 2026 - Innovation Hub Footer Component
 * Dark slate background, warm amber signals, and monospaced technical metadata.
 */

import React from 'react';
import { MapPin, Calendar, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { COLLEGE_INFO, SYMPOSIUM_INFO } from '../../data/initialData';

export const Footer: React.FC = () => {

  return (
    <footer className="bg-black/72 backdrop-blur-md border-t border-white/10 text-gray-300 font-mono pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f09650] animate-pulse" />
              <span className="text-xl font-display uppercase font-bold text-white tracking-wider">
                AIROX <span className="text-gray-400 font-mono text-sm">'26</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              National Level Technical Symposium organized by the {COLLEGE_INFO.department.name} at {COLLEGE_INFO.name} ({COLLEGE_INFO.autonomyStatus}).
            </p>
            <div className="text-[11px] font-mono text-gray-400 border-l border-[#e07a38] pl-3 py-0.5 uppercase">
              {COLLEGE_INFO.institutionGroup} • ESTD. {COLLEGE_INFO.establishedYear}
            </div>
          </div>

          {/* Event Venue & Date */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold flex items-center gap-2">
              <span className="text-[#f09650]">+</span>
              <span>Event Details</span>
            </h4>
            <div className="space-y-3 text-xs uppercase">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#f09650] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">{SYMPOSIUM_INFO.date}</span>
                  <span className="text-gray-400 text-[11px]">Reg Closes: {SYMPOSIUM_INFO.registration.closingDate}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">{SYMPOSIUM_INFO.venue}</span>
                  <span className="text-gray-400 text-[11px]">Trichy, Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Department Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold flex items-center gap-2">
              <span className="text-[#f09650]">+</span>
              <span>Department Contact</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f09650] shrink-0" />
                <a href="mailto:airoxteam.jjcet@gmail.com" className="hover:text-white transition-colors">
                  airoxteam.jjcet@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <a href="tel:+919150313122" className="hover:text-white transition-colors font-mono">
                  +91 91503 13122
                </a>
              </div>
              <div className="pt-2 flex flex-col gap-1.5">
                <a
                  href="https://jjcet.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#f09650] hover:underline"
                >
                  <span>Official College Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 uppercase">
          <div>
            © 2026 {COLLEGE_INFO.department.name}, {COLLEGE_INFO.name}.
          </div>
          <div className="text-center md:text-right">
            Designed & Developed by <span className="text-white">Dept of AI & DS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

