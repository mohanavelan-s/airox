/**
 * AIROX 2026 - Innovation Hub Navbar Component
 * Seamless integrated header, warm amber signal status, architectural navigation tabs.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Events', href: '#events', prefix: '•' },
    { label: 'Registration', href: '#registration', prefix: '+' },
    { label: 'Teaser', href: '#teaser', prefix: '•' },
    { label: 'Department', href: '#department', prefix: '•' },
    { label: 'Team', href: '#team', prefix: '+' },
    { label: 'Contact', href: '#contact', prefix: '+' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0f1117]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Brand Lockup */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group focus-visible:outline-none"
          >
            {/* Warm Ember Signal Indicator */}
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e07a38] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e07a38]" />
            </span>

            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-display tracking-wide text-white font-bold group-hover:text-[#f09650] transition-colors">
                AIROX
              </span>
              <span className="text-[11px] font-mono text-[#f09650] font-semibold">
                '26
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#151821]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full transition-all duration-200 select-none flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#e07a38] text-white font-medium shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#f09650]'}>{link.prefix}</span>
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              onClick={onOpenRegister}
              className="hidden sm:inline-flex text-[11px]"
            >
              REGISTER
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#151821] border border-white/15 text-gray-200 hover:border-[#e07a38] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden overflow-hidden bg-[#0f1117] border-b border-white/10"
          >
            <div className="max-w-[1240px] mx-auto px-4 py-5 space-y-3">
              <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider px-1 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>AIROX Navigation Portal</span>
                <span className="w-2 h-2 rounded-full bg-[#e07a38]" />
              </div>
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors border ${
                        isActive
                          ? 'bg-[#e07a38] text-white border-[#e07a38] font-medium'
                          : 'text-gray-300 hover:text-white border-transparent bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[#f09650]">{link.prefix}</span>
                        <span>{link.label}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  );
                })}
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                >
                  REGISTER FOR AIROX '26
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


